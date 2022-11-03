package com.movie.service;

import com.movie.dto.MovieListDto;
import com.movie.exception.ResourceNotFoundException;
import com.movie.model.Genre;
import com.movie.model.Movie;
import com.movie.model.MovieList;
import com.movie.repository.GenreRepository;
import com.movie.repository.MovieListRepository;
import com.movie.repository.MovieRepository;
import com.movie.request.MovieListRequest;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class MovieListService {

    private final MovieListRepository movieListRepository;
    private final MovieRepository movieRepository;
    private final GenreRepository genreRepository;

    public MovieListService(MovieListRepository movieListRepository, MovieRepository movieRepository, GenreRepository genreRepository) {
        this.movieListRepository = movieListRepository;
        this.movieRepository = movieRepository;
        this.genreRepository = genreRepository;
    }

    public List<MovieListDto> getAllMovieLists() {
        return this.movieListRepository.findAll()
                .stream()
                .map(MovieListDto::convert)
                .toList();
    }

    public MovieList getByID(Integer id){
        return this.movieListRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Movie is not found"));
    }


    public List<MovieListDto> getByTypeAndGenre(String type , String genre){
        List<MovieList> movieList;
        if(type!=null && !"".equals(type) && genre!=null && !"".equals(genre)){
            movieList = this.movieListRepository.findByTypes(type);
        }else if(type!=null && !"".equals(type)){
            return  movieListRepository.findByTypes(type).stream().filter(i->i.getMovies().size()>2)
                    .map(MovieListDto::convert).toList();
        }else{
            return  movieListRepository.findAll().stream().filter(i->i.getMovies().size()>2)
                    .map(MovieListDto::convert).toList();
        }
        Genre findGenre = this.genreRepository.findByGenre(genre);
        List<MovieList> movieLists = movieList.stream().map(l-> new MovieList(l.getId(), l.getTitle(),l.getTypes())).toList();
        int listCounter = 0;
        for (MovieList list : movieList) {
            for (Movie movie : list.getMovies()) {
                boolean control = false;
                for (Genre gen : movie.getGenres()) {
                    if (gen.getId().equals(findGenre.getId())) {
                        control = true;
                        break;
                    }
                }
                if (control)
                    movieLists.get(listCounter).getMovies().add(movie);
            }
            listCounter++;
        }
       // return movieLists.stream().map(MovieListDto::convert).toList();
        return movieLists.stream().filter(i-> (long) Objects.requireNonNull(i.getMovies()).size() > 2)
        .map(MovieListDto::convert).collect(Collectors.toList());


    }

    // Create MovieList To DB

    public MovieListDto createMovieList(MovieListRequest request){
        MovieList movieList = new MovieList(
                request.getTitle(),
                request.getTypes()
        );
        MovieList savedOne = this.movieListRepository.save(movieList);
        if(request.getMovies()!=null){
            savedOne.getMovies().addAll(request.getMovies().stream().map(movie -> {
                Movie mov = this.movieRepository.findById(movie)
                        .orElseThrow(()-> new ResourceNotFoundException("not found "));
                mov.getLists().add(savedOne);
                return mov;
            }).collect(Collectors.toSet()));
        }

        return MovieListDto.convert(this.movieListRepository.save(savedOne));

    }
    public MovieListDto addMovieToMovieList(Integer listId, Long movieId) {
        Movie movie = this.movieRepository.findById(movieId)
                .orElseThrow( ()-> new ResourceNotFoundException("Movie is not found"));
        MovieList movieList = this.movieListRepository.findById(listId)
                .orElseThrow( ()-> new ResourceNotFoundException("MovieList is not found"));
        if(!convertBooleanToString(movie.isMovie()).equals(movieList.getTypes())){
            throw new ResourceNotFoundException("You cant add this one to " +movieList.getTypes() +" List ");
        }
        movieList.getMovies().add(movie);
        movie.getLists().add(movieList);
        this.movieRepository.save(movie);
        this.movieListRepository.save(movieList);
        return MovieListDto.convert(movieList);
    }

    private String convertBooleanToString(Boolean control){
        String type = "series";
        if(control)
            type="movies";
        return type;
    }
    public MovieListDto removeMovieToMovieList(Integer listId, Long movieId) {
        Movie movie = this.movieRepository.findById(movieId)
                .orElseThrow( ()-> new ResourceNotFoundException("Movie is not found"));
        MovieList movieList = this.movieListRepository.findById(listId)
                .orElseThrow( ()-> new ResourceNotFoundException("MovieList is not found"));
        movieList.getMovies().remove(movie);
        movie.getLists().remove(movieList);
        this.movieRepository.save(movie);
        this.movieListRepository.save(movieList);
        return MovieListDto.convert(movieList);
    }


    public MovieListDto updateMovieList(Integer id, MovieListDto request) {
        MovieList movieList = this.movieListRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("movie-List is not found"));
        MovieList updateOne= new MovieList(movieList.getId(), request.getTitle(), request.getTypes(), movieList.getMovies());
        this.movieListRepository.save(updateOne);
        return MovieListDto.convert(updateOne);
    }
    public void deleteMovieList(Integer id){
        this.movieListRepository.deleteById(id);
    }

    public List<MovieListDto> getThreeList() {
        return this.movieListRepository.findThreeList()
                .stream().
                map(MovieListDto::convert)
                .toList();
    }




}
