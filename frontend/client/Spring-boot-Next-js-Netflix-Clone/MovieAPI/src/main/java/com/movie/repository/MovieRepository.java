package com.movie.repository;

import com.movie.model.Movie;
import com.movie.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie,Long> {

    List<Movie> findMovieByGenresId(Integer id);
    List<Movie> findMovieByIsMovie(boolean control);
    List<Movie> findMovieByGenresGenre(String genre);
   @Query(value = "SELECT * From movie WHERE title LIKE %?1%",nativeQuery = true)
    List<Movie> searchMovieByKeyword(String keyword);

    @Query(value = "select * from movie order by RAND() limit 10",nativeQuery = true)
    List<Movie> findRandomMovie();

    @Query(value ="select * from movie m Where  m.is_movie=?1 order by RAND() limit 1" , nativeQuery = true)
    Movie findRandomOneMovie(Integer control);
    //List<Movie> findByTitleContaining(String keyword);

    @Query(value = "SELECT * FROM movie order by id desc limit 5",nativeQuery = true)
    List<Movie>  findLastFiveMovie();

}
