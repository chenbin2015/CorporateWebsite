package com.company.platform.client.project;

import com.company.platform.application.log.LogCommandService;
import com.company.platform.application.project.ProjectCommandService;
import com.company.platform.application.project.ProjectQueryService;
import com.company.platform.application.project.command.CreateProjectCommand;
import com.company.platform.application.project.command.UpdateProjectCommand;
import com.company.platform.domain.project.model.Project;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectQueryService projectQueryService;
    private final ProjectCommandService projectCommandService;
    private final LogCommandService logCommandService;

    public ProjectController(ProjectQueryService projectQueryService, ProjectCommandService projectCommandService, LogCommandService logCommandService) {
        this.projectQueryService = projectQueryService;
        this.projectCommandService = projectCommandService;
        this.logCommandService = logCommandService;
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        // 处理多个IP的情况，取第一个
        if (ip != null && ip.contains(",")) {
            ip = ip.split(",")[0].trim();
        }
        return ip != null ? ip : "unknown";
    }

    private String getOperator(Principal principal) {
        return principal != null ? principal.getName() : "system";
    }

    @GetMapping
    public List<Project> list() {
        return projectQueryService.listProjects();
    }

    @GetMapping("/{id}")
    public Project get(@PathVariable("id") String id) {
        // 支持通过 id (Long) 或 code (String) 查询
        try {
            Long projectId = Long.parseLong(id);
            return projectQueryService.getProject(projectId);
        } catch (NumberFormatException e) {
            // 如果不是数字，则作为 code 查询
            return projectQueryService.getProjectByCode(id);
        }
    }

    @PostMapping
    public ResponseEntity<Project> create(
            @RequestBody CreateProjectRequest request,
            Principal principal,
            HttpServletRequest httpRequest) {
        CreateProjectCommand command = new CreateProjectCommand();
        command.setName(request.getName());
        command.setDescription(request.getDescription());

        Project project = projectCommandService.createProject(command);
        
        // 记录日志
        logCommandService.recordLog(
                "CREATE",
                "创建项目",
                getOperator(principal),
                String.format("项目: %s (%s)", project.getName(), project.getCode()),
                String.format("创建项目 [%s]", project.getName()),
                getClientIp(httpRequest)
        );
        
        return ResponseEntity.status(HttpStatus.CREATED).body(project);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> update(
            @PathVariable("id") String id,
            @RequestBody UpdateProjectRequest request,
            Principal principal,
            HttpServletRequest httpRequest) {
        // 支持通过 id (Long) 或 code (String) 查询
        Project project;
        try {
            Long projectId = Long.parseLong(id);
            project = projectQueryService.getProject(projectId);
        } catch (NumberFormatException e) {
            project = projectQueryService.getProjectByCode(id);
        }
        
        UpdateProjectCommand command = new UpdateProjectCommand();
        command.setId(project.getId());
        command.setName(request.getName());
        command.setDescription(request.getDescription());
        command.setNavigationConfig(request.getNavigationConfig());

        Project updatedProject = projectCommandService.updateProject(command);
        
        // 记录日志
        logCommandService.recordLog(
                "UPDATE",
                "更新项目",
                getOperator(principal),
                String.format("项目: %s (%s)", updatedProject.getName(), updatedProject.getCode()),
                String.format("更新项目信息 [%s]", updatedProject.getName()),
                getClientIp(httpRequest)
        );
        
        return ResponseEntity.ok(updatedProject);
    }

    @PutMapping("/{id}/navigation")
    public ResponseEntity<Project> updateNavigation(
            @PathVariable("id") String id,
            @RequestBody UpdateNavigationRequest request,
            Principal principal,
            HttpServletRequest httpRequest) {
        // 支持通过 id (Long) 或 code (String) 查询
        Project project;
        try {
            Long projectId = Long.parseLong(id);
            project = projectQueryService.getProject(projectId);
        } catch (NumberFormatException e) {
            project = projectQueryService.getProjectByCode(id);
        }
        
        UpdateProjectCommand command = new UpdateProjectCommand();
        command.setId(project.getId());
        command.setName(project.getName());
        command.setDescription(project.getDescription());
        command.setNavigationConfig(request.getNavigationConfig());
        command.setDetailPageTemplates(project.getDetailPageTemplates()); // 保留原有值

        Project updatedProject = projectCommandService.updateProject(command);
        
        // 记录日志
        logCommandService.recordLog(
                "UPDATE",
                "更新导航配置",
                getOperator(principal),
                String.format("项目: %s (%s)", updatedProject.getName(), updatedProject.getCode()),
                String.format("更新项目导航配置 [%s]", updatedProject.getName()),
                getClientIp(httpRequest)
        );
        
        return ResponseEntity.ok(updatedProject);
    }

    @PutMapping("/{id}/detail-page-templates")
    public ResponseEntity<Project> updateDetailPageTemplates(
            @PathVariable("id") String id,
            @RequestBody UpdateDetailPageTemplatesRequest request,
            Principal principal,
            HttpServletRequest httpRequest) {
        // 支持通过 id (Long) 或 code (String) 查询
        Project project;
        try {
            Long projectId = Long.parseLong(id);
            project = projectQueryService.getProject(projectId);
        } catch (NumberFormatException e) {
            project = projectQueryService.getProjectByCode(id);
        }
        
        UpdateProjectCommand command = new UpdateProjectCommand();
        command.setId(project.getId());
        command.setName(project.getName());
        command.setDescription(project.getDescription());
        command.setNavigationConfig(project.getNavigationConfig()); // 保留原有值
        command.setDetailPageTemplates(request.getDetailPageTemplates());

        Project updatedProject = projectCommandService.updateProject(command);
        
        // 记录日志
        logCommandService.recordLog(
                "UPDATE",
                "更新详情页模板",
                getOperator(principal),
                String.format("项目: %s (%s)", updatedProject.getName(), updatedProject.getCode()),
                String.format("更新项目详情页模板配置 [%s]", updatedProject.getName()),
                getClientIp(httpRequest)
        );
        
        return ResponseEntity.ok(updatedProject);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> delete(
            @PathVariable("id") String id,
            Principal principal,
            HttpServletRequest httpRequest) {
        // 支持通过 id (Long) 或 code (String) 查询
        Project project;
        try {
            Long projectId = Long.parseLong(id);
            project = projectQueryService.getProject(projectId);
        } catch (NumberFormatException e) {
            project = projectQueryService.getProjectByCode(id);
        }
        
        String projectName = project.getName();
        String projectCode = project.getCode();
        
        projectCommandService.deleteProject(project.getId());
        
        // 记录日志
        logCommandService.recordLog(
                "DELETE",
                "删除项目",
                getOperator(principal),
                String.format("项目: %s (%s)", projectName, projectCode),
                String.format("删除项目 [%s]", projectName),
                getClientIp(httpRequest)
        );
        
        return ResponseEntity.ok(Map.of("success", true));
    }

    // DTOs
    public static class CreateProjectRequest {
        private String name;
        private String description;

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
    }

    public static class UpdateProjectRequest {
        private String name;
        private String description;
        private String navigationConfig;

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
    }

    public     static class UpdateNavigationRequest {
        private String navigationConfig;

        public String getNavigationConfig() {
            return navigationConfig;
        }

        public void setNavigationConfig(String navigationConfig) {
            this.navigationConfig = navigationConfig;
        }
    }

    static class UpdateDetailPageTemplatesRequest {
        private String detailPageTemplates;

        public String getDetailPageTemplates() {
            return detailPageTemplates;
        }

        public void setDetailPageTemplates(String detailPageTemplates) {
            this.detailPageTemplates = detailPageTemplates;
        }
    }
}


