package com.company.platform.domain.project.repository;

import com.company.platform.domain.project.model.Project;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository {

    Project save(Project project);

    Optional<Project> findById(Long id);

    Optional<Project> findByCode(String code);

    List<Project> findAll();

    void deleteById(Long id);
}


