package com.movie.model

import com.fasterxml.jackson.annotation.JsonManagedReference
import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.util.stream.Collectors
import javax.persistence.*

@Entity
@Table(name="users")
data class User @JvmOverloads constructor(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long?=0,

        @Column(name = "user_name", nullable = false, length = 100)
        val name: String?="user",

        @Column(unique = true)
        val email: String,
        private val password: String,

        @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY)
        @OnDelete(action = OnDeleteAction.CASCADE)
        @JsonManagedReference
        val movieList: Set<Movie>? = HashSet(),

        @ManyToMany(fetch = FetchType.EAGER)
        @JoinTable(name = "user_role",
                joinColumns = [JoinColumn(name = "user", referencedColumnName = "id")],
                inverseJoinColumns = [JoinColumn(name = "role", referencedColumnName = "id")])
        val roles: Set<Role> = HashSet(),
): UserDetails
{

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return roles.stream()
                .map { (_, role): Role -> SimpleGrantedAuthority(role) }.collect(Collectors.toList())
    }

    override fun getPassword(): String {
        return this.password
    }


    override fun getUsername(): String {
        return this.email
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }
}
