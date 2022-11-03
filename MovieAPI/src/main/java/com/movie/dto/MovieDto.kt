package com.movie.dto


import com.movie.model.Genre
import com.movie.model.Movie

data class MovieDto(
        val id:Long?,
        val title: String,
        val description: String,
        val movieImage: String?,
        val movieUrl: String,
        val trailer: String,
        val year: Int,
        val genres: Set<Genre>?= HashSet(),
        val isMovie: Boolean?=true,
){
    companion object{
        @JvmStatic
        fun convert(from: Movie): MovieDto{
            return MovieDto(
                    from.id,
                    from.title,
                    from.description,
                    from.movieImage,
                    from.movieUrl,
                    from.trailer,
                    from.year?.year ?: 1995,
                    from.genres,
                    from.isMovie
            )
        }
    }
}