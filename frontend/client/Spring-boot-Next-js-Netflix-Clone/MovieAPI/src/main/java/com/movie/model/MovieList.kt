package com.movie.model

import org.hibernate.Hibernate
import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import javax.persistence.*

@Entity
@Table(name = "list")
data class MovieList @JvmOverloads constructor(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int?=0,
        val title: String ,
        val types: String ,

        @ManyToMany(mappedBy = "lists")
        @OnDelete(action = OnDeleteAction.CASCADE)
        val movies: Set<Movie>? = HashSet()
) {
        override fun equals(other: Any?): Boolean {
                if (this === other) return true
                if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
                other as MovieList

                return id != null && id == other.id
        }

        override fun hashCode(): Int = javaClass.hashCode()

        @Override
        override fun toString(): String {
                return this::class.simpleName + "(id = $id )"
        }
}
