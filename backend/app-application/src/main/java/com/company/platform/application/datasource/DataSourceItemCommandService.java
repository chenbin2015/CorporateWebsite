package com.company.platform.application.datasource;

import com.company.platform.application.datasource.command.CreateDataSourceItemCommand;
import com.company.platform.application.datasource.command.ReorderDataSourceItemsCommand;
import com.company.platform.application.datasource.command.UpdateDataSourceItemCommand;
import com.company.platform.domain.datasource.model.DataSourceItem;
import com.company.platform.domain.datasource.repository.DataSourceItemRepository;
import com.company.platform.domain.datasource.repository.DataSourceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class DataSourceItemCommandService {

    private final DataSourceItemRepository dataSourceItemRepository;
    private final DataSourceRepository dataSourceRepository;

    public DataSourceItemCommandService(
            DataSourceItemRepository dataSourceItemRepository,
            DataSourceRepository dataSourceRepository) {
        this.dataSourceItemRepository = dataSourceItemRepository;
        this.dataSourceRepository = dataSourceRepository;
    }

    @Transactional
    public DataSourceItem createDataSourceItem(CreateDataSourceItemCommand command) {
        // 验证数据源存在
        dataSourceRepository.findByCode(command.getDataSourceCode())
                .orElseThrow(() -> new RuntimeException("DataSource not found"));

        DataSourceItem item = new DataSourceItem();
        item.setCode(UUID.randomUUID().toString());
        item.setDataSourceCode(command.getDataSourceCode());
        item.setData(command.getData());
        item.setSortOrder(command.getSortOrder() != null ? command.getSortOrder() : 0);
        return dataSourceItemRepository.save(item);
    }

    @Transactional
    public DataSourceItem updateDataSourceItem(UpdateDataSourceItemCommand command) {
        DataSourceItem item = dataSourceItemRepository.findByCode(command.getCode())
                .orElseThrow(() -> new RuntimeException("DataSourceItem not found"));
        item.setData(command.getData());
        if (command.getSortOrder() != null) {
            item.setSortOrder(command.getSortOrder());
        }
        return dataSourceItemRepository.save(item);
    }

    @Transactional
    public void deleteDataSourceItem(String code) {
        DataSourceItem item = dataSourceItemRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("DataSourceItem not found"));
        dataSourceItemRepository.deleteByCode(code);
    }

    @Transactional
    public void reorderDataSourceItems(ReorderDataSourceItemsCommand command) {
        // 验证数据源存在
        dataSourceRepository.findByCode(command.getDataSourceCode())
                .orElseThrow(() -> new RuntimeException("DataSource not found"));

        for (ReorderDataSourceItemsCommand.ItemOrder itemOrder : command.getItemOrders()) {
            DataSourceItem item = dataSourceItemRepository.findByCode(itemOrder.getCode())
                    .orElseThrow(() -> new RuntimeException("DataSourceItem not found: " + itemOrder.getCode()));
            item.setSortOrder(itemOrder.getSortOrder());
            dataSourceItemRepository.save(item);
        }
    }
}

