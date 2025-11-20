package com.company.platform.application.datasource;

import com.company.platform.domain.datasource.model.DataSource;
import com.company.platform.domain.datasource.repository.DataSourceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataSourceQueryService {

    private final DataSourceRepository dataSourceRepository;

    public DataSourceQueryService(DataSourceRepository dataSourceRepository) {
        this.dataSourceRepository = dataSourceRepository;
    }

    public List<DataSource> listDataSourcesByProjectCode(String projectCode) {
        return dataSourceRepository.findByProjectCode(projectCode);
    }

    public List<DataSource> listDataSourcesByProjectCodeAndType(String projectCode, String type) {
        return dataSourceRepository.findByProjectCodeAndType(projectCode, type);
    }

    public DataSource getDataSourceByCode(String code) {
        return dataSourceRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("DataSource not found"));
    }
}

