package lfjob.api.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import lfjob.api.others.gsonData.TokenData;
import lfjob.api.user.User;
import lfjob.api.user.UserRoles;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.*;

@Service
public class TokenService {
    @Value("${api.security.token.secret}")
    private String secret;
    private static final Map<String, TokenData> whiteList = new HashMap<>();

    public static TokenData getTokenData(String token){
        DecodedJWT decoded = JWT.decode(token);
        String id = decoded.getSubject();
        String username = decoded.getClaim("username").asString();
        String role = decoded.getClaim("role").asString();
        Long expiration =  decoded.getClaim("expiration").asLong();
        return new TokenData(id,username,UserRoles.valueOf(role.toUpperCase()),expiration);
    }
    public static String recoverToken(HttpServletRequest request) { 
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null) {
            return null;
        }
        return authHeader.replace("Bearer ", "");
    }
    public static boolean checkWhiteList(String token){
        return whiteList.containsKey(token);
    }
    public static boolean removeFromWhiteList(String token){
        return whiteList.remove(token) != null;
    }
    public static boolean checkExpiration(String token){
        if(checkWhiteList(token)){
            DecodedJWT jwt = JWT.decode(token);
            if(jwt.getExpiresAt().before(new Date())){
                whiteList.remove(token);
                return false;
            }
            return true;
        }
        return false;


    }
    public String generateToken(User user) {
        Gson gson = new Gson();
        Algorithm algorithm = Algorithm.HMAC256(secret);
        Instant expiration = generateExpirationDate();
        String token = JWT.create()
                .withSubject(user.getUserId().toString())
                .withExpiresAt(expiration)
                .withClaim("role",user.getAuthorities().stream().toList().getFirst().getAuthority())
                .withClaim("username",user.getUsername())
                .sign(algorithm);

        whiteList.put(token,TokenService.getTokenData(token));
        return token;
    }
    private Instant generateExpirationDate(){
        return LocalDateTime.now().plusHours(3).toInstant(ZoneOffset.of("-03:00"));
    }
    public String validateToken(String token) throws JWTVerificationException {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        return JWT.require(algorithm)
                .build()
                .verify(token)
                .getSubject();
    }
}
