package lfjob.api.company;

import jakarta.persistence.*;
import lfjob.api.user.User;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;

@Table(name = "company")
@Entity(name = "company")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper= true)
public class Company extends User {

    private String name;
    private String email;
    private String phone;
    private String business;
    private int number;
    private String street;
    private String city;
    private String state;

    public Company(CompanyCreateData company) {
        super(company.username(),company.username());
        this.name = company.name();
        this.userId = company.userId();
        this.email = company.email();
        this.phone = company.phone();
        this.number = company.number();
        this.street = company.street();
        this.city = company.city();
        this.state = company.state();
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("company"));
    }
}
