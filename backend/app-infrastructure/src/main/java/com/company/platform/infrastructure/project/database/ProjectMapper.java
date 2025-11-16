package com.company.platform.infrastructure.project.database;

import com.company.platform.domain.project.model.Project;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ProjectMapper {

    @Select("SELECT id, name, description, created_at FROM projects")
    List<Project> findAll();
}


