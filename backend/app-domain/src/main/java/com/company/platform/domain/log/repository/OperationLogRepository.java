package com.company.platform.domain.log.repository;

import com.company.platform.domain.log.model.OperationLog;

import java.time.LocalDateTime;
import java.util.List;

public interface OperationLogRepository {

    void save(OperationLog log);

    List<OperationLog> findByConditions(
            String operationType,
            String operator,
            String keyword,
            LocalDateTime startDate,
            LocalDateTime endDate
    );
}

