-- ============================================
-- 完整的数据库初始化脚本（DBeaver 兼容版）
-- 用于初始化整个项目数据库
-- 注意：此版本适用于 DBeaver 等图形化工具
-- ============================================

-- ============================================
-- 第一部分：创建基础表
-- ============================================

-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(64) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'ADMIN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 创建项目表
CREATE TABLE IF NOT EXISTS projects (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    description VARCHAR(512),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='项目表';

-- 创建页面表
CREATE TABLE IF NOT EXISTS pages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    project_id BIGINT NOT NULL,
    name VARCHAR(128) NOT NULL,
    path VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    description VARCHAR(512),
    status VARCHAR(32) NOT NULL DEFAULT 'DRAFT',
    schema_data JSON NOT NULL,
    published_schema_data JSON,
    version INT NOT NULL DEFAULT 1,
    created_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    published_at TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    INDEX idx_project_id (project_id),
    INDEX idx_path (path),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='页面表';

-- ============================================
-- 第二部分：添加 code 字段（UUID）
-- ============================================

-- 为 projects 表添加 code 字段（如果不存在，需要手动检查）
ALTER TABLE projects 
ADD COLUMN code VARCHAR(36) UNIQUE AFTER id;

-- 为 pages 表添加 code 字段（如果不存在，需要手动检查）
ALTER TABLE pages 
ADD COLUMN code VARCHAR(36) UNIQUE AFTER id;

-- 为现有数据生成 code（使用 UUID），如果 code 为 NULL
UPDATE projects SET code = UUID() WHERE code IS NULL;
UPDATE pages SET code = UUID() WHERE code IS NULL;

-- 添加索引以提高查询性能
CREATE INDEX idx_projects_code ON projects(code);
CREATE INDEX idx_pages_code ON pages(code);
CREATE INDEX idx_pages_project_code ON pages(project_id, code);

-- ============================================
-- 第三部分：添加导航配置字段
-- ============================================

-- 为 projects 表添加 navigation_config 字段
ALTER TABLE projects 
ADD COLUMN navigation_config TEXT COMMENT '全局导航配置（JSON格式）' AFTER description;

-- ============================================
-- 第四部分：添加详情页模板配置字段
-- ============================================

-- 为 projects 表添加 detail_page_templates 字段
ALTER TABLE projects 
ADD COLUMN detail_page_templates TEXT COMMENT '详情页模板配置（JSON格式）' AFTER navigation_config;

-- ============================================
-- 第五部分：创建数据源系统表
-- ============================================

-- 创建数据源定义表
CREATE TABLE IF NOT EXISTS data_sources (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(36) UNIQUE NOT NULL COMMENT 'UUID，用于前端路由和 API 调用',
    project_code VARCHAR(36) NOT NULL COMMENT '所属项目 code',
    name VARCHAR(255) NOT NULL COMMENT '数据源名称（如"新闻库"、"产品库"）',
    type VARCHAR(50) NOT NULL COMMENT '数据源类型（news, product, event, notice 等）',
    description TEXT COMMENT '描述',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_project_code (project_code),
    INDEX idx_type (type),
    INDEX idx_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='数据源定义表';

-- 创建数据源项表
CREATE TABLE IF NOT EXISTS data_source_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(36) UNIQUE NOT NULL COMMENT 'UUID，用于前端路由和 API 调用',
    data_source_code VARCHAR(36) NOT NULL COMMENT '所属数据源 code',
    data JSON NOT NULL COMMENT '数据项内容（JSON 格式，存储具体数据如 title、date、content 等）',
    sort_order INT DEFAULT 0 COMMENT '排序顺序',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_data_source_code (data_source_code),
    INDEX idx_code (code),
    INDEX idx_sort_order (data_source_code, sort_order),
    FOREIGN KEY (data_source_code) REFERENCES data_sources(code) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='数据源项表';

-- ============================================
-- 第六部分：初始化数据
-- ============================================

-- 初始化用户数据（如果不存在）
INSERT IGNORE INTO users (username, password, role, created_at) VALUES
('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iwK8pLN6', 'ADMIN', NOW());
-- 默认密码：admin123（BCrypt 加密）

-- 初始化示例项目数据（如果不存在）
INSERT INTO projects (code, name, description, created_at) 
SELECT UUID(), '示例项目', '这是一个示例项目，包含多个页面和组件数据', NOW()
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE name = '示例项目');

-- 获取示例项目ID和code
SET @project_id = (SELECT id FROM projects WHERE name = '示例项目' LIMIT 1);
SET @project_code = (SELECT code FROM projects WHERE name = '示例项目' LIMIT 1);

-- 为示例项目生成 code（如果还没有）
UPDATE projects SET code = UUID() WHERE id = @project_id AND code IS NULL;
SET @project_code = (SELECT code FROM projects WHERE id = @project_id);

-- 插入首页（如果不存在）
INSERT INTO pages (code, project_id, name, path, title, description, status, schema_data, version, created_at, updated_at) 
SELECT UUID(), @project_id, '首页', '/home', '首页 - 智慧校园', '智慧校园首页，展示核心服务和信息', 'DRAFT', 
'[{"id":"HeroCarousel-1763391645211-aura","key":"HeroCarousel","label":"HeroCarousel","source":"frontend/src/components/HeroCarousel.vue","props":{"headline":"智慧校园，连结未来","subline":"构建国际化、数字化、可持续的校园体验","accent":"#2563eb"}},{"id":"StatisticsBar-1763391645211-mfl5","key":"StatisticsBar","label":"StatisticsBar","source":"frontend/src/components/sections/StatisticsBar.vue","props":{"items":[{"value":"120+","label":"Years of history"},{"value":"35k+","label":"Students enrolled"},{"value":"98%","label":"Graduate employment rate"}],"variant":"light"}},{"id":"InfoCardGrid-1763391645211-1znb","key":"InfoCardGrid","label":"InfoCardGrid","source":"frontend/src/components/InfoCardGrid.vue","props":{"title":"核心服务","columns":3,"cards":[]}},{"id":"ContentSplit-1763391645211-tb5g","key":"ContentSplit","label":"ContentSplit","source":"frontend/src/components/sections/ContentSplit.vue","props":{"title":"关于我们","description":"我们致力于提供优质的教育服务，培养具有创新精神和实践能力的人才。","image":"https://picsum.photos/seed/split/600/400","reversed":false,"bullets":["优质的教学资源","国际化的教育理念","完善的实践平台"]}},{"id":"CTABanner-1763391645211-1urm","key":"CTABanner","label":"CTABanner","source":"frontend/src/components/sections/CTABanner.vue","props":{"title":"预约校园参观","description":"体验智慧校园解决方案与可视化搭建平台。","buttonText":"立即预约"}}]', 
1, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE project_id = @project_id AND name = '首页');

