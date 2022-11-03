package com.movie.exception;

public class AuthException extends  RuntimeException {

    public AuthException(String message) {
        super(message);
    }

    public AuthException() {
        super();
    }

}
