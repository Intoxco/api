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
            if(user.email().isEmpty())
                this.email = null;
            else
                this.email = user.email();
        }
        if(user.phone() != null) {
            if(user.phone().isEmpty())
                this.phone = null;
            else
                this.phone = user.phone();
        }
        if(user.experience() != null) {
            if(user.experience().isEmpty())
                this.experience = null;
            else
                this.experience = user.experience();
        }
        if(user.education() != null) {
            if(user.education().isEmpty())
                this.education = null;
            else
                this.education = user.education();
        }
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("user"));
    }

}
