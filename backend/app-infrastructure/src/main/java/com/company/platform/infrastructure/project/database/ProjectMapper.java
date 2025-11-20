package com.company.platform.infrastructure.project.database;

import com.company.platform.domain.project.model.Project;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ProjectMapper {

    @Insert("INSERT INTO projects (code, name, description, navigation_config) VALUES (#{code}, #{name}, #{description}, #{navigationConfig})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Project project);

    @Update("UPDATE projects SET name = #{name}, description = #{description}, navigation_config = #{navigationConfig, jdbcType=VARCHAR} WHERE id = #{id}")
    void update(Project project);

    @Select("SELECT id, code, name, description, navigation_config, created_at FROM projects WHERE id = #{id}")
    @Results({
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "navigationConfig", column = "navigation_config")
    })
    Project findById(Long id);

    @Select("SELECT id, code, name, description, navigation_config, created_at FROM projects WHERE code = #{code}")
    @Results({
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "navigationConfig", column = "navigation_config")
    })
    Project findByCode(String code);

    @Select("SELECT id, code, name, description, navigation_config, created_at FROM projects ORDER BY created_at DESC")
    @Results({
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "navigationConfig", column = "navigation_config")
    })
    List<Project> findAll();

    @Delete("DELETE FROM projects WHERE id = #{id}")
    void deleteById(Long id);
}


