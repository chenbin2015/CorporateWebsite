package com.company.platform.infrastructure.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan("com.company.platform.repository")
public class MyBatisConfiguration {
}

