package com.company.platform.client.datasource;

import com.company.platform.application.datasource.DataSourceCommandService;
import com.company.platform.application.datasource.DataSourceQueryService;
import com.company.platform.application.datasource.command.CreateDataSourceCommand;
import com.company.platform.application.datasource.command.UpdateDataSourceCommand;
import com.company.platform.domain.datasource.model.DataSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects/{projectCode}/data-sources")
public class DataSourceController {

    private final DataSourceQueryService dataSourceQueryService;
    private final DataSourceCommandService dataSourceCommandService;

    public DataSourceController(
            DataSourceQueryService dataSourceQueryService,
            DataSourceCommandService dataSourceCommandService) {
        this.dataSourceQueryService = dataSourceQueryService;
        this.dataSourceCommandService = dataSourceCommandService;
    }

    @GetMapping
    public List<DataSource> list(
            @PathVariable("projectCode") String projectCode,
            @RequestParam(required = false) String type) {
        if (type != null && !type.isEmpty()) {
            return dataSourceQueryService.listDataSourcesByProjectCodeAndType(projectCode, type);
        }
        return dataSourceQueryService.listDataSourcesByProjectCode(projectCode);
    }

    @GetMapping("/{dataSourceCode}")
    public DataSource get(@PathVariable("dataSourceCode") String dataSourceCode) {
        return dataSourceQueryService.getDataSourceByCode(dataSourceCode);
    }

    @PostMapping
    public ResponseEntity<DataSource> create(
            @PathVariable("projectCode") String projectCode,
            @RequestBody CreateDataSourceRequest request) {
        CreateDataSourceCommand command = new CreateDataSourceCommand();
        command.setProjectCode(projectCode);
        command.setName(request.getName());
        command.setType(request.getType());
        command.setDescription(request.getDescription());

        DataSource dataSource = dataSourceCommandService.createDataSource(command);
        return ResponseEntity.status(HttpStatus.CREATED).body(dataSource);
    }

    @PutMapping("/{dataSourceCode}")
    public ResponseEntity<DataSource> update(
            @PathVariable("dataSourceCode") String dataSourceCode,
            @RequestBody UpdateDataSourceRequest request) {
        UpdateDataSourceCommand command = new UpdateDataSourceCommand();
        command.setCode(dataSourceCode);
        command.setName(request.getName());
        command.setType(request.getType());
        command.setDescription(request.getDescription());

        DataSource updatedDataSource = dataSourceCommandService.updateDataSource(command);
        return ResponseEntity.ok(updatedDataSource);
    }

    @DeleteMapping("/{dataSourceCode}")
    public ResponseEntity<Map<String, Boolean>> delete(@PathVariable("dataSourceCode") String dataSourceCode) {
        dataSourceCommandService.deleteDataSource(dataSourceCode);
        return ResponseEntity.ok(Map.of("success", true));
    }

    // DTOs
    public static class CreateDataSourceRequest {
        private String name;
        private String type;
        private String description;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }

    public static class UpdateDataSourceRequest {
        private String name;
        private String type;
        private String description;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }
}
