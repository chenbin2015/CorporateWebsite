package com.company.platform.infrastructure.page.database;

import com.company.platform.domain.page.model.Page;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PageMapper {

    @Insert("INSERT INTO pages (project_id, name, path, title, description, status, schema_data, version, created_by) " +
            "VALUES (#{projectId}, #{name}, #{path}, #{title}, #{description}, #{status}, #{schemaData}, #{version}, #{createdBy})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Page page);

    @Update("UPDATE pages SET name = #{name}, path = #{path}, title = #{title}, description = #{description}, " +
            "status = #{status}, schema_data = #{schemaData}, published_schema_data = #{publishedSchemaData}, " +
            "version = #{version}, published_at = #{publishedAt}, updated_at = CURRENT_TIMESTAMP " +
            "WHERE id = #{id}")
    void update(Page page);

    @Select("SELECT id, project_id, name, path, title, description, status, schema_data, published_schema_data, " +
            "version, created_by, created_at, updated_at, published_at FROM pages WHERE id = #{id}")
    @Results({
            @Result(property = "projectId", column = "project_id"),
            @Result(property = "schemaData", column = "schema_data"),
            @Result(property = "publishedSchemaData", column = "published_schema_data"),
            @Result(property = "createdBy", column = "created_by"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at"),
            @Result(property = "publishedAt", column = "published_at")
    })
    Page findById(Long id);

    @Select("SELECT id, project_id, name, path, title, description, status, schema_data, published_schema_data, " +
            "version, created_by, created_at, updated_at, published_at FROM pages WHERE project_id = #{projectId} AND id = #{id}")
    @Results({
            @Result(property = "projectId", column = "project_id"),
            @Result(property = "schemaData", column = "schema_data"),
            @Result(property = "publishedSchemaData", column = "published_schema_data"),
            @Result(property = "createdBy", column = "created_by"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at"),
            @Result(property = "publishedAt", column = "published_at")
    })
    Page findByProjectIdAndId(@Param("projectId") Long projectId, @Param("id") Long id);

    @Select("SELECT id, project_id, name, path, title, description, status, schema_data, published_schema_data, " +
            "version, created_by, created_at, updated_at, published_at FROM pages WHERE project_id = #{projectId} AND path = #{path}")
    @Results({
            @Result(property = "projectId", column = "project_id"),
            @Result(property = "schemaData", column = "schema_data"),
            @Result(property = "publishedSchemaData", column = "published_schema_data"),
            @Result(property = "createdBy", column = "created_by"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at"),
            @Result(property = "publishedAt", column = "published_at")
    })
    Page findByProjectIdAndPath(@Param("projectId") Long projectId, @Param("path") String path);

    @Select("SELECT id, project_id, name, path, title, description, status, schema_data, published_schema_data, " +
            "version, created_by, created_at, updated_at, published_at FROM pages WHERE path = #{path} AND status = 'PUBLISHED'")
    @Results({
            @Result(property = "projectId", column = "project_id"),
            @Result(property = "schemaData", column = "published_schema_data"),
            @Result(property = "publishedSchemaData", column = "published_schema_data"),
            @Result(property = "createdBy", column = "created_by"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at"),
            @Result(property = "publishedAt", column = "published_at")
    })
    Page findPublishedByPath(String path);

    @Select("SELECT id, project_id, name, path, title, description, status, schema_data, published_schema_data, " +
            "version, created_by, created_at, updated_at, published_at FROM pages WHERE project_id = #{projectId} ORDER BY updated_at DESC")
    @Results({
            @Result(property = "projectId", column = "project_id"),
            @Result(property = "schemaData", column = "schema_data"),
            @Result(property = "publishedSchemaData", column = "published_schema_data"),
            @Result(property = "createdBy", column = "created_by"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at"),
            @Result(property = "publishedAt", column = "published_at")
    })
    List<Page> findByProjectId(Long projectId);

    @Delete("DELETE FROM pages WHERE id = #{id}")
    void deleteById(Long id);
}

