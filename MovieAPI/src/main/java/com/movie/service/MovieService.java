package com.movie.service;

import com.movie.dto.MovieDto;
import com.movie.exception.ResourceNotFoundException;
import com.movie.model.Genre;
import com.movie.model.Movie;
import com.movie.model.MovieYear;
import com.movie.repository.GenreRepository;
import com.movie.repository.MovieRepository;
import com.movie.repository.MovieYearRepository;
import com.movie.request.MovieRequest;
import com.movie.request.MovieUpdateRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MovieService {

    private final ImageService imageService;
    private final MovieRepository movieRepository;
    private final GenreRepository genreRepository;
    private final MovieYearRepository movieYearRepository;

    public MovieService(ImageService imageService,
                        MovieRepository movieRepository,
                        GenreRepository genreRepository,
                        MovieYearRepository movieYearRepository)
    {
        this.imageService = imageService;
        this.movieRepository = movieRepository;
        this.genreRepository = genreRepository;
        this.movieYearRepository = movieYearRepository;
    }


    // Get All Movies
    public List<MovieDto> getAllMovies() {
        //List<Movie> movieList = this.movieRepository.findRandomMovie();

        return movieRepository.findAll().stream().map(MovieDto::convert).collect(Collectors.toList());
    }

    public List<MovieDto> getMoviesByTypes(String type){
        boolean control;
        if(type.equals("movies"))
            control=true;
        else if (type.equals("series")) {
            control=false;
        }
        else {
            return this.movieRepository.findAll()
                    .stream().map(MovieDto::convert).toList();
        }
        return this.movieRepository.findMovieByIsMovie(control)
                .stream().map(MovieDto::convert).toList();
    }

    //Get Movie By Genre ID
    public List<MovieDto> getAllMoviesByGenreId(Integer id){
        this.genreRepository.findById(id)
                .orElseThrow( ()-> new ResourceNotFoundException("Genre is  not found"));
        return this.movieRepository.findMovieByGenresId(id)
                .stream().map(MovieDto::convert).collect(Collectors.toList());
    }

    //Get Movies By Genre
    public List<MovieDto> getAllMoviesByGenre(String genre) {
        return this.movieRepository.findMovieByGenresGenre(genre)
                .stream()
                .map(MovieDto::convert)
                .toList();
    }
    // Get Movie By ID
    public MovieDto getMovieById(Long id){
        return MovieDto.convert(this.findMovieByID(id));
    }

    public MovieDto getRandomOneMovie(String type) {
        int control=0;
        if(type.equals("movies"))
            control=1;
        return MovieDto.convert(this.movieRepository.findRandomOneMovie(control));
    }
    // Create Movie
    public MovieDto createMovie(MovieRequest request){
        Movie movie = new Movie(
                request.getTitle(),
                request.getDescription(),
                request.getMovieImage(),
                request.getTrailer(),
                request.getMovieUrl(),
                findMovieYearByYear(request.getYear()),
                request.isMovie()
        );
        this.addMovieToGenre(movie, Objects.requireNonNull(request.getGenres()));
        Movie savedOne = this.movieRepository.save(movie);
        return MovieDto.convert(savedOne);
    }
    //Update  Movie

    public MovieDto updateMovie(Long id, MovieUpdateRequest request){
        Movie movie = this.findMovieByID(id);
        Movie updateMovie = new Movie(
                movie.getId(),
                request.getTitle(),
                request.getDescription(),
                request.getMovieImage(),
                request.getTrailer(),
                request.getMovieUrl(),
                findMovieYearByYear(request.getYear()),
                request.isMovie()
        );

        Objects.requireNonNull(updateMovie.getGenres()).removeAll(Objects.requireNonNull(movie.getGenres()).stream().map(a->{
            Genre genre = this.genreRepository.findByGenre(a.getGenre());
            Objects.requireNonNull(genre.getMovies()).remove(movie);
            return genre;
        }).collect(Collectors.toSet()));
        this.addMovieToGenre(updateMovie,request.getGenres());

        Movie savedOne = this.movieRepository.save(updateMovie);
        return  MovieDto.convert(savedOne);
    }

    private Movie addMovieToGenre(Movie movie, Set<Genre> genres){
        movie.getGenres().addAll(genres.stream().map(a->{
            Genre genre = this.genreRepository.findByGenre(a.getGenre());

            if(genre==null)
                throw new ResourceNotFoundException("Genre could not found => " +genres
                        .stream().map(Genre::getGenre).toList() );
            genre.getMovies().add(movie);
            return  genre;
        }).collect(Collectors.toSet()));
        return movie;
    }

    // DeleteMovie By ID
    public void deleteMovieById(Long id) {
        Movie movie = this.findMovieByID(id);
        if(movie.getMovieImage()!=null )
            imageService.deleteFile(movie.getMovieImage());
        this.movieRepository.delete(movie);
    }

    //Search Movies
    public List<MovieDto> searchMovieByKeyword(String keyword) {
        return this.movieRepository.searchMovieByKeyword(keyword).stream()
                .map(MovieDto::convert).collect(Collectors.toList());
    }

    // Find Movie By ID
    protected Movie findMovieByID(Long id){
        return this.movieRepository.findById(id)
                .orElseThrow( ()-> new ResourceNotFoundException("Movie is  not found"));
    }

    protected MovieYear findMovieYearByYear(Integer year){
        return this.movieYearRepository.findByYear(year)
                .orElseThrow(()-> new ResourceNotFoundException("Year is not found"));
    }
    public List<MovieDto> getLastFiveMovie() {
        return this.movieRepository.findLastFiveMovie()
                .stream().map(MovieDto::convert).toList();
    }

    public MovieDto addImageToMovie(Long movieId  , MultipartFile file){
        Movie movie = this.findMovieByID(movieId);
        String fileName=  imageService.uploadFile(file);
        Movie imgMovie= new Movie(
                movie.getId(),
                movie.getTitle(),
                movie.getDescription(),
                fileName,
                movie.getTrailer(),
                movie.getMovieUrl(),
                movie.getYear(),
                movie.isMovie()
        );

        this.movieRepository.save(imgMovie);
        return MovieDto.convert(imgMovie);

    }

    public String imgUpload(MultipartFile file){
        return imageService.uploadFile(file);
    }



}

