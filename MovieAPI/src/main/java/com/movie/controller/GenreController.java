package com.movie.controller;

import com.movie.dto.GenreDto;
import com.movie.request.GenreRequest;
import com.movie.service.GenreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/genre")
public class GenreController {
    private final GenreService genreService;

    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    // Get All Genre
    @GetMapping
    public ResponseEntity<List<GenreDto>> getAllGenre(){
        return new ResponseEntity<>(this.genreService.getAlGenre(), HttpStatus.OK);
    }
    // Get Genre By Id
    @GetMapping("/{id}")
    public ResponseEntity<GenreDto> getGenreById(@PathVariable Integer id){
        return new ResponseEntity<>(this.genreService.getGenreById(id),HttpStatus.OK );
    }
    // Create Genre
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<GenreRequest> createGenre(@Valid @RequestBody GenreRequest request){
        return  new ResponseEntity<>(this.genreService.createGenre(request),HttpStatus.CREATED );
    }
    // Update Genre By ID
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<GenreDto> updateGenre(@PathVariable Integer id,@Valid @RequestBody GenreRequest request){
        return new ResponseEntity<>(this.genreService.updateGenre(id,request),HttpStatus.OK);
    }
    //Delete Genre By Id
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGenreById(@PathVariable  Integer id){
       this.genreService.deleteGenre(id);
       return ResponseEntity.ok().build();
    }

}
