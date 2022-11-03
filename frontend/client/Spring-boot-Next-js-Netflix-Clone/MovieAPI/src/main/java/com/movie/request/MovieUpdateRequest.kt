package com.movie.request

import com.movie.model.Genre
import javax.validation.constraints.NotNull

data class MovieUpdateRequest (
        val title: String,
        val description: String,
        val movieImage: String,
        val movieUrl: String,
        val trailer: String,
        val year: Int,
        @field:NotNull(message = "Genre  Cannot be Empty")
        val genres: Set<Genre>?= HashSet(),
        val isMovie: Boolean?=true,
        )