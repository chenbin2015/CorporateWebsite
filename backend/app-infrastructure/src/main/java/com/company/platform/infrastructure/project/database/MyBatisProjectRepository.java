package com.company.platform.infrastructure.project.database;

import com.company.platform.domain.project.model.Project;
import com.company.platform.domain.project.repository.ProjectRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MyBatisProjectRepository implements ProjectRepository {

    private final ProjectMapper projectMapper;

    public MyBatisProjectRepository(ProjectMapper projectMapper) {
        this.projectMapper = projectMapper;
    }

    @Override
    public List<Project> findAll() {
        return projectMapper.findAll();
    }
}


