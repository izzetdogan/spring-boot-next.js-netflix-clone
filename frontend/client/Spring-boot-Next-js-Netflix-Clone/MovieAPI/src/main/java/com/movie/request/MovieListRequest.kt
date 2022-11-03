package com.movie.request

import com.movie.model.Movie
import javax.validation.constraints.NotBlank

data class MovieListRequest(
        @field:NotBlank(message = "Title cannot be empty")
        val title:String,
        @field:NotBlank(message = "Type cannot be empty")
        val types:String,
        val movies: Set<Long>? = HashSet()
)
