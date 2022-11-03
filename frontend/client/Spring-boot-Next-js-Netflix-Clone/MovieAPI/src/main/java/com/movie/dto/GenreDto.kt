package com.movie.dto

import com.movie.model.Genre
import com.movie.model.Movie

data class GenreDto @JvmOverloads constructor(
        val id: Int?=null,
        val genre:String?,
        val movies: Set<Movie>?=null
){
    companion object{
        @JvmStatic
        fun convert(from: Genre): GenreDto{
            return GenreDto(from.id,from.genre,from.movies)
        }
    }
}
