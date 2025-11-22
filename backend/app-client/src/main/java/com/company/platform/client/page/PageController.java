package com.company.platform.client.page;

import com.company.platform.application.log.LogCommandService;
import com.company.platform.application.page.PageCommandService;
import com.company.platform.application.page.PageQueryService;
import com.company.platform.application.page.command.CreatePageCommand;
import com.company.platform.application.page.command.PublishPageCommand;
import com.company.platform.application.page.command.SaveDraftCommand;
import com.company.platform.application.page.command.UpdatePageCommand;
import com.company.platform.application.project.ProjectQueryService;
import com.company.platform.domain.page.model.Page;
import com.company.platform.domain.project.model.Project;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects/{projectId}/pages")
public class PageController {

    private final PageQueryService pageQueryService;
    private final PageCommandService pageCommandService;
    private final ProjectQueryService projectQueryService;
    private final LogCommandService logCommandService;

    public PageController(PageQueryService pageQueryService, PageCommandService pageCommandService, ProjectQueryService projectQueryService, LogCommandService logCommandService) {
        this.pageQueryService = pageQueryService;
        this.pageCommandService = pageCommandService;
        this.projectQueryService = projectQueryService;
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
    public List<Page> listPages(@PathVariable("projectId") String projectId) {
        // 支持通过 id (Long) 或 code (String) 查询
        try {
            Long id = Long.parseLong(projectId);
            return pageQueryService.listPages(id);
        } catch (NumberFormatException e) {
            return pageQueryService.listPagesByProjectCode(projectId);
        }
    }

    @GetMapping("/{pageId}")
    public Page getPage(@PathVariable("projectId") String projectId, @PathVariable("pageId") String pageId) {
        // 支持通过 id (Long) 或 code (String) 查询
        try {
            Long projectIdLong = Long.parseLong(projectId);
            Long pageIdLong = Long.parseLong(pageId);
            return pageQueryService.getPage(projectIdLong, pageIdLong);
        } catch (NumberFormatException e) {
            // 如果任一参数不是数字，则作为 code 查询
            return pageQueryService.getPageByCode(projectId, pageId);
        }
    }

    @PostMapping
    public ResponseEntity<Page> createPage(
            @PathVariable("projectId") String projectId,
            @RequestBody CreatePageRequest request,
            Principal principal,
            HttpServletRequest httpRequest) {
        // 支持通过 id (Long) 或 code (String) 查询
        Project project;
        try {
            Long id = Long.parseLong(projectId);
            project = projectQueryService.getProject(id);
        } catch (NumberFormatException e) {
            project = projectQueryService.getProjectByCode(projectId);
        }
        
        CreatePageCommand command = new CreatePageCommand();
        command.setProjectId(project.getId());
        command.setName(request.getName());
        command.setPath(request.getPath());
        command.setTitle(request.getTitle());
        command.setDescription(request.getDescription());
        command.setSchemaData(request.getSchemaData() != null ? request.getSchemaData() : "[]");

        Page page = pageCommandService.createPage(command);
        
        // 记录日志
        logCommandService.recordLog(
                "CREATE",
                "创建页面",
                getOperator(principal),
                String.format("项目: %s, 页面: %s (%s)", project.getName(), page.getName(), page.getCode()),
                String.format("创建页面 [%s]，路径: %s", page.getName(), page.getPath()),
                getClientIp(httpRequest)
        );
        
        return ResponseEntity.status(HttpStatus.CREATED).body(page);
    }

    @PutMapping("/{pageId}/draft")
    public ResponseEntity<Page> saveDraft(
            @PathVariable("projectId") String projectId,
            @PathVariable("pageId") String pageId,
            @RequestBody SaveDraftRequest request,
            Principal principal,
            HttpServletRequest httpRequest) {
        // 支持通过 id (Long) 或 code (String) 查询
        Page page;
        Project project;
        try {
            Long projectIdLong = Long.parseLong(projectId);
            Long pageIdLong = Long.parseLong(pageId);
            page = pageQueryService.getPage(projectIdLong, pageIdLong);
            project = projectQueryService.getProject(projectIdLong);
        } catch (NumberFormatException e) {
            page = pageQueryService.getPageByCode(projectId, pageId);
            project = projectQueryService.getProjectByCode(projectId);
        }
        
        SaveDraftCommand command = new SaveDraftCommand();
        command.setProjectId(page.getProjectId());
        command.setPageId(page.getId());
        command.setName(request.getName());
        command.setPath(request.getPath());
        command.setTitle(request.getTitle());
        command.setDescription(request.getDescription());
        command.setSchemaData(request.getSchemaData());

        Page savedPage = pageCommandService.saveDraft(command);
        
        // 记录日志
        logCommandService.recordLog(
                "UPDATE",
                "保存草稿",
                getOperator(principal),
                String.format("项目: %s, 页面: %s (%s)", project.getName(), savedPage.getName(), savedPage.getCode()),
                String.format("保存页面草稿 [%s]", savedPage.getName()),
                getClientIp(httpRequest)
        );
        
        return ResponseEntity.ok(savedPage);
    }

    @PutMapping("/{pageId}")
    public ResponseEntity<Page> updatePage(
            @PathVariable("projectId") String projectId,
            @PathVariable("pageId") String pageId,
            @RequestBody UpdatePageRequest request,
            Principal principal,
            HttpServletRequest httpRequest) {
        // 支持通过 id (Long) 或 code (String) 查询
        Page page;
        Project project;
        try {
            Long projectIdLong = Long.parseLong(projectId);
            Long pageIdLong = Long.parseLong(pageId);
            page = pageQueryService.getPage(projectIdLong, pageIdLong);
            project = projectQueryService.getProject(projectIdLong);
        } catch (NumberFormatException e) {
            page = pageQueryService.getPageByCode(projectId, pageId);
            project = projectQueryService.getProjectByCode(projectId);
        }
        
        UpdatePageCommand command = new UpdatePageCommand();
        command.setProjectId(page.getProjectId());
        command.setPageId(page.getId());
        command.setName(request.getName());
        command.setPath(request.getPath());
        command.setTitle(request.getTitle());
        command.setDescription(request.getDescription());

        Page updatedPage = pageCommandService.updatePage(command);
        
        // 记录日志
        logCommandService.recordLog(
                "UPDATE",
                "更新页面信息",
                getOperator(principal),
                String.format("项目: %s, 页面: %s (%s)", project.getName(), updatedPage.getName(), updatedPage.getCode()),
                String.format("更新页面信息 [%s]，路径: %s", updatedPage.getName(), updatedPage.getPath()),
                getClientIp(httpRequest)
        );
        
        return ResponseEntity.ok(updatedPage);
    }

    @PostMapping("/{pageId}/publish")
    public ResponseEntity<Page> publishPage(
            @PathVariable("projectId") String projectId,
            @PathVariable("pageId") String pageId,
            @RequestBody(required = false) PublishPageRequest request,
            Principal principal,
            HttpServletRequest httpRequest) {
        // 支持通过 id (Long) 或 code (String) 查询
        Page page;
        Project project;
        try {
            Long projectIdLong = Long.parseLong(projectId);
            Long pageIdLong = Long.parseLong(pageId);
            page = pageQueryService.getPage(projectIdLong, pageIdLong);
            project = projectQueryService.getProject(projectIdLong);
        } catch (NumberFormatException e) {
            page = pageQueryService.getPageByCode(projectId, pageId);
            project = projectQueryService.getProjectByCode(projectId);
        }
        
        PublishPageCommand command = new PublishPageCommand();
        command.setProjectId(page.getProjectId());
        command.setPageId(page.getId());
        if (request != null && request.getSchemaData() != null) {
            command.setSchemaData(request.getSchemaData());
        }

        Page publishedPage = pageCommandService.publishPage(command);
        
        // 记录日志
        logCommandService.recordLog(
                "PUBLISH",
                "发布页面",
                getOperator(principal),
                String.format("项目: %s, 页面: %s (%s)", project.getName(), publishedPage.getName(), publishedPage.getCode()),
                String.format("发布页面 [%s]，版本: %d", publishedPage.getName(), publishedPage.getVersion()),
                getClientIp(httpRequest)
        );
        
        return ResponseEntity.ok(publishedPage);
    }

    @DeleteMapping("/{pageId}")
    public ResponseEntity<Map<String, Boolean>> deletePage(
            @PathVariable("projectId") String projectId,
            @PathVariable("pageId") String pageId,
            Principal principal,
            HttpServletRequest httpRequest) {
        // 支持通过 id (Long) 或 code (String) 查询
        Page page;
        Project project;
        try {
            Long projectIdLong = Long.parseLong(projectId);
            Long pageIdLong = Long.parseLong(pageId);
            page = pageQueryService.getPage(projectIdLong, pageIdLong);
            project = projectQueryService.getProject(projectIdLong);
        } catch (NumberFormatException e) {
            page = pageQueryService.getPageByCode(projectId, pageId);
            project = projectQueryService.getProjectByCode(projectId);
        }
        
        String pageName = page.getName();
        String pageCode = page.getCode();
        
        pageCommandService.deletePage(page.getProjectId(), page.getId());
        
        // 记录日志
        logCommandService.recordLog(
                "DELETE",
                "删除页面",
                getOperator(principal),
                String.format("项目: %s, 页面: %s (%s)", project.getName(), pageName, pageCode),
                String.format("删除页面 [%s]", pageName),
                getClientIp(httpRequest)
        );
        
        return ResponseEntity.ok(Map.of("success", true));
    }

    // DTOs
    public static class CreatePageRequest {
        private String name;
        private String path;
        private String title;
        private String description;
        private String schemaData;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            this.path = path;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getSchemaData() {
            return schemaData;
        }

        public void setSchemaData(String schemaData) {
            this.schemaData = schemaData;
        }
    }

    public static class SaveDraftRequest {
        private String name;
        private String path;
        private String title;
        private String description;
        private String schemaData;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            this.path = path;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getSchemaData() {
            return schemaData;
        }

        public void setSchemaData(String schemaData) {
            this.schemaData = schemaData;
        }
    }

    public static class UpdatePageRequest {
        private String name;
        private String path;
        private String title;
        private String description;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            this.path = path;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }

    public static class PublishPageRequest {
        private String schemaData;

        public String getSchemaData() {
            return schemaData;
        }

        public void setSchemaData(String schemaData) {
            this.schemaData = schemaData;
        }
    }
}

