-- 为 projects 表添加 navigation_config 字段
-- 用于存储全局导航配置（JSON格式）
-- 如果字段已存在，会报错但可以忽略

USE corporate_platform;

ALTER TABLE projects 
ADD COLUMN navigation_config TEXT COMMENT '全局导航配置（JSON格式）' AFTER description;

