-- ============================================
-- 完整的数据库初始化脚本
-- 用于初始化整个项目数据库
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

-- 为 projects 表添加 code 字段（如果不存在）
SET @dbname = DATABASE();
SET @tablename = 'projects';
SET @columnname = 'code';
SET @preparedStatement = (SELECT IF(
    (
        SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
        WHERE
            (TABLE_SCHEMA = @dbname)
            AND (TABLE_NAME = @tablename)
            AND (COLUMN_NAME = @columnname)
    ) > 0,
    'SELECT 1',
    CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' VARCHAR(36) UNIQUE AFTER id')
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- 为 pages 表添加 code 字段（如果不存在）
SET @tablename = 'pages';
SET @preparedStatement = (SELECT IF(
    (
        SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
        WHERE
            (TABLE_SCHEMA = @dbname)
            AND (TABLE_NAME = @tablename)
            AND (COLUMN_NAME = @columnname)
    ) > 0,
    'SELECT 1',
    CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' VARCHAR(36) UNIQUE AFTER id')
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- 为现有数据生成 code（使用 UUID），如果 code 为 NULL
UPDATE projects SET code = UUID() WHERE code IS NULL;
UPDATE pages SET code = UUID() WHERE code IS NULL;

-- 添加索引以提高查询性能（如果不存在）
SET @index_exists = (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS
    WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'projects'
    AND INDEX_NAME = 'idx_projects_code'
);
SET @sql = IF(@index_exists = 0, 'CREATE INDEX idx_projects_code ON projects(code)', 'SELECT 1');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @index_exists = (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS
    WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'pages'
    AND INDEX_NAME = 'idx_pages_code'
);
SET @sql = IF(@index_exists = 0, 'CREATE INDEX idx_pages_code ON pages(code)', 'SELECT 1');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @index_exists = (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS
    WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'pages'
    AND INDEX_NAME = 'idx_pages_project_code'
);
SET @sql = IF(@index_exists = 0, 'CREATE INDEX idx_pages_project_code ON pages(project_id, code)', 'SELECT 1');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ============================================
-- 第三部分：添加导航配置字段
-- ============================================

-- 为 projects 表添加 navigation_config 字段（如果不存在）
SET @tablename = 'projects';
SET @columnname = 'navigation_config';
SET @preparedStatement = (SELECT IF(
    (
        SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
        WHERE
            (TABLE_SCHEMA = @dbname)
            AND (TABLE_NAME = @tablename)
            AND (COLUMN_NAME = @columnname)
    ) > 0,
    'SELECT 1',
    CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' TEXT COMMENT ''全局导航配置（JSON格式）'' AFTER description')
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- ============================================
-- 第四部分：添加详情页模板配置字段
-- ============================================

-- 为 projects 表添加 detail_page_templates 字段（如果不存在）
SET @columnname = 'detail_page_templates';
SET @preparedStatement = (SELECT IF(
    (
        SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
        WHERE
            (TABLE_SCHEMA = @dbname)
            AND (TABLE_NAME = @tablename)
            AND (COLUMN_NAME = @columnname)
    ) > 0,
    'SELECT 1',
    CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' TEXT COMMENT ''详情页模板配置（JSON格式）'' AFTER navigation_config')
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

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
-- 第六部分：创建操作日志表
-- ============================================

-- 创建操作日志表
CREATE TABLE IF NOT EXISTS operation_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    operation_type VARCHAR(50) NOT NULL COMMENT '操作类型：project, page, datasource, user, system',
    operation VARCHAR(100) NOT NULL COMMENT '操作名称，如：创建项目、保存草稿',
    operator VARCHAR(100) NOT NULL COMMENT '操作人',
    target VARCHAR(500) COMMENT '操作目标，如：项目：企业官网',
    details TEXT COMMENT '操作详情',
    ip VARCHAR(50) COMMENT 'IP地址',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX idx_operation_type (operation_type),
    INDEX idx_operator (operator),
    INDEX idx_create_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='操作日志表';

-- ============================================
-- 第七部分：初始化数据
-- ============================================

-- 初始化用户数据（如果不存在）
-- 注意：admin 用户将通过 init-all.js 脚本通过 API 统一创建（密码：admin123）
-- 这样可以确保密码使用正确的 BCrypt 编码，避免密码验证失败
-- 如果需要在 SQL 中直接创建，请运行: cd scripts && npm install bcryptjs && node fix-admin-password.js
-- 生成正确的哈希值后，取消下面的注释并更新哈希值
-- INSERT IGNORE INTO users (username, password, role, created_at) VALUES
-- ('admin', '$2a$10$生成的哈希值', 'ADMIN', NOW());

-- 注意：项目和数据将通过 init-all.js 脚本通过 API 统一创建，不在这里初始化

-- ============================================
-- 初始化完成
-- ============================================
SELECT '数据库初始化完成！' AS message;
