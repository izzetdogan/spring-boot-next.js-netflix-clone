package com.movie.controller;

import com.movie.dto.MovieListDto;
import com.movie.model.MovieList;
import com.movie.request.MovieListRequest;
import com.movie.service.MovieListService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/lists")
public class MovieListController {
    private final MovieListService movieListService;

    public MovieListController(MovieListService movieListService) {
        this.movieListService = movieListService;
    }

    @GetMapping
    public ResponseEntity<List<MovieListDto>> getAllMovieLists(){
        return ResponseEntity.ok(this.movieListService.getAllMovieLists());
    }
    @GetMapping("/get-three")
    public ResponseEntity<List<MovieListDto>> getThreeList(){
        return ResponseEntity.ok(this.movieListService.getThreeList());
    }

    @GetMapping("/genre/")
    public ResponseEntity<List<MovieListDto>> getByTypeAndGenre(@RequestParam(required = false , value= "type") String type,
                                                                @RequestParam(required = false, value="genre") String genre){
        return  ResponseEntity.ok(this.movieListService.getByTypeAndGenre(type, genre));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<MovieListDto> updateMovieList(@PathVariable Integer id, @RequestBody MovieListDto request){
        return ResponseEntity.ok(this.movieListService.updateMovieList(id, request));
    }


    //Add MovieList to Db
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<MovieListDto> addMovieList( @Valid @RequestBody MovieListRequest request){
        return  new ResponseEntity<>(this.movieListService.createMovieList(request), HttpStatus.CREATED );
    }

    // Add Movie To MovieList
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/add-list/{listId}/movie/{movieId}")
    public ResponseEntity<MovieListDto> addMovieToMovieList(@PathVariable Integer listId, @PathVariable Long movieId){
        return ResponseEntity.ok(this.movieListService.addMovieToMovieList(listId,movieId));
    }

    // Remove Movie To MovieList
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/remove-list/{listId}/movie/{movieId}")
    public ResponseEntity<MovieListDto> removeMovieToMovieList(@PathVariable Integer listId, @PathVariable Long movieId){
        return ResponseEntity.ok(this.movieListService.removeMovieToMovieList(listId,movieId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieList> getById(@PathVariable Integer id){
        return ResponseEntity.ok(this.movieListService.getByID(id));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMovieList(@PathVariable  Integer id){
        this.movieListService.deleteMovieList(id);
        return ResponseEntity.ok().build();
    }
}
