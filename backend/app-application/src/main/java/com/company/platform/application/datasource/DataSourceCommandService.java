package com.company.platform.application.datasource;

import com.company.platform.application.datasource.command.CreateDataSourceCommand;
import com.company.platform.application.datasource.command.UpdateDataSourceCommand;
import com.company.platform.domain.datasource.model.DataSource;
import com.company.platform.domain.datasource.repository.DataSourceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class DataSourceCommandService {

    private final DataSourceRepository dataSourceRepository;

    public DataSourceCommandService(DataSourceRepository dataSourceRepository) {
        this.dataSourceRepository = dataSourceRepository;
    }

    @Transactional
    public DataSource createDataSource(CreateDataSourceCommand command) {
        DataSource dataSource = new DataSource();
        dataSource.setCode(UUID.randomUUID().toString());
        dataSource.setProjectCode(command.getProjectCode());
        dataSource.setName(command.getName());
        dataSource.setType(command.getType());
        dataSource.setDescription(command.getDescription());
        return dataSourceRepository.save(dataSource);
    }

    @Transactional
    public DataSource updateDataSource(UpdateDataSourceCommand command) {
        DataSource dataSource = dataSourceRepository.findByCode(command.getCode())
                .orElseThrow(() -> new RuntimeException("DataSource not found"));
        dataSource.setName(command.getName());
        dataSource.setType(command.getType());
        dataSource.setDescription(command.getDescription());
        return dataSourceRepository.save(dataSource);
    }

    @Transactional
    public void deleteDataSource(String code) {
        DataSource dataSource = dataSourceRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("DataSource not found"));
        dataSourceRepository.deleteByCode(code);
    }
}

