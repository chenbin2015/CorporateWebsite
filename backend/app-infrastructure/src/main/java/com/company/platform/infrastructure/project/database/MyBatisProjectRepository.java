package com.company.platform.infrastructure.project.database;

import com.company.platform.domain.project.model.Project;
import com.company.platform.domain.project.repository.ProjectRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class MyBatisProjectRepository implements ProjectRepository {

    private final ProjectMapper projectMapper;

    public MyBatisProjectRepository(ProjectMapper projectMapper) {
        this.projectMapper = projectMapper;
    }

    @Override
    public Project save(Project project) {
        if (project.getId() == null) {
            projectMapper.insert(project);
        } else {
            projectMapper.update(project);
        }
        return project;
    }

    @Override
    public Optional<Project> findById(Long id) {
        Project project = projectMapper.findById(id);
        return Optional.ofNullable(project);
    }

    @Override
    public Optional<Project> findByCode(String code) {
        Project project = projectMapper.findByCode(code);
        return Optional.ofNullable(project);
    }

    @Override
    public List<Project> findAll() {
        return projectMapper.findAll();
    }

    @Override
    public void deleteById(Long id) {
        projectMapper.deleteById(id);
    }
}


