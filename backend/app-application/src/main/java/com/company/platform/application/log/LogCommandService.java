package com.company.platform.application.log;

import com.company.platform.domain.log.model.OperationLog;
import com.company.platform.domain.log.repository.OperationLogRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class LogCommandService {

    private final OperationLogRepository logRepository;

    public LogCommandService(OperationLogRepository logRepository) {
        this.logRepository = logRepository;
    }

    public void recordLog(
            String operationType,
            String operation,
            String operator,
            String target,
            String details,
            String ip
    ) {
        OperationLog log = new OperationLog();
        log.setOperationType(operationType);
        log.setOperation(operation);
        log.setOperator(operator);
        log.setTarget(target);
        log.setDetails(details);
        log.setIp(ip);
        log.setCreateTime(LocalDateTime.now());
        logRepository.save(log);
    }
}

