package com.company.platform.infrastructure.user.database;

import com.company.platform.domain.user.model.User;
import com.company.platform.domain.user.repository.UserRepository;
import com.company.platform.infrastructure.user.database.model.UserDO;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class MyBatisUserRepository implements UserRepository {

    private final UserMapper userMapper;

    public MyBatisUserRepository(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public void save(User user) {
        UserDO data = new UserDO();
        data.setId(user.getId());
        data.setUsername(user.getUsername());
        data.setPassword(user.getPassword());
        data.setRole(user.getRole());
        data.setCreatedAt(user.getCreatedAt());
        userMapper.insert(data);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userMapper.findByUsername(username).map(this::toDomain);
    }

    @Override
    public boolean existsByUsername(String username) {
        return userMapper.existsByUsername(username);
    }

    private User toDomain(UserDO data) {
        User user = new User();
        user.setId(data.getId());
        user.setUsername(data.getUsername());
        user.setPassword(data.getPassword());
        user.setRole(data.getRole());
        user.setCreatedAt(data.getCreatedAt());
        return user;
    }
}


