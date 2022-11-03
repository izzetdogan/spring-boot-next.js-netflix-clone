package com.movie.service;

import com.movie.dto.UserDto;
import com.movie.exception.AuthException;
import com.movie.exception.ResourceNotFoundException;
import com.movie.model.Movie;
import com.movie.model.Role;
import com.movie.model.User;
import com.movie.repository.MovieRepository;
import com.movie.repository.RoleRepository;
import com.movie.repository.UserRepository;
import com.movie.request.UserCreateRequest;
import com.movie.request.UserRegisterRequest;
import com.movie.request.UserUpdateRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    private final PasswordEncoder passwordEncoder;

    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository,
                       MovieRepository movieRepository,
                       PasswordEncoder passwordEncoder,
                       RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }


    public List<UserDto> getAllUsers(Boolean newUsers) {
        if (newUsers) {
            return this.userRepository.findLastFiveUser().stream()
                    .map(UserDto::convert).collect(Collectors.toList());
        }
        return this.userRepository.findAll(Sort.by("id").descending()).stream()
                .map(UserDto::convert).collect(Collectors.toList());
    }

    public UserDto getUserByEmail(String email) {
        User user = this.userRepository.findUserByEmail(email);
        return UserDto.convert(user);
    }


    public UserDto getUserById(Long id) {
        return UserDto.convert(this.findUserByID(id));
    }

    public void registerNewUser(UserRegisterRequest request) {
        Optional<User> findUser = this.userRepository.findByEmail(request.getUsername());
        if (findUser.isPresent())
            throw new AuthException("This user already exist");
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        Role role = roleRepository.findById(2)
                .orElseThrow(() -> new ResourceNotFoundException("There is no role"));
        String name = "";
        if (!request.getUsername().equals("")) {
            name = request.getUsername().split("@", 2)[0];
        }
        User user = new User(null, name, request.getUsername(), encodedPassword);
        user.getRoles().add(role);
        this.userRepository.save(user);
    }


    //Create User
    public UserDto createUser(UserCreateRequest request) {
        Optional<User> findUser = this.userRepository.findByEmail(request.getEmail());
        if (findUser.isPresent())
            throw new AuthException("This user already exist");
        User user = new User
                (
                        null,
                        request.getName(),
                        request.getEmail(),
                        passwordEncoder.encode(request.getPassword())
                );
        Role role = userRole(Objects.requireNonNull(request.isAdmin()));
        user.getRoles().add(role);
        this.userRepository.save(user);
        return UserDto.convert(user);
    }

    // Update User
    public void updateUser(Long id, UserUpdateRequest request) {
        User user = this.findUserByID(id);
        User updateOne = new User(
                user.getId(),
                request.getName(),
                user.getUsername(),
                user.getPassword()
        );
        Role role = this.userRole(Objects.requireNonNull(request.isAdmin()));
        updateOne.getRoles().removeAll(user.getRoles());
        updateOne.getRoles().add(role);
        this.userRepository.save(updateOne);
    }

    //Delete User
    public void deleteUser(Long id) {
        this.userRepository.delete(this.findUserByID(id));
    }

    // Add Movies To User-Movie-List
    public UserDto addMovieToUserMovieList(Long id, Long movieId) {
        User user = this.findUserByID(id);
        Movie movie = this.movieRepository.findById(movieId)
                .orElseThrow(() -> new ResourceNotFoundException("Movie could not found"));
        user.getMovieList().add(movie);
        movie.getUsers().add(user);
        this.movieRepository.save(movie);
        this.userRepository.save(user);
        return UserDto.convert(user);
    }

    // Remove Movie From User-Movie-List
    public UserDto removeMovieFromUserMovieList(Long userId, Long movieId) {
        User user = this.findUserByID(userId);
        Movie movie = this.movieRepository.findById(movieId)
                .orElseThrow(() -> new ResourceNotFoundException("Movie could not found"));
        user.getMovieList().remove(movie);
        movie.getUsers().remove(user);
        this.movieRepository.save(movie);
        this.userRepository.save(user);
        return UserDto.convert(user);
    }

    private Role userRole(Boolean isAdmin) {
        Role role;
        if (isAdmin) {
            role = roleRepository.findById(1)
                    .orElseThrow(() -> new ResourceNotFoundException("Role is  not found"));
        } else {
            role = roleRepository.findById(2)
                    .orElseThrow(() -> new ResourceNotFoundException("Role is not found"));
        }
        return role;
    }


    private User findUserByID(Long id) {
        return this.userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User is  not found"));
    }


}
