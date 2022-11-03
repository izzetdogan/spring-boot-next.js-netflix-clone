package com.movie.request

import com.movie.model.MovieYear
import javax.validation.constraints.NotNull

data class MovieYearRequest(
        @field:NotNull(message = "year field cannot be null")
        val year:Int
){
    companion object{
        @JvmStatic
        fun convert(from: MovieYear): MovieYearRequest{
            return MovieYearRequest(from.year)
        }
    }
}
