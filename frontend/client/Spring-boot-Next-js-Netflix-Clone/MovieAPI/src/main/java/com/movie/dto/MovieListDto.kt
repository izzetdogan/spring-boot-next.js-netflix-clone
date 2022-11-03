package com.movie.dto

import com.movie.model.Movie
import com.movie.model.MovieList
import javax.validation.constraints.NotBlank

data class MovieListDto(
        val id: Int? = null,
        val title: @NotBlank(message = "Title cannot be null") String? = null,
        val types: @NotBlank(message = "Type cannot be null") String? = null,
        val movies: Set<Movie>? = HashSet()
){
    companion object{
        @JvmStatic
        fun convert(from: MovieList):MovieListDto{
            return MovieListDto(from.id,from.title,from.types,from.movies)
        }
    }
}
