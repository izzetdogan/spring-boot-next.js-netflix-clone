package com.movie.service;

import com.movie.dto.GenreDto;
import com.movie.exception.ResourceNotFoundException;
import com.movie.model.Genre;
import com.movie.repository.GenreRepository;
import com.movie.request.GenreRequest;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class GenreService {
    private final GenreRepository genreRepository;

    public GenreService(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    // Get All Genre
    public List<GenreDto> getAlGenre() {
        return genreRepository.findAll().stream()
                .map(GenreDto::convert).collect(Collectors.toList());
    }

    public GenreDto getGenreById(Integer id) {
        return GenreDto
                .convert(this.findGenreByID(id));
    }

    public GenreRequest createGenre(GenreRequest request) {
        if (this.genreRepository.existsByGenre(request.getGenre()))
            throw new ResourceNotFoundException("Duplicate Genre");
        Genre genre = new Genre(request.getId(), Objects.requireNonNull(request.getGenre()));
        Genre savedOne = this.genreRepository.save(genre);
        return GenreRequest.convert(savedOne);
    }

    public GenreDto updateGenre(Integer id, GenreRequest request) {
        Genre genre = this.findGenreByID(id);
        Genre updatedOne = new Genre(genre.getId(), Objects.requireNonNull(request.getGenre()), genre.getMovies());
        this.genreRepository.save(updatedOne);
        return GenreDto.convert(updatedOne);
    }

    public void deleteGenre(Integer id) {
        Genre genre = this.findGenreByID(id);
        this.genreRepository.delete(genre);
    }


    protected Genre findGenreByID(Integer id) {
        return this.genreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Genre is not found"));
    }

}

    /*
    public List<GenreDto> getAllGenre(){
        List<Genre> genres = this.genreRepository.findAll();
        List<Genre> genreList = new ArrayList<>();
        List<Movie>  movieList= new ArrayList<>();
        for (int i=0; i<2;i++){
            genreList.add(genres.get(i));
            for(Movie movie: genres.get(i).getMovies()){
                movieList.add(movie);
            }
            Collections.shuffle(movieList);
            movieList = movieList.subList(0,2);
            genreList.get(i).setMovies(Set.copyOf(movieList));
            movieList.removeAll(movieList);
        }
        return genreList.stream().map((genre )-> this.toGenreDto(genre)).collect(Collectors.toList());
    }
    */

