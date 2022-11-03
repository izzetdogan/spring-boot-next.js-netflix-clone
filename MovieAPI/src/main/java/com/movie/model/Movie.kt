package com.movie.model


import com.fasterxml.jackson.annotation.JsonIgnore
import org.hibernate.Hibernate
import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import javax.persistence.*

@Entity
@Table(name="movie")
data class Movie @JvmOverloads constructor(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long?=null,

        val title:String,
        @Column(length = 512)
        val description:String,

        val movieImage:String?,
        val trailer:String,
        val movieUrl:String,

        @ManyToOne
        @JoinColumn(name = "movieYear_id")
        val year: MovieYear? ,

        @ManyToMany(mappedBy = "movies", fetch = FetchType.LAZY , cascade = [CascadeType.MERGE])
        @OnDelete(action = OnDeleteAction.CASCADE)
        val genres: Set<Genre>? = HashSet(),

        @ManyToMany @JoinTable(name = "movie_user",
                joinColumns = [JoinColumn(name = "movie_id")],
                inverseJoinColumns = [JoinColumn(name = "user_id")])
        @OnDelete(action = OnDeleteAction.CASCADE)
        @JsonIgnore
        val users: Set<User>? = HashSet(),


        @ManyToMany @JoinTable(name = "movie_lists",
                joinColumns = [JoinColumn(name = "movie_id")],
                inverseJoinColumns = [JoinColumn(name = "list_id")])
        @OnDelete(action = OnDeleteAction.CASCADE)
        @JsonIgnore
        val lists: Set<MovieList>? = HashSet(),

        val isMovie: Boolean?,

        ) {
        override fun equals(other: Any?): Boolean {
                if (this === other) return true
                if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
                other as Movie

                return id != null && id == other.id
        }

        override fun hashCode(): Int = javaClass.hashCode()

        @Override
        override fun toString(): String {
                return this::class.simpleName + "(id = $id )"
        }
}
