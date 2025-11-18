package com.company.platform.application.page;

import com.company.platform.domain.page.model.Page;
import com.company.platform.domain.page.repository.PageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PageQueryService {

    private final PageRepository pageRepository;

    public PageQueryService(PageRepository pageRepository) {
        this.pageRepository = pageRepository;
    }

    public List<Page> listPages(Long projectId) {
        return pageRepository.findByProjectId(projectId);
    }

    public List<Page> listPagesByProjectCode(String projectCode) {
        return pageRepository.findByProjectCode(projectCode);
    }

    public Page getPage(Long projectId, Long pageId) {
        return pageRepository.findByProjectIdAndId(projectId, pageId)
                .orElseThrow(() -> new RuntimeException("Page not found"));
    }

    public Page getPageByCode(String projectCode, String pageCode) {
        return pageRepository.findByProjectCodeAndPageCode(projectCode, pageCode)
                .orElseThrow(() -> new RuntimeException("Page not found"));
    }

    public Page getPublishedPage(String path) {
        return pageRepository.findPublishedByPath(path)
                .orElseThrow(() -> new RuntimeException("Published page not found"));
    }
}

