package com.movie.repository;

import com.movie.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    User findUserByEmail(String email);
    @Query(value = "SELECT * FROM users order by id desc limit 7",nativeQuery = true)
    List<User>  findLastFiveUser();
}
