package com.movie.controller;

import com.movie.dto.UserDto;
import com.movie.request.UserCreateRequest;
import com.movie.request.UserUpdateRequest;
import com.movie.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private  final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Get All User For Admin
    @Operation(summary = "Get All User For Admin ")
    @GetMapping
    public ResponseEntity<List<UserDto>> getALlUser(@RequestParam(required = false , value= "newUsers") Boolean newUsers){
        return ResponseEntity.ok(this.userService.getAllUsers(newUsers));
    }

    // Get User By Id
    @Operation(summary = "Get One User By ID ")
    @GetMapping("/{id}")
    public  ResponseEntity<UserDto> getUserById(@Parameter(description = "id of User to be searched")@PathVariable  Long id){
        return  ResponseEntity.ok(this.userService.getUserById(id));
    }

    @Operation(summary = " Create User ")
    @PostMapping
    public ResponseEntity<UserDto> createUser(@Valid  @RequestBody UserCreateRequest request){
        return new ResponseEntity<>(this.userService.createUser(request),HttpStatus.CREATED);
    }

    @Operation(summary = "Update User  By User  ID ")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateUser(@Parameter(description = "id of user to be update")@PathVariable Long id,
                                              @Valid @RequestBody UserUpdateRequest request){
        this.userService.updateUser(id,request);
        return  ResponseEntity.ok().build();
    }
    @Operation(summary = "Delete User By User ID ")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public  ResponseEntity<Void> deleteUSer(@PathVariable Long id){
        this.userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    // Add Movie To User Movie List
    @Operation(summary = "Add Movie To User-Movie-List --> by userID, movieID ")
    @PreAuthorize("hasRole('ADMIN') or hasRole('NORMAL')")
    @PatchMapping("/{id}/movie-list/{movieId}")
    public ResponseEntity<UserDto> addMovieToUserList(@PathVariable Long id, @PathVariable Long movieId){
        return  ResponseEntity.ok(this.userService.addMovieToUserMovieList(id,movieId));
    }
    @Operation(summary = "Remove Movie From  User-Movie-List --> by userID, movieID ")
    @PreAuthorize("hasRole('ADMIN') or hasRole('NORMAL')")
    @PatchMapping("/{id}/movie-list-remove/{movieId}")
    public ResponseEntity<UserDto> removeMovieFromUserMovieList(@PathVariable Long id, @PathVariable Long movieId){
        return ResponseEntity.ok(this.userService.removeMovieFromUserMovieList(id,movieId));
    }





}
