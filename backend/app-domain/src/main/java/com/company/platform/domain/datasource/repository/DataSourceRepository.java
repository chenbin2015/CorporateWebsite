package com.company.platform.domain.datasource.repository;

import com.company.platform.domain.datasource.model.DataSource;

import java.util.List;
import java.util.Optional;

public interface DataSourceRepository {

    DataSource save(DataSource dataSource);

    Optional<DataSource> findById(Long id);

    Optional<DataSource> findByCode(String code);

    List<DataSource> findByProjectCode(String projectCode);

    List<DataSource> findByProjectCodeAndType(String projectCode, String type);

    void deleteById(Long id);

    void deleteByCode(String code);
}

