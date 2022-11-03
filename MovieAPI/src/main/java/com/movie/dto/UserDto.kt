package com.movie.dto

import com.movie.model.Movie
import com.movie.model.User

data class UserDto @JvmOverloads constructor(
        val id:Long?,
        val name: String?,
        val email:String,
        val password: String,
        val movies: Set<Movie>? = HashSet(),
        val isAdmin: Boolean,
){
    companion object{
        @JvmStatic
        fun convert(from: User):  UserDto{
            return UserDto(from.id,
                    from.name,
                    from.email,
                    from.password,
                    from.movieList,
                    from.authorities.stream().anyMatch{a-> a.authority.equals("ROLE_ADMIN")})
        }
    }
}
