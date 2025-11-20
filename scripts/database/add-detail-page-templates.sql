-- 添加详情页模板配置字段到 projects 表
-- 存储格式：JSON，包含每种类型的详情页模板配置
-- 例如：{"news": {"schemaData": "...", "publishedSchemaData": "..."}, "product": {...}, ...}

ALTER TABLE projects 
ADD COLUMN detail_page_templates TEXT COMMENT '详情页模板配置（JSON格式）' AFTER navigation_config;

