package com.company.platform.domain.project.model;

import java.time.LocalDateTime;

public class Project {

    private Long id;
    private String code; // UUID，全局唯一标识符
    private String name;
    private String description;
    private String navigationConfig; // 全局导航配置（JSON格式）
    private String detailPageTemplates; // 详情页模板配置（JSON格式）
    private LocalDateTime createdAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNavigationConfig() {
        return navigationConfig;
    }

    public void setNavigationConfig(String navigationConfig) {
        this.navigationConfig = navigationConfig;
    }

    public String getDetailPageTemplates() {
        return detailPageTemplates;
    }

    public void setDetailPageTemplates(String detailPageTemplates) {
        this.detailPageTemplates = detailPageTemplates;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

