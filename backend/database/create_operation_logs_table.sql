-- 操作日志表
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

