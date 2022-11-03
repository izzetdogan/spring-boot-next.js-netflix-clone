package com.movie.repository;

import com.movie.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GenreRepository extends JpaRepository<Genre, Integer> {
    Genre findByGenreContaining(String genre);

    Genre findByGenre(String genre);

    Boolean existsByGenre(String email);
}
