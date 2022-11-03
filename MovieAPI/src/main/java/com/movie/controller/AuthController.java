package com.movie.controller;


import com.movie.dto.UserDto;
import com.movie.exception.AuthException;
import com.movie.request.JwtAuthRequest;
import com.movie.request.UserRegisterRequest;
import com.movie.response.AuthResponse;
import com.movie.security.JwtTokenHelper;
import com.movie.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/v1/auth/")
public class AuthController {

    private final JwtTokenHelper jwtTokenHelper;
    private final UserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public AuthController(JwtTokenHelper jwtTokenHelper,
                          UserDetailsService userDetailsService,
                          AuthenticationManager authenticationManager,
                          UserService userService) {
        this.jwtTokenHelper = jwtTokenHelper;
        this.userDetailsService = userDetailsService;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> createToken(@Valid @RequestBody JwtAuthRequest jwtAuthRequest) throws Exception {
        this.authenticate(jwtAuthRequest.getUsername(), jwtAuthRequest.getPassword());
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtAuthRequest.getUsername());
        String token = jwtTokenHelper.generateToken(userDetails);
        UserDto user = userService.getUserByEmail(jwtAuthRequest.getUsername());

        AuthResponse response = new AuthResponse(
                user.getId(),
                user.getEmail(),
                user.getName(),
                token,userDetails
                .getAuthorities().stream()
                .anyMatch(i->i.getAuthority().equals("ROLE_ADMIN"))
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void authenticate(String username, String password) throws Exception {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,password);
        try{
            authenticationManager.authenticate(authenticationToken);
        }catch(BadCredentialsException e){
            System.out.println("Invalid detail");
            throw new AuthException("Invalid username or Password");
        }catch (Exception e){
            throw new AuthException("Invalid username or Password");
        }

    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@Valid @RequestBody UserRegisterRequest request){
       userService.registerNewUser(request);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/current")
    public UserDetails getUser(Principal principal){
        return  this.userDetailsService.loadUserByUsername(principal.getName());
    }
}
