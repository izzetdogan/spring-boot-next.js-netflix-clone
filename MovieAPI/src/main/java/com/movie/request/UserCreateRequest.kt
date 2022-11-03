package com.movie.request

import javax.validation.constraints.Email
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.NotNull

data class UserCreateRequest(
        @field:NotEmpty(message = "User cannot be null")
        val name: String?="user",
        @field:Email(message = "It must be email")
        val email: String,
        @field:NotEmpty(message = "Password cannot be null")
        val password: String,
        @field:NotNull(message = "Please Choose a Role ")
        val isAdmin: Boolean?=null,
)
