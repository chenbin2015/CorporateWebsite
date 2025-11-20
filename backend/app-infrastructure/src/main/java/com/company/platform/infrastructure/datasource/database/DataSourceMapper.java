package com.company.platform.infrastructure.datasource.database;

import com.company.platform.domain.datasource.model.DataSource;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface DataSourceMapper {

    @Insert("INSERT INTO data_sources (code, project_code, name, type, description) VALUES (#{code}, #{projectCode}, #{name}, #{type}, #{description})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(DataSource dataSource);

    @Update("UPDATE data_sources SET name = #{name}, type = #{type}, description = #{description} WHERE id = #{id}")
    void update(DataSource dataSource);

    @Select("SELECT id, code, project_code, name, type, description, created_at, updated_at FROM data_sources WHERE id = #{id}")
    @Results({
            @Result(property = "projectCode", column = "project_code"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at")
    })
    DataSource findById(Long id);

    @Select("SELECT id, code, project_code, name, type, description, created_at, updated_at FROM data_sources WHERE code = #{code}")
    @Results({
            @Result(property = "projectCode", column = "project_code"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at")
    })
    DataSource findByCode(String code);

    @Select("SELECT id, code, project_code, name, type, description, created_at, updated_at FROM data_sources WHERE project_code = #{projectCode} ORDER BY created_at DESC")
    @Results({
            @Result(property = "projectCode", column = "project_code"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at")
    })
    List<DataSource> findByProjectCode(String projectCode);

    @Select("SELECT id, code, project_code, name, type, description, created_at, updated_at FROM data_sources WHERE project_code = #{projectCode} AND type = #{type} ORDER BY created_at DESC")
    @Results({
            @Result(property = "projectCode", column = "project_code"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at")
    })
    List<DataSource> findByProjectCodeAndType(@Param("projectCode") String projectCode, @Param("type") String type);

    @Delete("DELETE FROM data_sources WHERE id = #{id}")
    void deleteById(Long id);

    @Delete("DELETE FROM data_sources WHERE code = #{code}")
    void deleteByCode(String code);
}

