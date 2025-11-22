package com.company.platform.infrastructure.log.database;

import com.company.platform.infrastructure.log.database.model.OperationLogDO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface OperationLogMapper {

    void insert(OperationLogDO log);

    List<OperationLogDO> findByConditions(
            @Param("operationType") String operationType,
            @Param("operator") String operator,
            @Param("keyword") String keyword,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
}

