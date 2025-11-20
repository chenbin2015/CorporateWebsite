package com.company.platform.client.datasource;

import com.company.platform.application.datasource.DataSourceItemCommandService;
import com.company.platform.application.datasource.DataSourceItemQueryService;
import com.company.platform.application.datasource.command.CreateDataSourceItemCommand;
import com.company.platform.application.datasource.command.ReorderDataSourceItemsCommand;
import com.company.platform.application.datasource.command.UpdateDataSourceItemCommand;
import com.company.platform.domain.datasource.model.DataSourceItem;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/data-sources/{dataSourceCode}/items")
public class DataSourceItemController {

    private final DataSourceItemQueryService dataSourceItemQueryService;
    private final DataSourceItemCommandService dataSourceItemCommandService;

    public DataSourceItemController(
            DataSourceItemQueryService dataSourceItemQueryService,
            DataSourceItemCommandService dataSourceItemCommandService) {
        this.dataSourceItemQueryService = dataSourceItemQueryService;
        this.dataSourceItemCommandService = dataSourceItemCommandService;
    }

    @GetMapping
    public List<DataSourceItem> list(@PathVariable("dataSourceCode") String dataSourceCode) {
        return dataSourceItemQueryService.listDataSourceItemsByDataSourceCode(dataSourceCode);
    }

    @GetMapping("/{itemCode}")
    public DataSourceItem get(@PathVariable("itemCode") String itemCode) {
        return dataSourceItemQueryService.getDataSourceItemByCode(itemCode);
    }

    @PostMapping
    public ResponseEntity<DataSourceItem> create(
            @PathVariable("dataSourceCode") String dataSourceCode,
            @RequestBody CreateDataSourceItemRequest request) {
        CreateDataSourceItemCommand command = new CreateDataSourceItemCommand();
        command.setDataSourceCode(dataSourceCode);
        command.setData(request.getData());
        command.setSortOrder(request.getSortOrder());

        DataSourceItem item = dataSourceItemCommandService.createDataSourceItem(command);
        return ResponseEntity.status(HttpStatus.CREATED).body(item);
    }

    @PutMapping("/{itemCode}")
    public ResponseEntity<DataSourceItem> update(
            @PathVariable("itemCode") String itemCode,
            @RequestBody UpdateDataSourceItemRequest request) {
        UpdateDataSourceItemCommand command = new UpdateDataSourceItemCommand();
        command.setCode(itemCode);
        command.setData(request.getData());
        command.setSortOrder(request.getSortOrder());

        DataSourceItem updatedItem = dataSourceItemCommandService.updateDataSourceItem(command);
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/{itemCode}")
    public ResponseEntity<Map<String, Boolean>> delete(@PathVariable("itemCode") String itemCode) {
        dataSourceItemCommandService.deleteDataSourceItem(itemCode);
        return ResponseEntity.ok(Map.of("success", true));
    }

    @PutMapping("/reorder")
    public ResponseEntity<Map<String, Boolean>> reorder(
            @PathVariable("dataSourceCode") String dataSourceCode,
            @RequestBody ReorderDataSourceItemsRequest request) {
        ReorderDataSourceItemsCommand command = new ReorderDataSourceItemsCommand();
        command.setDataSourceCode(dataSourceCode);
        
        // 转换 ItemOrder 类型
        List<ReorderDataSourceItemsCommand.ItemOrder> commandItemOrders = request.getItemOrders().stream()
                .map(itemOrder -> {
                    ReorderDataSourceItemsCommand.ItemOrder commandItemOrder = new ReorderDataSourceItemsCommand.ItemOrder();
                    commandItemOrder.setCode(itemOrder.getCode());
                    commandItemOrder.setSortOrder(itemOrder.getSortOrder());
                    return commandItemOrder;
                })
                .collect(Collectors.toList());
        command.setItemOrders(commandItemOrders);

        dataSourceItemCommandService.reorderDataSourceItems(command);
        return ResponseEntity.ok(Map.of("success", true));
    }

    // DTOs
    public static class CreateDataSourceItemRequest {
        private String data;
        private Integer sortOrder;

        public String getData() {
            return data;
        }

        public void setData(String data) {
            this.data = data;
        }

        public Integer getSortOrder() {
            return sortOrder;
        }

        public void setSortOrder(Integer sortOrder) {
            this.sortOrder = sortOrder;
        }
    }

    public static class UpdateDataSourceItemRequest {
        private String data;
        private Integer sortOrder;

        public String getData() {
            return data;
        }

        public void setData(String data) {
            this.data = data;
        }

        public Integer getSortOrder() {
            return sortOrder;
        }

        public void setSortOrder(Integer sortOrder) {
            this.sortOrder = sortOrder;
        }
    }

    public static class ReorderDataSourceItemsRequest {
        private List<ItemOrder> itemOrders;

        public List<ItemOrder> getItemOrders() {
            return itemOrders;
        }

        public void setItemOrders(List<ItemOrder> itemOrders) {
            this.itemOrders = itemOrders;
        }

        public static class ItemOrder {
            private String code;
            private Integer sortOrder;

            public String getCode() {
                return code;
            }

            public void setCode(String code) {
                this.code = code;
            }

            public Integer getSortOrder() {
                return sortOrder;
            }

            public void setSortOrder(Integer sortOrder) {
                this.sortOrder = sortOrder;
            }
        }
    }
}
