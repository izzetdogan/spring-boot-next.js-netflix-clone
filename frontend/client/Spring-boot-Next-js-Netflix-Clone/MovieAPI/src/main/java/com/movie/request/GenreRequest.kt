package com.movie.request

import com.movie.model.Genre
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull

data class GenreRequest(
        val id:Int?,
        @field:NotNull(message = "field cannot be Null")
        @field:NotBlank(message = "field cannot be Empty")
        val genre:String?
){
    companion object{
        @JvmStatic
        fun convert(from: Genre): GenreRequest{
            return GenreRequest(from.id,from.genre)
        }
    }
}
