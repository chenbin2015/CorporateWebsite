package com.company.platform.infrastructure.project.database;

import com.company.platform.domain.project.model.Project;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ProjectMapper {

    @Insert("INSERT INTO projects (code, name, description, navigation_config, detail_page_templates) VALUES (#{code}, #{name}, #{description}, #{navigationConfig}, #{detailPageTemplates})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Project project);

    @Update("UPDATE projects SET name = #{name}, description = #{description}, navigation_config = #{navigationConfig, jdbcType=VARCHAR}, detail_page_templates = #{detailPageTemplates, jdbcType=VARCHAR} WHERE id = #{id}")
    void update(Project project);

    @Select("SELECT id, code, name, description, navigation_config, detail_page_templates, created_at FROM projects WHERE id = #{id}")
    @Results({
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "navigationConfig", column = "navigation_config"),
            @Result(property = "detailPageTemplates", column = "detail_page_templates")
    })
    Project findById(Long id);

    @Select("SELECT id, code, name, description, navigation_config, detail_page_templates, created_at FROM projects WHERE code = #{code}")
    @Results({
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "navigationConfig", column = "navigation_config"),
            @Result(property = "detailPageTemplates", column = "detail_page_templates")
    })
    Project findByCode(String code);

    @Select("SELECT id, code, name, description, navigation_config, detail_page_templates, created_at FROM projects ORDER BY created_at DESC")
    @Results({
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "navigationConfig", column = "navigation_config"),
            @Result(property = "detailPageTemplates", column = "detail_page_templates")
    })
    List<Project> findAll();

    @Delete("DELETE FROM projects WHERE id = #{id}")
    void deleteById(Long id);
}


