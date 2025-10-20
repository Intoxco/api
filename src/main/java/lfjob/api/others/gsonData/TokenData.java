package lfjob.api.others.gsonData;

import lfjob.api.user.UserRoles;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TokenData {
    private String sub;
    private String username;
    private UserRoles role;
    private Long exp;
}
