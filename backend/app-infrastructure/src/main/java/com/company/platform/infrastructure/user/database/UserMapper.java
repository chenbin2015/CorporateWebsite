package com.company.platform.infrastructure.user.database;

import com.company.platform.infrastructure.user.database.model.UserDO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Optional;

@Mapper
public interface UserMapper {

    void insert(UserDO user);

    Optional<UserDO> findByUsername(@Param("username") String username);

    boolean existsByUsername(@Param("username") String username);
}


