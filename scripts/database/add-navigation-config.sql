-- 为 projects 表添加 navigation_config 字段
-- 用于存储全局导航配置（JSON格式）

ALTER TABLE projects 
ADD COLUMN navigation_config TEXT COMMENT '全局导航配置（JSON格式）' AFTER description;

-- 初始化默认导航配置（可选）
-- UPDATE projects SET navigation_config = '{"menuItems":[]}' WHERE navigation_config IS NULL;

