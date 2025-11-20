-- 创建项目级数据源系统
-- 数据源定义表
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

-- 数据源项表
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

