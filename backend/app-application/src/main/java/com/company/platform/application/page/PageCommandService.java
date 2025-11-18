package com.company.platform.application.page;

import com.company.platform.application.page.command.CreatePageCommand;
import com.company.platform.application.page.command.PublishPageCommand;
import com.company.platform.application.page.command.SaveDraftCommand;
import com.company.platform.application.page.command.UpdatePageCommand;
import com.company.platform.domain.page.model.Page;
import com.company.platform.domain.page.repository.PageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PageCommandService {

    private final PageRepository pageRepository;

    public PageCommandService(PageRepository pageRepository) {
        this.pageRepository = pageRepository;
    }

    @Transactional
    public Page createPage(CreatePageCommand command) {
        Page page = new Page();
        page.setCode(UUID.randomUUID().toString()); // 生成全局唯一标识符
        page.setProjectId(command.getProjectId());
        page.setName(command.getName());
        page.setPath(command.getPath());
        page.setTitle(command.getTitle());
        page.setDescription(command.getDescription());
        page.setStatus("DRAFT");
        page.setSchemaData(command.getSchemaData() != null ? command.getSchemaData() : "[]");
        page.setVersion(1);
        return pageRepository.save(page);
    }

    @Transactional
    public Page saveDraft(SaveDraftCommand command) {
        Page page = pageRepository.findByProjectIdAndId(command.getProjectId(), command.getPageId())
                .orElseThrow(() -> new RuntimeException("Page not found"));

        if (command.getName() != null) {
            page.setName(command.getName());
        }
        if (command.getPath() != null) {
            page.setPath(command.getPath());
        }
        if (command.getTitle() != null) {
            page.setTitle(command.getTitle());
        }
        if (command.getDescription() != null) {
            page.setDescription(command.getDescription());
        }
        if (command.getSchemaData() != null) {
            page.setSchemaData(command.getSchemaData());
        }
        page.setStatus("DRAFT");

        return pageRepository.save(page);
    }

    @Transactional
    public Page publishPage(PublishPageCommand command) {
        Page page = pageRepository.findByProjectIdAndId(command.getProjectId(), command.getPageId())
                .orElseThrow(() -> new RuntimeException("Page not found"));

        // 如果提供了新的schemaData，使用它；否则使用当前的schemaData（草稿）
        String schemaToPublish = command.getSchemaData() != null 
                ? command.getSchemaData() 
                : page.getSchemaData();

        // 只更新 publishedSchemaData，不更新 schemaData（保持草稿数据独立）
        page.setPublishedSchemaData(schemaToPublish);
        // 注意：不更新 schemaData，保持草稿数据可以继续修改
        page.setStatus("PUBLISHED");
        page.setVersion(page.getVersion() + 1);
        page.setPublishedAt(LocalDateTime.now());

        return pageRepository.save(page);
    }

    @Transactional
    public Page updatePage(UpdatePageCommand command) {
        Page page = pageRepository.findByProjectIdAndId(command.getProjectId(), command.getPageId())
                .orElseThrow(() -> new RuntimeException("Page not found"));

        if (command.getName() != null) {
            page.setName(command.getName());
        }
        if (command.getPath() != null) {
            page.setPath(command.getPath());
        }
        if (command.getTitle() != null) {
            page.setTitle(command.getTitle());
        }
        if (command.getDescription() != null) {
            page.setDescription(command.getDescription());
        }

        return pageRepository.save(page);
    }

    @Transactional
    public void deletePage(Long projectId, Long pageId) {
        Page page = pageRepository.findByProjectIdAndId(projectId, pageId)
                .orElseThrow(() -> new RuntimeException("Page not found"));
        pageRepository.deleteById(page.getId());
    }
}

