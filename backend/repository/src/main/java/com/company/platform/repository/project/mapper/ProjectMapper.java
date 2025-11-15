package com.company.platform.repository.project.mapper;

import com.company.platform.repository.project.entity.ProjectEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ProjectMapper {

    @Select("SELECT id, name, description, created_at, updated_at FROM projects")
    List<ProjectEntity> findAll();
}

