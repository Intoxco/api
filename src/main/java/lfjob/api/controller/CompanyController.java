package lfjob.api.controller;

import jakarta.transaction.Transactional;
import lfjob.api.company.CompanyRepository;
import lfjob.api.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/companies")
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private UserRepository userRepository;

   // @PostMapping
    //@Transactional
    //publi
}
