package lfjob.api.company;

import lfjob.api.common_user.CommonUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company,Long> {

}
