package com.company.platform;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.company.platform")
@MapperScan({
        "com.company.platform.infrastructure.user.database",
        "com.company.platform.infrastructure.project.database",
        "com.company.platform.infrastructure.page.database"
})
public class BootstrapApplication {

    public static void main(String[] args) {
        SpringApplication.run(BootstrapApplication.class, args);
    }
}


