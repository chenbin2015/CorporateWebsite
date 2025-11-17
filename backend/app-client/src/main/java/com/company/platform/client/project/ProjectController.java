package com.company.platform.client.project;

import com.company.platform.application.project.ProjectCommandService;
import com.company.platform.application.project.ProjectQueryService;
import com.company.platform.application.project.command.CreateProjectCommand;
import com.company.platform.application.project.command.UpdateProjectCommand;
import com.company.platform.domain.project.model.Project;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectQueryService projectQueryService;
    private final ProjectCommandService projectCommandService;

    public ProjectController(ProjectQueryService projectQueryService, ProjectCommandService projectCommandService) {
        this.projectQueryService = projectQueryService;
        this.projectCommandService = projectCommandService;
    }

    @GetMapping
    public List<Project> list() {
        return projectQueryService.listProjects();
    }

    @GetMapping("/{id}")
    public Project get(@PathVariable("id") Long id) {
        return projectQueryService.getProject(id);
    }

    @PostMapping
    public ResponseEntity<Project> create(@RequestBody CreateProjectRequest request) {
        CreateProjectCommand command = new CreateProjectCommand();
        command.setName(request.getName());
        command.setDescription(request.getDescription());

        Project project = projectCommandService.createProject(command);
        return ResponseEntity.status(HttpStatus.CREATED).body(project);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> update(@PathVariable("id") Long id, @RequestBody UpdateProjectRequest request) {
        UpdateProjectCommand command = new UpdateProjectCommand();
        command.setId(id);
        command.setName(request.getName());
        command.setDescription(request.getDescription());

        Project project = projectCommandService.updateProject(command);
        return ResponseEntity.ok(project);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> delete(@PathVariable("id") Long id) {
        projectCommandService.deleteProject(id);
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
}


