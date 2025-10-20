package lfjob.api.controller;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import lfjob.api.others.gsonData.TokenData;
import lfjob.api.service.TokenService;
import lfjob.api.common_user.CommonUser;
import lfjob.api.common_user.CommonUserCreateData;
import lfjob.api.common_user.CommonUserRepository;
import lfjob.api.common_user.CommonUserUpdateData;
import lfjob.api.others.gsonData.BodyData;
import lfjob.api.user.UserRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.sql.SQLException;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/users")
public class CommonUserController {
    private Gson gson = new Gson();
    @Autowired
    private CommonUserRepository commonUserRepository;
    @Autowired
    private UserRepository  userRepository;
    @ResponseBody
    @PostMapping
    public ResponseEntity<String> create(@Valid @RequestBody CommonUserCreateData commonUserData){
        BodyData bodyData = new BodyData();
        try {
            String password = new BCryptPasswordEncoder().encode(commonUserData.password());
            CommonUser user = new CommonUser(commonUserData);
            user.setPassword(password);
            userRepository.save(user);
            bodyData.setMessage("Created");
            ResponseEntity<String> response = new  ResponseEntity<>(gson.toJson(bodyData),HttpStatus.CREATED);
            System.out.println("Response sent:" +response);
            return response;
        }catch(JpaSystemException e){
            bodyData.setMessage("Username already exists");
            ResponseEntity<String> response = new ResponseEntity<>(gson.toJson(bodyData),HttpStatus.CONFLICT);
            System.out.println("Response sent:" +response);
            return response;
        }catch(ConstraintViolationException e){
            bodyData.setMessage("Constraint error");
            ResponseEntity<String> response = new ResponseEntity<>(gson.toJson(bodyData),HttpStatus.UNPROCESSABLE_ENTITY);
            System.out.println("Response sent:" +response);
            return response;
        }


    }
    @GetMapping("/{userId}")
    public ResponseEntity<String> read(@PathVariable Long userId,HttpServletRequest req){
        BodyData bodyData = new BodyData();
        try {
            if (checkToken(userId, req, bodyData))
                return new ResponseEntity<>(gson.toJson(bodyData), HttpStatus.UNAUTHORIZED);
            CommonUser commonUser = commonUserRepository.findById(userId).get();
            bodyData.setUsername(commonUser.getUsername());
            bodyData.setName(commonUser.getName());
            bodyData.setEmail(commonUser.getEmail());
            bodyData.setExperience(commonUser.getExperience());
            bodyData.setPhone(commonUser.getPhone());
            bodyData.setEducation(commonUser.getEducation());
            return new ResponseEntity<>(gson.toJson(bodyData),HttpStatus.OK);
        }catch(NoSuchElementException e) {
            bodyData.setMessage("User not found");
            ResponseEntity<String> response = new ResponseEntity<>(gson.toJson(bodyData), HttpStatus.NOT_FOUND);
            System.out.println("Response sent:" + response);
            return response;
        }catch (AccessDeniedException e) {
            bodyData.setMessage("Forbidden");
            return new ResponseEntity<>(gson.toJson(bodyData), HttpStatus.FORBIDDEN);
        }
    }
    @PatchMapping("/{userId}")
    @Transactional
    public ResponseEntity<String> update(@Valid @RequestBody CommonUserUpdateData commonUserData,@PathVariable Long userId,HttpServletRequest req){
        BodyData bodyData = new BodyData();
        try{
            if (checkToken(userId, req, bodyData))
                return new ResponseEntity<String>(gson.toJson(bodyData), HttpStatus.UNAUTHORIZED);
            String encryptedPassword = new BCryptPasswordEncoder().encode(commonUserData.password());
            CommonUser commonUser = commonUserRepository.getReferenceById(userId);
            commonUser.updateData(commonUserData);
            commonUser.setPassword(encryptedPassword);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(JpaSystemException e){
            bodyData.setMessage("Username already exists");
            ResponseEntity<String> response = new ResponseEntity<>(gson.toJson(bodyData),HttpStatus.CONFLICT);
            System.out.println("Response sent:" +response);
            return response;
        }catch(ConstraintViolationException e){
            bodyData.setMessage("Constraint error");
            ResponseEntity<String> response = new ResponseEntity<>(gson.toJson(bodyData),HttpStatus.UNPROCESSABLE_ENTITY);
            System.out.println("Response sent:" +response);
            return response;
        }catch (AccessDeniedException e) {
        bodyData.setMessage("Forbidden");
        return new ResponseEntity<>(gson.toJson(bodyData), HttpStatus.FORBIDDEN);
    }
    }

    private boolean checkToken(@PathVariable Long userId, HttpServletRequest req, BodyData bodyData) throws AccessDeniedException {
        String token = TokenService.recoverToken(req);
        if(token == null || token.isEmpty() || !TokenService.checkExpiration(token)){
            bodyData.setMessage("Invalid Token");
            return true;
        }
        TokenData tokenData = TokenService.getTokenData(token);
        if(Long.parseLong(tokenData.getSub())!=userId){
            throw new AccessDeniedException("Forbidden");
        }
        return false;
    }

    @Transactional
    @DeleteMapping("/{userId}")
    public ResponseEntity<String> delete(@PathVariable Long userId,HttpServletRequest req){
        BodyData bodyData = new BodyData();
        try {
            if(checkToken(userId,req,bodyData)){

            }
            commonUserRepository.deleteById(userId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch(NoSuchElementException e){

            bodyData.setMessage("User not found");
            return new ResponseEntity<>(gson.toJson(bodyData),HttpStatus.NOT_FOUND);
        }catch (AccessDeniedException e) {
            bodyData.setMessage("Forbidden");
            return new ResponseEntity<>(gson.toJson(bodyData), HttpStatus.FORBIDDEN);
        }
    }
    @ExceptionHandler(SQLException.class)
    public ResponseEntity<String> handleSQLError(SQLException e,HttpServletRequest  req) {
        BodyData bodyData = new BodyData();
        bodyData.setMessage("Username already exists");
        HttpHeaders header = new HttpHeaders();
        header.set("Status",String.valueOf(HttpStatus.CONFLICT.value()));
        ResponseEntity<String> response = new ResponseEntity<>(gson.toJson(bodyData),header,HttpStatus.CONFLICT);
        System.out.println("Response sent:"+ response);
        return response;
    }
 }
