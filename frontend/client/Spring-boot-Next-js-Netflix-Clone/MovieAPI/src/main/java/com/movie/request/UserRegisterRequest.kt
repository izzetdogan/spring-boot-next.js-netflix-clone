package com.movie.request

import javax.validation.constraints.Email

data class UserRegisterRequest(
        @field:Email(message = "It must be email")
        val username: String,
        val password: String
)
