package com.company.platform.client.news;

import com.company.platform.application.datasource.DataSourceItemQueryService;
import com.company.platform.application.page.PageQueryService;
import com.company.platform.domain.datasource.model.DataSourceItem;
import com.company.platform.domain.page.model.Page;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    private final PageQueryService pageQueryService;
    private final DataSourceItemQueryService dataSourceItemQueryService;
    private final ObjectMapper objectMapper;

    public NewsController(
            PageQueryService pageQueryService,
            DataSourceItemQueryService dataSourceItemQueryService,
            ObjectMapper objectMapper) {
        this.pageQueryService = pageQueryService;
        this.dataSourceItemQueryService = dataSourceItemQueryService;
        this.objectMapper = objectMapper;
    }

    /**
     * 获取新闻详情
     * 从项目下的所有页面的 schema_data 中查找对应的新闻项
     * 
     * @param newsId 新闻ID
     * @param projectCode 项目代码（查询参数）
     * @return 新闻详情数据
     */
    @GetMapping("/{newsId}")
    public ResponseEntity<Map<String, Object>> getNewsDetail(
            @PathVariable("newsId") String newsId,
            @RequestParam("projectCode") String projectCode) {
        
        try {
            // 优先从数据源查找（newsId 可能是数据源项的 code）
            try {
                DataSourceItem item = dataSourceItemQueryService.getDataSourceItemByCode(newsId);
                if (item != null) {
                    // 解析 JSON 数据
                    Map<String, Object> data = objectMapper.readValue(
                            item.getData(),
                            new TypeReference<Map<String, Object>>() {}
                    );
                    // 添加 code 字段
                    data.put("id", item.getCode());
                    return ResponseEntity.ok(data);
                }
            } catch (Exception e) {
                // 数据源查找失败，继续从页面 schema 查找
            }
            
            // 从页面 schema 查找（向后兼容）
            // 获取项目下的所有页面
            List<Page> pages = pageQueryService.listPagesByProjectCode(projectCode);
            
            // 遍历所有页面，查找新闻项
            for (Page page : pages) {
                // 优先使用已发布的数据，如果没有则使用草稿数据
                String schemaData = page.getPublishedSchemaData() != null && !page.getPublishedSchemaData().isEmpty()
                        ? page.getPublishedSchemaData()
                        : page.getSchemaData();
                
                if (schemaData == null || schemaData.isEmpty()) {
                    continue;
                }
                
                try {
                    // 解析 schema_data JSON
                    List<Map<String, Object>> components = objectMapper.readValue(
                            schemaData,
                            new TypeReference<List<Map<String, Object>>>() {}
                    );
                    
                    // 查找 NewsSection 或 NewsListPage 组件
                    for (Map<String, Object> component : components) {
                        String componentKey = (String) component.get("key");
                        if (!"NewsSection".equals(componentKey) && !"NewsListPage".equals(componentKey)) {
                            continue;
                        }
                        
                        // 获取组件的 props
                        Map<String, Object> props = (Map<String, Object>) component.get("props");
                        if (props == null) {
                            continue;
                        }
                        
                        // 查找 items 数组
                        List<Map<String, Object>> items = (List<Map<String, Object>>) props.get("items");
                        if (items == null) {
                            continue;
                        }
                        
                        // 在 items 中查找匹配的新闻项
                        for (Map<String, Object> item : items) {
                            String itemId = item.get("id") != null ? item.get("id").toString() : null;
                            if (newsId.equals(itemId)) {
                                // 找到匹配的新闻项，返回完整数据
                                return ResponseEntity.ok(item);
                            }
                        }
                        
                        // 如果是 NewsSection，还要检查 highlight
                        if ("NewsSection".equals(componentKey)) {
                            Map<String, Object> highlight = (Map<String, Object>) props.get("highlight");
                            if (highlight != null) {
                                String highlightId = highlight.get("id") != null ? highlight.get("id").toString() : null;
                                if (newsId.equals(highlightId)) {
                                    return ResponseEntity.ok(highlight);
                                }
                            }
                        }
                    }
                } catch (Exception e) {
                    // 解析失败，跳过该页面
                    System.err.println("Failed to parse schema data for page " + page.getId() + ": " + e.getMessage());
                    continue;
                }
            }
            
            // 未找到新闻项
            return ResponseEntity.notFound().build();
            
        } catch (Exception e) {
            System.err.println("Failed to get news detail: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}

