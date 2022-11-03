package com.movie.controller;

import com.movie.dto.MovieDto;
import com.movie.request.MovieRequest;
import com.movie.request.MovieUpdateRequest;
import com.movie.service.MovieService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/v1/movies")
public class MovieController {
    private final MovieService movieService;



    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }


    //Get All Movies
    @Operation(summary = "Get All Movies")
    @GetMapping
    public ResponseEntity<List<MovieDto>> getAllMovies(){
        return ResponseEntity.ok(this.movieService.getAllMovies());
    }
    //Get Last 5 Movie
    @GetMapping("/last")
    public ResponseEntity<List<MovieDto>> getLastFiveMovie(){
        return ResponseEntity.ok(this.movieService.getLastFiveMovie());
    }

    //Get All Movies By Type
    @Operation(summary = "Get All Movies By type")
    @GetMapping("/type")
    public ResponseEntity<List<MovieDto>> getMovieByTypes(@RequestParam(required = false , value= "type") String type){
        return  ResponseEntity.ok(this.movieService.getMoviesByTypes(type));
    }
    //Get Movie By ID
    @Operation(summary = "Get One Movie By ID")
    @GetMapping("/{id}")
    public  ResponseEntity<MovieDto> getMovieById(@PathVariable Long id){
        return ResponseEntity.ok(this.movieService.getMovieById(id));
    }
    //Get Random Movie
    @Operation(summary = "Get ;Random One Movie")
    @GetMapping("/random")
    public ResponseEntity<MovieDto> getRandomOneMovie(@RequestParam(required = false , value= "type") String type){
        return  ResponseEntity.ok(this.movieService.getRandomOneMovie(type));
    }

    // Get Movie By Genre ID
    @Operation(summary = "Get All Movie By Genre ID ")
    @GetMapping("/{id}/genre")
    public  ResponseEntity<List<MovieDto>> getAllMovieByGenreId(@PathVariable Integer id){
        return ResponseEntity.ok(this.movieService.getAllMoviesByGenreId(id));
    }

    // Get Movie By Genre Name
    @Operation(summary = "Get All Movie By Genre ID ")
    @GetMapping("/{genre}/genres")
    public  ResponseEntity<List<MovieDto>> getAllMovieByGenre(@PathVariable String genre){
        return ResponseEntity.ok(this.movieService.getAllMoviesByGenre(genre));
    }


    // Create Movie

    @Operation(summary = "Create Movie ")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<MovieDto> createMovie(@Valid @RequestBody MovieRequest request){
        return new ResponseEntity<>(this.movieService.createMovie(request), HttpStatus.CREATED);
    }

    @Operation(summary = "Update Movie By Movie  ID ")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<MovieDto> updateMovie(@PathVariable  Long id,@Valid @RequestBody MovieUpdateRequest request){
        return new ResponseEntity<>(this.movieService.updateMovie(id,request),HttpStatus.OK);
    }

    //Delete Movie By Id
    @Operation(summary = "DELETE Movie By Movie  ID ")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMoviesByID(@PathVariable Long id){
        this.movieService.deleteMovieById(id);
        return  ResponseEntity.ok().build();
    }

    //Search Movie
    @Operation(summary = "Search Movie By String Keyword")
    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<MovieDto>> searchMovieByKeyword(@PathVariable  String keyword){
        return ResponseEntity.ok(this.movieService.searchMovieByKeyword(keyword));
    }



    @PostMapping("/file/upload/{movieId}")
    public ResponseEntity<MovieDto> uploadPostImage(@PathVariable Long movieId,
                                                    @RequestParam("file") MultipartFile file) {
        return new ResponseEntity<>(this.movieService.addImageToMovie(movieId,file),HttpStatus.OK);
    }

    @PostMapping("/file/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(this.movieService.imgUpload(file));
    }


}



