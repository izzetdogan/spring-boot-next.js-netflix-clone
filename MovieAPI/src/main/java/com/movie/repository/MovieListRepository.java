package com.movie.repository;

import com.movie.model.Genre;
import com.movie.model.MovieList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovieListRepository extends JpaRepository<MovieList, Integer> {

    List<MovieList> findByTypes(String type);
    /*
    List<MovieList> findByTypesAndGenre(String type, Genre genre);

    List<MovieList> findByGenre(String genre);

    List<MovieList> findMovieListByMoviesGenres(Genre genre);

     */
    @Query(value="Select* from list limit 3",nativeQuery = true)
    List<MovieList> findThreeList();
}
