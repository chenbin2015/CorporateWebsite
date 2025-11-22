package com.company.platform.client.log;

import com.company.platform.application.log.LogQueryService;
import com.company.platform.domain.log.model.OperationLog;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/system/logs")
public class LogController {

    private final LogQueryService logQueryService;

    public LogController(LogQueryService logQueryService) {
        this.logQueryService = logQueryService;
    }

    @GetMapping
    public List<OperationLog> queryLogs(
            @RequestParam(required = false) String operationType,
            @RequestParam(required = false) String operator,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate
    ) {
        return logQueryService.queryLogs(operationType, operator, keyword, startDate, endDate);
    }
}

