package com.movie.controller;

import com.movie.dto.MovieYearDto;
import com.movie.request.MovieYearRequest;
import com.movie.service.MovieYearService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/movie/years")
public class MovieYearController {
    private final MovieYearService movieYearService;

    public MovieYearController(MovieYearService movieYearService) {
        this.movieYearService = movieYearService;
    }

    //Get All YEar
    @GetMapping
    public ResponseEntity<List<MovieYearDto>> getAllYear(){
        return ResponseEntity.ok(this.movieYearService.getAllYear());
    }

    //GetYearBy ıd
    @GetMapping("{id}")
    public ResponseEntity<MovieYearDto> getYearById(@PathVariable Integer id){
        return new ResponseEntity<>(this.movieYearService.getYearById(id),HttpStatus.OK);
    }

    //Create Movie Year
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<MovieYearRequest> createMovieYear(@Valid  @RequestBody MovieYearRequest request){
        return new ResponseEntity<>(this.movieYearService.createMovieYear(request),HttpStatus.CREATED);
    }

    //Update MovieYear ByID
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<MovieYearRequest> updateMovieYear(@PathVariable Integer id, @Valid @RequestBody MovieYearRequest request){
        return new ResponseEntity<>(this.movieYearService.updateMovieYear(id,request),HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovieYear(@PathVariable Integer id){
        this.movieYearService.deleteMovieYear(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
