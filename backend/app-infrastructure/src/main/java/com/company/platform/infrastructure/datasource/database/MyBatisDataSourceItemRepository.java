package com.company.platform.infrastructure.datasource.database;

import com.company.platform.domain.datasource.model.DataSourceItem;
import com.company.platform.domain.datasource.repository.DataSourceItemRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class MyBatisDataSourceItemRepository implements DataSourceItemRepository {

    private final DataSourceItemMapper dataSourceItemMapper;

    public MyBatisDataSourceItemRepository(DataSourceItemMapper dataSourceItemMapper) {
        this.dataSourceItemMapper = dataSourceItemMapper;
    }

    @Override
    public DataSourceItem save(DataSourceItem item) {
        if (item.getId() == null) {
            dataSourceItemMapper.insert(item);
        } else {
            dataSourceItemMapper.update(item);
        }
        return item;
    }

    @Override
    public Optional<DataSourceItem> findById(Long id) {
        DataSourceItem item = dataSourceItemMapper.findById(id);
        return Optional.ofNullable(item);
    }

    @Override
    public Optional<DataSourceItem> findByCode(String code) {
        DataSourceItem item = dataSourceItemMapper.findByCode(code);
        return Optional.ofNullable(item);
    }

    @Override
    public List<DataSourceItem> findByDataSourceCode(String dataSourceCode) {
        return dataSourceItemMapper.findByDataSourceCode(dataSourceCode);
    }

    @Override
    public List<DataSourceItem> findByDataSourceCodeOrderBySortOrder(String dataSourceCode) {
        return dataSourceItemMapper.findByDataSourceCode(dataSourceCode);
    }

    @Override
    public void deleteById(Long id) {
        dataSourceItemMapper.deleteById(id);
    }

    @Override
    public void deleteByCode(String code) {
        dataSourceItemMapper.deleteByCode(code);
    }

    @Override
    public void deleteByDataSourceCode(String dataSourceCode) {
        dataSourceItemMapper.deleteByDataSourceCode(dataSourceCode);
    }
}

