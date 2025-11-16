package com.company.platform.client.project;

import com.company.platform.application.project.ProjectQueryService;
import com.company.platform.domain.project.model.Project;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectQueryService projectQueryService;

    public ProjectController(ProjectQueryService projectQueryService) {
        this.projectQueryService = projectQueryService;
    }

    @GetMapping
    public List<Project> list() {
        return projectQueryService.listProjects();
    }
}


