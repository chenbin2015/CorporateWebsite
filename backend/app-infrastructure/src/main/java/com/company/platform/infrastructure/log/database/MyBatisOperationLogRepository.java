package com.company.platform.infrastructure.log.database;

import com.company.platform.domain.log.model.OperationLog;
import com.company.platform.domain.log.repository.OperationLogRepository;
import com.company.platform.infrastructure.log.database.model.OperationLogDO;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class MyBatisOperationLogRepository implements OperationLogRepository {

    private final OperationLogMapper mapper;

    public MyBatisOperationLogRepository(OperationLogMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public void save(OperationLog log) {
        OperationLogDO logDO = toDO(log);
        mapper.insert(logDO);
        log.setId(logDO.getId());
    }

    @Override
    public List<OperationLog> findByConditions(
            String operationType,
            String operator,
            String keyword,
            LocalDateTime startDate,
            LocalDateTime endDate
    ) {
        List<OperationLogDO> logDOs = mapper.findByConditions(operationType, operator, keyword, startDate, endDate);
        return logDOs.stream().map(this::toModel).collect(Collectors.toList());
    }

    private OperationLogDO toDO(OperationLog log) {
        OperationLogDO logDO = new OperationLogDO();
        logDO.setId(log.getId());
        logDO.setOperationType(log.getOperationType());
        logDO.setOperation(log.getOperation());
        logDO.setOperator(log.getOperator());
        logDO.setTarget(log.getTarget());
        logDO.setDetails(log.getDetails());
        logDO.setIp(log.getIp());
        logDO.setCreateTime(log.getCreateTime());
        return logDO;
    }

    private OperationLog toModel(OperationLogDO logDO) {
        OperationLog log = new OperationLog();
        log.setId(logDO.getId());
        log.setOperationType(logDO.getOperationType());
        log.setOperation(logDO.getOperation());
        log.setOperator(logDO.getOperator());
        log.setTarget(logDO.getTarget());
        log.setDetails(logDO.getDetails());
        log.setIp(logDO.getIp());
        log.setCreateTime(logDO.getCreateTime());
        return log;
    }
}

