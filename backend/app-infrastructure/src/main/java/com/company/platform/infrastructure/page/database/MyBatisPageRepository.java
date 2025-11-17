package com.company.platform.infrastructure.page.database;

import com.company.platform.domain.page.model.Page;
import com.company.platform.domain.page.repository.PageRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class MyBatisPageRepository implements PageRepository {

    private final PageMapper pageMapper;

    public MyBatisPageRepository(PageMapper pageMapper) {
        this.pageMapper = pageMapper;
    }

    @Override
    public Page save(Page page) {
        if (page.getId() == null) {
            pageMapper.insert(page);
        } else {
            pageMapper.update(page);
        }
        return page;
    }

    @Override
    public Optional<Page> findById(Long id) {
        Page page = pageMapper.findById(id);
        return Optional.ofNullable(page);
    }

    @Override
    public Optional<Page> findByProjectIdAndId(Long projectId, Long id) {
        Page page = pageMapper.findByProjectIdAndId(projectId, id);
        return Optional.ofNullable(page);
    }

    @Override
    public Optional<Page> findByProjectIdAndPath(Long projectId, String path) {
        Page page = pageMapper.findByProjectIdAndPath(projectId, path);
        return Optional.ofNullable(page);
    }

    @Override
    public Optional<Page> findPublishedByPath(String path) {
        Page page = pageMapper.findPublishedByPath(path);
        return Optional.ofNullable(page);
    }

    @Override
    public List<Page> findByProjectId(Long projectId) {
        return pageMapper.findByProjectId(projectId);
    }

    @Override
    public void deleteById(Long id) {
        pageMapper.deleteById(id);
    }
}

