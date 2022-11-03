package com.movie.model

import javax.persistence.*

@Entity
@Table(name="movieYear")
data class MovieYear @JvmOverloads constructor(
        @Id
        @GeneratedValue(strategy=GenerationType.IDENTITY)
        val id: Int?=null,

        @JoinColumn(name="movie_year", nullable = false)
        @Column(unique = true)
        val year:Int
)
