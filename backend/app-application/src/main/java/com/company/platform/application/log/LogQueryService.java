package com.company.platform.application.log;

import com.company.platform.domain.log.model.OperationLog;
import com.company.platform.domain.log.repository.OperationLogRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class LogQueryService {

    private final OperationLogRepository logRepository;
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public LogQueryService(OperationLogRepository logRepository) {
        this.logRepository = logRepository;
    }

    public List<OperationLog> queryLogs(
            String operationType,
            String operator,
            String keyword,
            String startDate,
            String endDate
    ) {
        LocalDateTime start = null;
        LocalDateTime end = null;

        if (startDate != null && !startDate.isEmpty()) {
            start = LocalDateTime.parse(startDate, FORMATTER);
        }
        if (endDate != null && !endDate.isEmpty()) {
            end = LocalDateTime.parse(endDate, FORMATTER);
        }

        return logRepository.findByConditions(operationType, operator, keyword, start, end);
    }
}

