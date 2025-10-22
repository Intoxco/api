package lfjob.api.others.exceptionHandler;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import jakarta.servlet.http.HttpServletRequest;
import lfjob.api.others.gsonData.BodyData;
import lfjob.api.others.gsonData.FieldError;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

    @RestControllerAdvice()
public class GlobalExceptionHandler {
    private static final Gson gson = new Gson();
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationError(MethodArgumentNotValidException ex,HttpServletRequest  req) {
        BodyData bodyData = new BodyData();
        bodyData.setCode(HttpStatus.UNPROCESSABLE_ENTITY.name());
        bodyData.setMessage("Validation Error");
        bodyData.setDetails(ex.getFieldErrors().stream()
                .map(e -> new FieldError(e.getField(), e.getDefaultMessage()))
                .collect(Collectors.toList()));
        HttpHeaders header = new HttpHeaders();
        header.set("Status", String.valueOf(HttpStatus.UNPROCESSABLE_ENTITY.value()));
        ResponseEntity<String> response = new ResponseEntity<>((gson.toJson(bodyData)),header, HttpStatus.UNPROCESSABLE_ENTITY);
        System.out.println("Response sent:"+ response);
        return response;
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handleCredentialsError(Exception ex, HttpServletRequest req) {
        Gson gson = new Gson();
        BodyData bodyData = new BodyData();
        bodyData.setMessage("Invalid Credentials");
        HttpHeaders header = new HttpHeaders();
        header.set("Status",String.valueOf(HttpStatus.UNAUTHORIZED.value()));
        ResponseEntity<String> response = new ResponseEntity<>((gson.toJson(bodyData)),header, HttpStatus.UNAUTHORIZED);
        System.out.println("Response sent:"+ response);
        return response;
    }
    @ExceptionHandler({JsonSyntaxException.class, AccessDeniedException.class})
    public ResponseEntity<String> handleForbiddenException(Exception ex, HttpServletRequest req) {
        Gson gson = new Gson();
        BodyData bodyData = new BodyData();
        bodyData.setMessage("Invalid token");
        HttpHeaders header = new HttpHeaders();
        header.set("Status",String.valueOf(HttpStatus.FORBIDDEN.value()));
        ResponseEntity<String> response = new ResponseEntity<>((gson.toJson(bodyData)),header, HttpStatus.FORBIDDEN);
        System.out.println("Response sent:"+ response);
        return response;
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericError(Exception ex, HttpServletRequest req) {
        BodyData bodyData = new BodyData();
        bodyData.setMessage(ex.getMessage());
        HttpHeaders header = new HttpHeaders();
        header.set("Status",String.valueOf(HttpStatus.BAD_REQUEST.value()));
        ResponseEntity<String> response = new ResponseEntity<>((gson.toJson(bodyData)),header, HttpStatus.BAD_REQUEST);
        System.out.println("Response sent:"+ response);
        return response;
    }
}

