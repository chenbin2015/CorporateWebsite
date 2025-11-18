-- 为 projects 和 pages 表添加 code 字段（UUID）
-- 这个字段是全局唯一的字符串标识符，用于前端路由和 API 调用

-- 为 projects 表添加 code 字段
ALTER TABLE projects 
ADD COLUMN code VARCHAR(36) UNIQUE AFTER id;

-- 为 pages 表添加 code 字段
ALTER TABLE pages 
ADD COLUMN code VARCHAR(36) UNIQUE AFTER id;

-- 为现有数据生成 code（使用 UUID）
-- 注意：如果表中已有数据，需要为每条记录生成 UUID
UPDATE projects SET code = UUID() WHERE code IS NULL;
UPDATE pages SET code = UUID() WHERE code IS NULL;

-- 添加索引以提高查询性能
CREATE INDEX idx_projects_code ON projects(code);
CREATE INDEX idx_pages_code ON pages(code);
CREATE INDEX idx_pages_project_code ON pages(project_id, code);

