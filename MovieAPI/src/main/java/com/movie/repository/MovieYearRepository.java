package com.movie.repository;

import com.movie.model.MovieYear;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MovieYearRepository extends JpaRepository<MovieYear,Integer> {
    Optional<MovieYear> findByYear(Integer y);
}
