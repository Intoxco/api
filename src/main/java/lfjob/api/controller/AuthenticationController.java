package lfjob.api.controller;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lfjob.api.auth.LoginData;
import lfjob.api.others.gsonData.BodyData;
import lfjob.api.others.gsonData.TokenData;
import lfjob.api.service.TokenService;
import lfjob.api.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping
public class AuthenticationController {
    private Gson gson = new Gson();
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid LoginData loginData) {
        BodyData bodyData = new BodyData();
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(loginData.username(), loginData.password());
            var auth = authenticationManager.authenticate(usernamePassword);
            var token = tokenService.generateToken((User) auth.getPrincipal());
            bodyData.setToken(token);
            bodyData.setExpiresIn(10800);
            ResponseEntity<String> response = new ResponseEntity<>(gson.toJson(bodyData), HttpStatus.OK);
            System.out.println("Response sent:" + response);
            return response;
        }catch(Exception e){
            System.out.println(e.getMessage());
            bodyData.setMessage("Invalid credentials");
            ResponseEntity<String> response = new ResponseEntity<>(gson.toJson(bodyData),HttpStatus.UNAUTHORIZED);
            System.out.println("Response sent:" + response);
            return response;
        }
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        System.out.println("Token:"+TokenService.recoverToken(request));
        if(TokenService.removeFromWhiteList(TokenService.recoverToken(request))){
            ResponseEntity <String> response = new ResponseEntity<>("success",HttpStatus.OK);
            System.out.println("Response sent:"+ response);
            return response;
        }
        ResponseEntity <String> response = new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        System.out.println("Response sent:"+ response);
        return response;
    }
    static boolean checkToken(@PathVariable Long usercompanyId, HttpServletRequest req, BodyData bodyData) throws AccessDeniedException {
        String token = TokenService.recoverToken(req);
        if(token == null || token.isEmpty() || !TokenService.checkExpiration(token)){
            bodyData.setMessage("Invalid Token");
            return true;
        }
        TokenData tokenData = TokenService.getTokenData(token);
        if(Long.parseLong(tokenData.getSub())!=usercompanyId){
            throw new AccessDeniedException("Forbidden");
        }
        return false;
    }
}
