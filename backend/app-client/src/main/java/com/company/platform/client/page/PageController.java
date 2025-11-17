package com.company.platform.client.page;

import com.company.platform.application.page.PageCommandService;
import com.company.platform.application.page.PageQueryService;
import com.company.platform.application.page.command.CreatePageCommand;
import com.company.platform.application.page.command.PublishPageCommand;
import com.company.platform.application.page.command.SaveDraftCommand;
import com.company.platform.application.page.command.UpdatePageCommand;
import com.company.platform.domain.page.model.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects/{projectId}/pages")
public class PageController {

    private final PageQueryService pageQueryService;
    private final PageCommandService pageCommandService;

    public PageController(PageQueryService pageQueryService, PageCommandService pageCommandService) {
        this.pageQueryService = pageQueryService;
        this.pageCommandService = pageCommandService;
    }

    @GetMapping
    public List<Page> listPages(@PathVariable("projectId") Long projectId) {
        return pageQueryService.listPages(projectId);
    }

    @GetMapping("/{pageId}")
    public Page getPage(@PathVariable("projectId") Long projectId, @PathVariable("pageId") Long pageId) {
        return pageQueryService.getPage(projectId, pageId);
    }

    @PostMapping
    public ResponseEntity<Page> createPage(@PathVariable("projectId") Long projectId, @RequestBody CreatePageRequest request) {
        CreatePageCommand command = new CreatePageCommand();
        command.setProjectId(projectId);
        command.setName(request.getName());
        command.setPath(request.getPath());
        command.setTitle(request.getTitle());
        command.setDescription(request.getDescription());
        command.setSchemaData(request.getSchemaData() != null ? request.getSchemaData() : "[]");

        Page page = pageCommandService.createPage(command);
        return ResponseEntity.status(HttpStatus.CREATED).body(page);
    }

    @PutMapping("/{pageId}/draft")
    public ResponseEntity<Page> saveDraft(
            @PathVariable("projectId") Long projectId,
            @PathVariable("pageId") Long pageId,
            @RequestBody SaveDraftRequest request) {
        SaveDraftCommand command = new SaveDraftCommand();
        command.setProjectId(projectId);
        command.setPageId(pageId);
        command.setName(request.getName());
        command.setPath(request.getPath());
        command.setTitle(request.getTitle());
        command.setDescription(request.getDescription());
        command.setSchemaData(request.getSchemaData());

        Page page = pageCommandService.saveDraft(command);
        return ResponseEntity.ok(page);
    }

    @PutMapping("/{pageId}")
    public ResponseEntity<Page> updatePage(
            @PathVariable("projectId") Long projectId,
            @PathVariable("pageId") Long pageId,
            @RequestBody UpdatePageRequest request) {
        UpdatePageCommand command = new UpdatePageCommand();
        command.setProjectId(projectId);
        command.setPageId(pageId);
        command.setName(request.getName());
        command.setPath(request.getPath());
        command.setTitle(request.getTitle());
        command.setDescription(request.getDescription());

        Page page = pageCommandService.updatePage(command);
        return ResponseEntity.ok(page);
    }

    @PostMapping("/{pageId}/publish")
    public ResponseEntity<Page> publishPage(
            @PathVariable("projectId") Long projectId,
            @PathVariable("pageId") Long pageId,
            @RequestBody(required = false) PublishPageRequest request) {
        PublishPageCommand command = new PublishPageCommand();
        command.setProjectId(projectId);
        command.setPageId(pageId);
        if (request != null && request.getSchemaData() != null) {
            command.setSchemaData(request.getSchemaData());
        }

        Page page = pageCommandService.publishPage(command);
        return ResponseEntity.ok(page);
    }

    @DeleteMapping("/{pageId}")
    public ResponseEntity<Map<String, Boolean>> deletePage(
            @PathVariable("projectId") Long projectId,
            @PathVariable("pageId") Long pageId) {
        pageCommandService.deletePage(projectId, pageId);
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

