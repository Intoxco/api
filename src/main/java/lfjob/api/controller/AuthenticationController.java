package lfjob.api.controller;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lfjob.api.auth.LoginData;
import lfjob.api.others.gsonData.BodyData;
import lfjob.api.service.TokenService;
import lfjob.api.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

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
        var usernamePassword  = new UsernamePasswordAuthenticationToken(loginData.username(), loginData.password());
        var auth = authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((User)auth.getPrincipal());
        BodyData bodyData = new BodyData();
        bodyData.setToken(token);
        bodyData.setExpiresIn(10800);
        ResponseEntity <String> response = new ResponseEntity<>(gson.toJson(bodyData), HttpStatus.OK);
        System.out.println("Response sent:"+ response);
        return response;
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        System.out.println("Token:"+TokenService.recoverToken(request));
        if(TokenService.removeFromWhiteList(TokenService.recoverToken(request))){
            return ResponseEntity.ok("success");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
