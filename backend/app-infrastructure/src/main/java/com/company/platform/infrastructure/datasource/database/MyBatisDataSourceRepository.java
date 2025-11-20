package com.company.platform.infrastructure.datasource.database;

import com.company.platform.domain.datasource.model.DataSource;
import com.company.platform.domain.datasource.repository.DataSourceRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class MyBatisDataSourceRepository implements DataSourceRepository {

    private final DataSourceMapper dataSourceMapper;

    public MyBatisDataSourceRepository(DataSourceMapper dataSourceMapper) {
        this.dataSourceMapper = dataSourceMapper;
    }

    @Override
    public DataSource save(DataSource dataSource) {
        if (dataSource.getId() == null) {
            dataSourceMapper.insert(dataSource);
        } else {
            dataSourceMapper.update(dataSource);
        }
        return dataSource;
    }

    @Override
    public Optional<DataSource> findById(Long id) {
        DataSource dataSource = dataSourceMapper.findById(id);
        return Optional.ofNullable(dataSource);
    }

    @Override
    public Optional<DataSource> findByCode(String code) {
        DataSource dataSource = dataSourceMapper.findByCode(code);
        return Optional.ofNullable(dataSource);
    }

    @Override
    public List<DataSource> findByProjectCode(String projectCode) {
        return dataSourceMapper.findByProjectCode(projectCode);
    }

    @Override
    public List<DataSource> findByProjectCodeAndType(String projectCode, String type) {
        return dataSourceMapper.findByProjectCodeAndType(projectCode, type);
    }

    @Override
    public void deleteById(Long id) {
        dataSourceMapper.deleteById(id);
    }

    @Override
    public void deleteByCode(String code) {
        dataSourceMapper.deleteByCode(code);
    }
}

