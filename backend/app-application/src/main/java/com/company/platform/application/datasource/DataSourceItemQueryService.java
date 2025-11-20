package com.company.platform.application.datasource;

import com.company.platform.domain.datasource.model.DataSourceItem;
import com.company.platform.domain.datasource.repository.DataSourceItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataSourceItemQueryService {

    private final DataSourceItemRepository dataSourceItemRepository;

    public DataSourceItemQueryService(DataSourceItemRepository dataSourceItemRepository) {
        this.dataSourceItemRepository = dataSourceItemRepository;
    }

    public List<DataSourceItem> listDataSourceItemsByDataSourceCode(String dataSourceCode) {
        return dataSourceItemRepository.findByDataSourceCodeOrderBySortOrder(dataSourceCode);
    }

    public DataSourceItem getDataSourceItemByCode(String code) {
        return dataSourceItemRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("DataSourceItem not found"));
    }
}

