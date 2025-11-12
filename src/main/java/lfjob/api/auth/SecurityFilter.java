package lfjob.api.auth;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.google.gson.Gson;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lfjob.api.others.gsonData.BodyData;
import lfjob.api.service.TokenService;
import lfjob.api.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
public class SecurityFilter extends OncePerRequestFilter {
    @Autowired
    TokenService tokenService;
    @Autowired
    UserRepository userRepository;

    @Override   
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = TokenService.recoverToken(request);
        try {
            if (token != null) {
                var username = tokenService.validateToken(token);
                UserDetails user;
                try {
                    user = userRepository.findByUserId((Long.parseLong(username)));
                } catch (NumberFormatException e) {
                    user = userRepository.findByUsername(username);
                }
                if (user != null) {
                    var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }

            filterChain.doFilter(request, response);
        } catch (JWTVerificationException e) {
            handleAuthError(response, "Invalid Credentials", HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            handleAuthError(response, "Authentication failed - Internal error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    private void handleAuthError(HttpServletResponse response, String message, HttpStatus status)
            throws IOException {
        response.setStatus(status.value());
        response.setContentType("application/json");
        BodyData body = new BodyData();
        body.setMessage(message);
        response.getWriter().write(new Gson().toJson(body));
    }
}
