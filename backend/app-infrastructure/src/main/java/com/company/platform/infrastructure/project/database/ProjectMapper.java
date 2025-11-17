package com.company.platform.infrastructure.project.database;

import com.company.platform.domain.project.model.Project;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ProjectMapper {

    @Insert("INSERT INTO projects (name, description) VALUES (#{name}, #{description})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Project project);

    @Update("UPDATE projects SET name = #{name}, description = #{description} WHERE id = #{id}")
    void update(Project project);

    @Select("SELECT id, name, description, created_at FROM projects WHERE id = #{id}")
    Project findById(Long id);

    @Select("SELECT id, name, description, created_at FROM projects ORDER BY created_at DESC")
    List<Project> findAll();

    @Delete("DELETE FROM projects WHERE id = #{id}")
    void deleteById(Long id);
}


