package com.company.platform.infrastructure.page.database;

import com.company.platform.domain.page.model.Page;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PageMapper {

    @Insert("INSERT INTO pages (code, project_id, name, path, title, description, status, schema_data, version, created_by) " +
            "VALUES (#{code}, #{projectId}, #{name}, #{path}, #{title}, #{description}, #{status}, #{schemaData}, #{version}, #{createdBy})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Page page);

    @Update("UPDATE pages SET name = #{name}, path = #{path}, title = #{title}, description = #{description}, " +
            "status = #{status}, schema_data = #{schemaData}, published_schema_data = #{publishedSchemaData}, " +
            "version = #{version}, published_at = #{publishedAt}, updated_at = CURRENT_TIMESTAMP " +
            "WHERE id = #{id}")
    void update(Page page);

    @Select("SELECT p.id, p.code, p.project_id, pr.code as project_code, p.name, p.path, p.title, p.description, p.status, " +
            "p.schema_data, p.published_schema_data, p.version, p.created_by, p.created_at, p.updated_at, p.published_at " +
            "FROM pages p LEFT JOIN projects pr ON p.project_id = pr.id WHERE p.id = #{id}")
    @Results({
            @Result(property = "projectId", column = "project_id"),
            @Result(property = "projectCode", column = "project_code"),
            @Result(property = "schemaData", column = "schema_data"),
            @Result(property = "publishedSchemaData", column = "published_schema_data"),
            @Result(property = "createdBy", column = "created_by"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at"),
            @Result(property = "publishedAt", column = "published_at")
    })
    Page findById(Long id);

    @Select("SELECT p.id, p.code, p.project_id, pr.code as project_code, p.name, p.path, p.title, p.description, p.status, " +
            "p.schema_data, p.published_schema_data, p.version, p.created_by, p.created_at, p.updated_at, p.published_at " +
            "FROM pages p LEFT JOIN projects pr ON p.project_id = pr.id WHERE p.code = #{code}")
    @Results({
            @Result(property = "projectId", column = "project_id"),
            @Result(property = "projectCode", column = "project_code"),
            @Result(property = "schemaData", column = "schema_data"),
            @Result(property = "publishedSchemaData", column = "published_schema_data"),
            @Result(property = "createdBy", column = "created_by"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at"),
            @Result(property = "publishedAt", column = "published_at")
    })
    Page findByCode(String code);

    @Select("SELECT p.id, p.code, p.project_id, pr.code as project_code, p.name, p.path, p.title, p.description, p.status, " +
            "p.schema_data, p.published_schema_data, p.version, p.created_by, p.created_at, p.updated_at, p.published_at " +
            "FROM pages p LEFT JOIN projects pr ON p.project_id = pr.id WHERE p.project_id = #{projectId} AND p.id = #{id}")
    @Results({
            @Result(property = "projectId", column = "project_id"),
            @Result(property = "projectCode", column = "project_code"),
            @Result(property = "schemaData", column = "schema_data"),
            @Result(property = "publishedSchemaData", column = "published_schema_data"),
            @Result(property = "createdBy", column = "created_by"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at"),
            @Result(property = "publishedAt", column = "published_at")
    })
    Page findByProjectIdAndId(@Param("projectId") Long projectId, @Param("id") Long id);

    @Select("SELECT p.id, p.code, p.project_id, pr.code as project_code, p.name, p.path, p.title, p.description, p.status, " +
            "p.schema_data, p.published_schema_data, p.version, p.created_by, p.created_at, p.updated_at, p.published_at " +
            "FROM pages p LEFT JOIN projects pr ON p.project_id = pr.id WHERE pr.code = #{projectCode} AND p.code = #{pageCode}")
    @Results({
            @Result(property = "projectId", column = "project_id"),
            @Result(property = "projectCode", column = "project_code"),
            @Result(property = "schemaData", column = "schema_data"),
            @Result(property = "publishedSchemaData", column = "published_schema_data"),
            @Result(property = "createdBy", column = "created_by"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at"),
            @Result(property = "publishedAt", column = "published_at")
    })
    Page findByProjectCodeAndPageCode(@Param("projectCode") String projectCode, @Param("pageCode") String pageCode);

    @Select("SELECT p.id, p.code, p.project_id, pr.code as project_code, p.name, p.path, p.title, p.description, p.status, " +
            "p.schema_data, p.published_schema_data, p.version, p.created_by, p.created_at, p.updated_at, p.published_at " +
            "FROM pages p LEFT JOIN projects pr ON p.project_id = pr.id WHERE p.project_id = #{projectId} AND p.path = #{path}")
    @Results({
            @Result(property = "projectId", column = "project_id"),
            @Result(property = "projectCode", column = "project_code"),
            @Result(property = "schemaData", column = "schema_data"),
            @Result(property = "publishedSchemaData", column = "published_schema_data"),
            @Result(property = "createdBy", column = "created_by"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at"),
            @Result(property = "publishedAt", column = "published_at")
    })
    Page findByProjectIdAndPath(@Param("projectId") Long projectId, @Param("path") String path);

    @Select("SELECT p.id, p.code, p.project_id, pr.code as project_code, p.name, p.path, p.title, p.description, p.status, " +
            "p.schema_data, p.published_schema_data, p.version, p.created_by, p.created_at, p.updated_at, p.published_at " +
            "FROM pages p LEFT JOIN projects pr ON p.project_id = pr.id WHERE p.path = #{path} AND p.status = 'PUBLISHED'")
    @Results({
            @Result(property = "projectId", column = "project_id"),
            @Result(property = "projectCode", column = "project_code"),
            @Result(property = "schemaData", column = "published_schema_data"),
            @Result(property = "publishedSchemaData", column = "published_schema_data"),
            @Result(property = "createdBy", column = "created_by"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at"),
            @Result(property = "publishedAt", column = "published_at")
    })
    Page findPublishedByPath(String path);

    @Select("SELECT p.id, p.code, p.project_id, pr.code as project_code, p.name, p.path, p.title, p.description, p.status, " +
            "p.schema_data, p.published_schema_data, p.version, p.created_by, p.created_at, p.updated_at, p.published_at " +
            "FROM pages p LEFT JOIN projects pr ON p.project_id = pr.id WHERE p.project_id = #{projectId} ORDER BY p.updated_at DESC")
    @Results({
            @Result(property = "projectId", column = "project_id"),
            @Result(property = "projectCode", column = "project_code"),
            @Result(property = "schemaData", column = "schema_data"),
            @Result(property = "publishedSchemaData", column = "published_schema_data"),
            @Result(property = "createdBy", column = "created_by"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at"),
            @Result(property = "publishedAt", column = "published_at")
    })
    List<Page> findByProjectId(Long projectId);

    @Select("SELECT p.id, p.code, p.project_id, pr.code as project_code, p.name, p.path, p.title, p.description, p.status, " +
            "p.schema_data, p.published_schema_data, p.version, p.created_by, p.created_at, p.updated_at, p.published_at " +
            "FROM pages p LEFT JOIN projects pr ON p.project_id = pr.id WHERE pr.code = #{projectCode} ORDER BY p.updated_at DESC")
    @Results({
            @Result(property = "projectId", column = "project_id"),
            @Result(property = "projectCode", column = "project_code"),
            @Result(property = "schemaData", column = "schema_data"),
            @Result(property = "publishedSchemaData", column = "published_schema_data"),
            @Result(property = "createdBy", column = "created_by"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at"),
            @Result(property = "publishedAt", column = "published_at")
    })
    List<Page> findByProjectCode(String projectCode);

    @Delete("DELETE FROM pages WHERE id = #{id}")
    void deleteById(Long id);
}

