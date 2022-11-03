package com.movie.dto

import com.movie.model.MovieYear
import javax.validation.constraints.Min

data class MovieYearDto(
        val id: Int?=null,
        @Min(value = 1950, message = "There must be at least 1950")
        val  year: Int,
){
        companion object{
                @JvmStatic
                fun convert(from: MovieYear): MovieYearDto{
                        return MovieYearDto(
                                from.id,
                                from.year
                        )
                }
        }
}