-- 插入关于我们页面（如果不存在）
INSERT INTO pages (code, project_id, name, path, title, description, status, schema_data, version, created_at, updated_at) 
SELECT UUID(), @project_id, '关于我们', '/about', '关于我们 - 智慧校园', '了解我们的历史、使命和愿景', 'DRAFT', 
'[{"id":"PageHero-1763391645211-8moq","key":"PageHero","label":"PageHero","source":"frontend/src/components/PageHero.vue","props":{"title":"关于我们","subtitle":"About Us","description":"了解我们的历史、使命和愿景","background":""}},{"id":"BreadcrumbHeader-1763391645211-uza7","key":"BreadcrumbHeader","label":"BreadcrumbHeader","source":"frontend/src/components/sections/BreadcrumbHeader.vue","props":{"items":[{"label":"首页","href":"/"},{"label":"关于我们","href":"/about"}],"title":"关于我们","description":"了解我们的历史、使命和愿景"}},{"id":"TextImageSection-1763391645211-xwsl","key":"TextImageSection","label":"TextImageSection","source":"frontend/src/components/TextImageSection.vue","props":{"title":"我们的使命","subtitle":"Mission","details":"我们致力于提供优质的教育服务，培养具有创新精神和实践能力的人才，为社会发展和进步做出贡献。","image":"https://picsum.photos/seed/mission/800/600","imageHeight":"18rem","titleColor":"#0f172a","titleSize":"1.8rem","subtitleColor":"#64748b","subtitleSize":"1rem","detailsColor":"#0f172a","detailsSize":"0.98rem","reverse":false}},{"id":"SectionHero-1763391645211-71yx","key":"SectionHero","label":"SectionHero","source":"frontend/src/components/sections/SectionHero.vue","props":{"title":"我们的愿景","description":"成为国际一流的教育机构，引领教育创新与发展。","tag":"愿景"}},{"id":"TimelineHorizontal-1763391645211-cf0m","key":"TimelineHorizontal","label":"TimelineHorizontal","source":"frontend/src/components/sections/TimelineHorizontal.vue","props":{"title":"发展历程","items":[{"time":"2020","label":"成立"},{"time":"2021","label":"快速发展"},{"time":"2022","label":"国际化"},{"time":"2023","label":"数字化转型"}]}}]', 
1, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE project_id = @project_id AND name = '关于我们');

-- 插入联系我们页面（如果不存在）
INSERT INTO pages (code, project_id, name, path, title, description, status, schema_data, version, created_at, updated_at) 
SELECT UUID(), @project_id, '联系我们', '/contact', '联系我们 - 智慧校园', '联系方式和服务信息', 'DRAFT', 
'[{"id":"PageHero-1763391645211-degm","key":"PageHero","label":"PageHero","source":"frontend/src/components/PageHero.vue","props":{"title":"联系我们","subtitle":"Contact Us","description":"我们期待与您取得联系","background":""}},{"id":"ContactCard-1763391645211-xav8","key":"ContactCard","label":"ContactCard","source":"frontend/src/components/sections/ContactCard.vue","props":{"info":{"address":"XX 大学 XX 校区 XX 路 123 号","email":"contact@example.edu","phone":"010-1234 5678","qr":"https://picsum.photos/seed/contactqr/200/200"}}},{"id":"SimpleForm-1763391645211-15wn","key":"SimpleForm","label":"SimpleForm","source":"frontend/src/components/sections/SimpleForm.vue","props":{"title":"留言表单","submitText":"提交","fields":[]}},{"id":"PartnerLogoGrid-1763391645211-i0an","key":"PartnerLogoGrid","label":"PartnerLogoGrid","source":"frontend/src/components/sections/PartnerLogoGrid.vue","props":{"title":"合作伙伴","logos":[{"name":"Partner A","logo":"https://picsum.photos/seed/logo1/200/80"},{"name":"Partner B","logo":"https://picsum.photos/seed/logo2/200/80"},{"name":"Partner C","logo":"https://picsum.photos/seed/logo3/200/80"},{"name":"Partner D","logo":"https://picsum.photos/seed/logo4/200/80"}]}}]', 
1, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE project_id = @project_id AND name = '联系我们');

-- 为刚插入的页面生成 code（如果还没有）
UPDATE pages SET code = UUID() WHERE project_id = @project_id AND code IS NULL;

-- ============================================
-- 初始化完成
-- ============================================
SELECT '数据库初始化完成！' AS message;

