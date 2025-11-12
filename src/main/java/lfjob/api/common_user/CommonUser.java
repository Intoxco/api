package lfjob.api.common_user;

import jakarta.persistence.*;
import lfjob.api.user.User;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;

@Table(name = "common_user")
@Entity(name = "common_user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@PrimaryKeyJoinColumn(name="user_id")
public class CommonUser extends User {
    private String name;
    private String email;
    private String phone;
    private String experience;
    private String education;

    public CommonUser(CommonUserCreateData user) {
        super(user.username(),user.password());
        this.name = user.name();
        this.email = user.email();
        this.phone = user.phone();
        this.experience = user.experience();
        this.education = user.education();
    }
    public void updateData(CommonUserUpdateData user) {
        this.name = user.name();
        this.password = user.password();
        if(user.email() != null) {
            this.email = (user.email().isEmpty()) ? null : user.email();
        }
        if(user.phone() != null) {
            this.phone = (user.phone().isEmpty()) ? null : user.phone();
        }
        if(user.experience() != null) {
            this.experience = (user.experience().isEmpty()) ? null : user.experience();
        }
        if(user.education() != null) {
            this.education = (user.education().isEmpty()) ? null : user.education();
        }
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("user"));
    }

}
