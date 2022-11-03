package com.movie.response

data class AuthResponse(

        val id: Long?,
        val email: String,
        val name: String?,
        val token: String,
        val isAdmin: Boolean,
)