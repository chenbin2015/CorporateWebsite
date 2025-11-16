package com.company.platform.domain.user.repository;

import com.company.platform.domain.user.model.User;

import java.util.Optional;

public interface UserRepository {

    void save(User user);

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);
}


