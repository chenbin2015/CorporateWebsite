package com.company.platform.domain.project.repository;

import com.company.platform.domain.project.model.Project;

import java.util.List;

public interface ProjectRepository {

    List<Project> findAll();
}


