package com.company.platform.infrastructure.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan({
        "com.company.platform.infrastructure.project.database",
        "com.company.platform.infrastructure.page.database"
})
public class MyBatisConfig {
}


