package com.company.platform.application.project.command;

public class UpdateProjectCommand {
    private Long id;
    private String name;
    private String description;
    private String navigationConfig;
    private String detailPageTemplates;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}

