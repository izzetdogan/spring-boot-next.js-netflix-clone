package com.movie.request

import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull

data class UserUpdateRequest(
        @field: NotBlank(message = "Name could not be empty")
        val name:String?,
        @field: NotNull(message = "Please choose  User Role")
        val isAdmin:Boolean?=false,
)
