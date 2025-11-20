package com.company.platform.infrastructure.datasource.database;

import com.company.platform.domain.datasource.model.DataSourceItem;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface DataSourceItemMapper {

    @Insert("INSERT INTO data_source_items (code, data_source_code, data, sort_order) VALUES (#{code}, #{dataSourceCode}, #{data}, #{sortOrder})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(DataSourceItem item);

    @Update("UPDATE data_source_items SET data = #{data}, sort_order = #{sortOrder} WHERE id = #{id}")
    void update(DataSourceItem item);

    @Select("SELECT id, code, data_source_code, data, sort_order, created_at, updated_at FROM data_source_items WHERE id = #{id}")
    @Results({
            @Result(property = "dataSourceCode", column = "data_source_code"),
            @Result(property = "sortOrder", column = "sort_order"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at")
    })
    DataSourceItem findById(Long id);

    @Select("SELECT id, code, data_source_code, data, sort_order, created_at, updated_at FROM data_source_items WHERE code = #{code}")
    @Results({
            @Result(property = "dataSourceCode", column = "data_source_code"),
            @Result(property = "sortOrder", column = "sort_order"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at")
    })
    DataSourceItem findByCode(String code);

    @Select("SELECT id, code, data_source_code, data, sort_order, created_at, updated_at FROM data_source_items WHERE data_source_code = #{dataSourceCode} ORDER BY sort_order ASC, created_at ASC")
    @Results({
            @Result(property = "dataSourceCode", column = "data_source_code"),
            @Result(property = "sortOrder", column = "sort_order"),
            @Result(property = "createdAt", column = "created_at"),
            @Result(property = "updatedAt", column = "updated_at")
    })
    List<DataSourceItem> findByDataSourceCode(String dataSourceCode);

    @Delete("DELETE FROM data_source_items WHERE id = #{id}")
    void deleteById(Long id);

    @Delete("DELETE FROM data_source_items WHERE code = #{code}")
    void deleteByCode(String code);

    @Delete("DELETE FROM data_source_items WHERE data_source_code = #{dataSourceCode}")
    void deleteByDataSourceCode(String dataSourceCode);
}

