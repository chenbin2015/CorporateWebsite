package com.company.platform.domain.page.repository;

import com.company.platform.domain.page.model.Page;

import java.util.List;
import java.util.Optional;

public interface PageRepository {

    Page save(Page page);

    Optional<Page> findById(Long id);

    Optional<Page> findByProjectIdAndId(Long projectId, Long id);

    Optional<Page> findByProjectIdAndPath(Long projectId, String path);

    Optional<Page> findPublishedByPath(String path);

    List<Page> findByProjectId(Long projectId);

    void deleteById(Long id);
}

