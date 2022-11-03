package com.movie.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String mes) {
        super(mes);
    }
}
