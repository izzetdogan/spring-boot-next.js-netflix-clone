package com.movie.service;

import com.movie.dto.MovieYearDto;
import com.movie.exception.ResourceNotFoundException;
import com.movie.model.MovieYear;
import com.movie.repository.MovieYearRepository;
import com.movie.request.MovieYearRequest;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class MovieYearService {

    private final MovieYearRepository movieYearRepository;

    public MovieYearService(MovieYearRepository movieYearRepository) {
        this.movieYearRepository = movieYearRepository;
    }

    //Get All YEar
    public List<MovieYearDto> getAllYear(){
        return this.movieYearRepository.findAll().stream().
                map(MovieYearDto::convert).toList();
    }

    // Get Year By ID
    public MovieYearDto getYearById(Integer id){
        MovieYear movieYear = this.movieYearRepository.findById(id)
                .orElseThrow( ()-> new ResourceNotFoundException("Movie cannot be found"));
        return MovieYearDto.convert(movieYear);
    }

    //Create Movie Year
    public MovieYearRequest createMovieYear(MovieYearRequest request){
        MovieYear movieYear = new MovieYear(request.getYear());
        this.movieYearRepository.save(movieYear);
        return MovieYearRequest.convert(movieYear);
    }

    //Update Movie Year By ID
    public MovieYearRequest updateMovieYear(Integer id, MovieYearRequest request){
        MovieYear movieYear = this.movieYearRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Year  not found"));
        MovieYear updatedOne = new MovieYear(movieYear.getId(), request.getYear());
        this.movieYearRepository.save(updatedOne);
        return MovieYearRequest.convert(updatedOne);
    }

    //Delete MovieYear By ID
    public void deleteMovieYear(Integer id){
        MovieYear movieYear = this.movieYearRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Year  not found"));
        this.movieYearRepository.delete(movieYear);
    }

}
