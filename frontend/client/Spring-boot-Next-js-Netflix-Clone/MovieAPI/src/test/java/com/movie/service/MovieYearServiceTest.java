package com.movie.service;


import com.movie.dto.MovieYearDto;
import com.movie.exception.ResourceNotFoundException;
import com.movie.model.MovieYear;
import com.movie.repository.MovieYearRepository;

import com.movie.request.MovieYearRequest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.test.web.servlet.MockMvc;


import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.*;

class MovieYearServiceTest {
    private MovieYearRepository movieYearRepository;
    private MovieYearService testYearService;



    @BeforeEach
    void  setUp(){
        movieYearRepository = mock(MovieYearRepository.class);
        testYearService = new MovieYearService(movieYearRepository);
    }

    @Test
    void getAllYear() {
        //when
        testYearService.getAllYear();
        //then
        verify(movieYearRepository).findAll();
    }
    @Test
    void getYearByID(){
        MovieYear movieYear = new MovieYear(1,1998);
        MovieYearDto dto = new MovieYearDto(movieYear.getId(), movieYear.getYear());

        when(movieYearRepository.findById(1)).thenReturn(Optional.of(movieYear));
        MovieYearDto actual = testYearService.getYearById(1);

        verify(movieYearRepository).findById(1);
        verify(movieYearRepository,times(1)).findById(Mockito.anyInt());

        assertThat(dto).isEqualTo(actual);

    }

    @Test
    void createMovieYear() {
        MovieYearRequest request = new MovieYearRequest(1998);
        MovieYear movieYear = new MovieYear(request.getYear());


        when(movieYearRepository.save(movieYear)).thenReturn(movieYear);


        MovieYearRequest actual = testYearService.createMovieYear(request);
        assertThat(actual).isEqualTo(request);

        verify(movieYearRepository).save(movieYear);
    }

    @Test
    void itShouldThrowError_WhenIdNotFound(){
        ResourceNotFoundException err=   new ResourceNotFoundException("Movie cannot be found");

        when(movieYearRepository.findById(Mockito.anyInt())).thenReturn(Optional.empty());

        ResourceNotFoundException result = Assertions.assertThrows(
                ResourceNotFoundException.class, ()-> testYearService.getYearById(Mockito.anyInt()));

        verify(movieYearRepository).findById(Mockito.anyInt());

        Assertions.assertEquals(result.getMessage(),err.getMessage());
    }



}