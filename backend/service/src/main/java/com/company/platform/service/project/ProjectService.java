package com.company.platform.service.project;

import com.company.platform.repository.project.entity.ProjectEntity;
import com.company.platform.repository.project.mapper.ProjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectMapper projectMapper;

    public ProjectService(ProjectMapper projectMapper) {
        this.projectMapper = projectMapper;
    }

    public List<ProjectEntity> findAll() {
        return projectMapper.findAll();
    }
}

