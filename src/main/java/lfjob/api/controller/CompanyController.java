package lfjob.api.controller;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import static lfjob.api.controller.AuthenticationController.checkToken;

import lfjob.api.company.Company;
import lfjob.api.company.CompanyCreateData;
import lfjob.api.company.CompanyRepository;
import lfjob.api.company.CompanyUpdateData;
import lfjob.api.others.gsonData.BodyData;
import lfjob.api.user.UserRepository;
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
@RequestMapping("/companies")
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private UserRepository userRepository;
    private Gson gson = new Gson();

    @PostMapping
    @ResponseBody
   public ResponseEntity<String> create(@Valid @RequestBody CompanyCreateData companyCreateData){
       BodyData bodyData = new BodyData();
       try {
           String password = new BCryptPasswordEncoder().encode(companyCreateData.password());
           Company company = new Company(companyCreateData);
           company.setPassword(password);
           userRepository.save(company);
           bodyData.setMessage("Created");
           ResponseEntity<String> response = new  ResponseEntity<>(gson.toJson(bodyData), HttpStatus.CREATED);
           System.out.println("Response sent:" +response);
           return response;
       }catch(JpaSystemException e){
           bodyData.setMessage("Username already exists");
           ResponseEntity<String> response = new ResponseEntity<>(gson.toJson(bodyData),HttpStatus.CONFLICT);
           System.out.println("Response sent:" +response);
           return response;
       }catch(ConstraintViolationException e){
           bodyData.setMessage((e.getConstraintViolations().stream().findFirst().toString().equals("username"))?"Username":"Company name"+ " already exists");
           ResponseEntity<String> response = new ResponseEntity<>(gson.toJson(bodyData),HttpStatus.UNPROCESSABLE_ENTITY);
           System.out.println("Response sent:" +response);
           return response;
       }
   }
    @GetMapping("/{companyId}")
    public ResponseEntity<String> read(@PathVariable Long companyId, HttpServletRequest req){
        BodyData bodyData = new BodyData();
        try {
            if (checkToken(companyId, req, bodyData))
                return new ResponseEntity<>(gson.toJson(bodyData), HttpStatus.UNAUTHORIZED);
            Company company = companyRepository.findById(companyId).get();
            bodyData.setUsername(company.getUsername());
            bodyData.setName(company.getName());
            bodyData.setEmail(company.getEmail());
            bodyData.setPhone(company.getPhone());
            bodyData.setBusiness(company.getBusiness());
            bodyData.setStreet(company.getStreet());
            bodyData.setNumber(company.getNumber());
            bodyData.setStreet(company.getStreet());
            bodyData.setCity(company.getCity());
            bodyData.setState(company.getState());
            ResponseEntity<String> response = new ResponseEntity<>(gson.toJson(bodyData),HttpStatus.OK);
            System.out.println("Response sent: "+ response);
            return response;
        }catch(NoSuchElementException e) {
            bodyData.setMessage("Company not found");
            ResponseEntity<String> response = new ResponseEntity<>(gson.toJson(bodyData), HttpStatus.NOT_FOUND);
            System.out.println("Response sent:" + response);
            return response;
        }catch (AccessDeniedException e) {
            bodyData.setMessage("Forbidden");
            ResponseEntity<String> response = new ResponseEntity<>(gson.toJson(bodyData), HttpStatus.FORBIDDEN);
            System.out.println("Response sent:" + response);
            return response;
        }
    }
    @PatchMapping("/{companyId}")
    @Transactional
    public ResponseEntity<String> update(@Valid @RequestBody CompanyUpdateData companyUpdateData, @PathVariable Long companyId, HttpServletRequest req){
        BodyData bodyData = new BodyData();
        try{
            if (checkToken(companyId, req, bodyData))
                return new ResponseEntity<String>(gson.toJson(bodyData), HttpStatus.UNAUTHORIZED);
            String encryptedPassword = new BCryptPasswordEncoder().encode(companyUpdateData.password());
            Company company = companyRepository.getReferenceById(companyId);
            company.setPassword(encryptedPassword);
            company.updateData(companyUpdateData);
            ResponseEntity<String> response = new ResponseEntity<>(HttpStatus.OK);
            System.out.println("Response sent: "+ response);
            return response;
        }catch(NoSuchElementException e) {
            bodyData.setMessage("User not found");
            ResponseEntity<String> response = new ResponseEntity<>(gson.toJson(bodyData), HttpStatus.NOT_FOUND);
            System.out.println("Response sent:" + response);
            return response;
        }catch(ConstraintViolationException e){
            bodyData.setMessage("Company name already exists");
            ResponseEntity<String> response = new ResponseEntity<>(gson.toJson(bodyData),HttpStatus.UNPROCESSABLE_ENTITY);
            System.out.println("Response sent:" +response);
            return response;
        }catch(JpaSystemException e){
            bodyData.setMessage(e.getMessage());
            ResponseEntity<String> response = new ResponseEntity<>(gson.toJson(bodyData),HttpStatus.CONFLICT);
            System.out.println("Response sent:" +response);
            return response;
        }catch (AccessDeniedException e) {
            bodyData.setMessage("Forbidden");
            ResponseEntity<String> response = new  ResponseEntity<>(gson.toJson(bodyData), HttpStatus.FORBIDDEN);
            System.out.println("Response sent:" +response);
            return response;
        }
    }
    @Transactional
    @DeleteMapping("/{companyId}")
    public ResponseEntity<String> delete(@PathVariable Long companyId,HttpServletRequest req){
        BodyData bodyData = new BodyData();
        try {
            if(checkToken(companyId,req,bodyData)){
                ResponseEntity<String> response = new ResponseEntity<>(gson.toJson(bodyData),HttpStatus.UNAUTHORIZED);
                System.out.println("Response sent: "+ response);
                return response;
            }
            companyRepository.deleteById(companyId);
            ResponseEntity<String> response = new ResponseEntity<>(HttpStatus.OK);
            System.out.println("Response sent: "+ response);
            return response;
        } catch(NoSuchElementException e){
            bodyData.setMessage("Company not found");
            ResponseEntity<String> response = new ResponseEntity<>(gson.toJson(bodyData),HttpStatus.NOT_FOUND);
            System.out.println("Response sent:" +response);
            return response;
        }catch (AccessDeniedException e) {
            bodyData.setMessage("Forbidden");
            ResponseEntity<String> response = new ResponseEntity<>(gson.toJson(bodyData),HttpStatus.FORBIDDEN);
            System.out.println("Response sent:" +response);
            return response;
        }
    }

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<String> handleSQLError(SQLException e,HttpServletRequest  req) {
        BodyData bodyData = new BodyData();
        bodyData.setMessage("Company name already exists");
        HttpHeaders header = new HttpHeaders();
        header.set("Status",String.valueOf(HttpStatus.CONFLICT.value()));
        ResponseEntity<String> response = new ResponseEntity<>(gson.toJson(bodyData),header,HttpStatus.CONFLICT);
        System.out.println("Response sent:"+ response);
        return response;
    }
}
