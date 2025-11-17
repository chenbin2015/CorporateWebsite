package com.company.platform.application.project;

import com.company.platform.application.project.command.CreateProjectCommand;
import com.company.platform.application.project.command.UpdateProjectCommand;
import com.company.platform.domain.project.model.Project;
import com.company.platform.domain.project.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjectCommandService {

    private final ProjectRepository projectRepository;

    public ProjectCommandService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional
    public Project createProject(CreateProjectCommand command) {
        Project project = new Project();
        project.setName(command.getName());
        project.setDescription(command.getDescription());
        return projectRepository.save(project);
    }

    @Transactional
    public Project updateProject(UpdateProjectCommand command) {
        Project project = projectRepository.findById(command.getId())
                .orElseThrow(() -> new RuntimeException("Project not found"));
        project.setName(command.getName());
        project.setDescription(command.getDescription());
        return projectRepository.save(project);
    }

    @Transactional
    public void deleteProject(Long id) {
        projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        projectRepository.deleteById(id);
    }
}

