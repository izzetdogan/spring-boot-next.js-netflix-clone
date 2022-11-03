package com.movie.model

import com.fasterxml.jackson.annotation.JsonIgnore
import org.hibernate.Hibernate
import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.JoinTable
import javax.persistence.ManyToMany
import javax.persistence.Table

@Entity
@Table(name="genre")
data class Genre @JvmOverloads constructor(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int?,

        @Column(unique = true)
        val genre: String,

        @ManyToMany(cascade = [CascadeType.ALL])
        @JoinTable(
                name = "movie_genre",
                joinColumns = [JoinColumn(name = "genre_id")],
                inverseJoinColumns = [JoinColumn(name = "movie_id")])
        @OnDelete(action = OnDeleteAction.CASCADE)
        @JsonIgnore
        val movies: Set<Movie>?= HashSet()
) {
        override fun equals(other: Any?): Boolean {
                if (this === other) return true
                if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
                other as Genre

                return id != null && id == other.id
        }

        override fun hashCode(): Int = javaClass.hashCode()

        @Override
        override fun toString(): String {
                return this::class.simpleName + "(id = $id , genre = $genre )"
        }
}

