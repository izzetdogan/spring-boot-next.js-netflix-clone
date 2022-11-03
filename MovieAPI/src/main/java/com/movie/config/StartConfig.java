package com.movie.config;

import com.movie.model.Role;
import com.movie.repository.RoleRepository;
import com.movie.repository.UserRepository;
import com.movie.request.MovieYearRequest;
import com.movie.request.UserCreateRequest;
import com.movie.service.MovieYearService;
import com.movie.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.stream.IntStream;

@Component
public class StartConfig implements CommandLineRunner {

    private final UserService userService;
    private final RoleRepository roleRepository;
    private final MovieYearService movieYearService;
    private final UserRepository userRepository;

    public StartConfig(UserService userService, RoleRepository roleRepository, MovieYearService movieYearService, UserRepository userRepository) {
        this.userService = userService;
        this.roleRepository = roleRepository;
        this.movieYearService = movieYearService;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        addRole();
        addUser();
        addYears();

    }

    private void  addRole(){
        Role addAdmin = new Role(1, "ROLE_ADMIN");
        Role addNormal = new Role(2, "ROLE_NORMAL");
        if(this.roleRepository.findById(1).isEmpty())
            this.roleRepository.save(addAdmin);
        if(this.roleRepository.findById(2).isEmpty())
            this.roleRepository.save(addNormal);

    }

    private void addUser(){
        UserCreateRequest user = new UserCreateRequest(
                "admin",
                "admin@gmail.com",
                "admin6287",
                true
        );
        if(userRepository.findByEmail(user.getEmail()).isEmpty())
            this.userService.createUser(user);
    }

    private void addYears(){
        //IntStream.range(2000,2023).forEach(y-> this.movieYearService.createMovieYear(new MovieYearRequest(y)));
    }
}
