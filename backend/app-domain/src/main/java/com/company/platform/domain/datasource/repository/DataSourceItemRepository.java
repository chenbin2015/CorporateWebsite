package com.company.platform.domain.datasource.repository;

import com.company.platform.domain.datasource.model.DataSourceItem;

import java.util.List;
import java.util.Optional;

public interface DataSourceItemRepository {

    DataSourceItem save(DataSourceItem item);

    Optional<DataSourceItem> findById(Long id);

    Optional<DataSourceItem> findByCode(String code);

    List<DataSourceItem> findByDataSourceCode(String dataSourceCode);

    List<DataSourceItem> findByDataSourceCodeOrderBySortOrder(String dataSourceCode);

    void deleteById(Long id);

    void deleteByCode(String code);

    void deleteByDataSourceCode(String dataSourceCode);
}

