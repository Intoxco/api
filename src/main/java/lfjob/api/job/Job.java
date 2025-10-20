package lfjob.api.job;

import com.google.gson.annotations.SerializedName;
import jakarta.persistence.*;
import lombok.*;
@Table(name = "job")
@Entity(name ="job")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of="id")
public class Job {
    @Id
    @SerializedName("job_id")
    private long id;
    private long company_id;
    private String title;
    private String area;
    private String description;
    private String location;
    private Double salary;

    public Job(JobCreateData vacancyCreateData) {
        this.company_id=vacancyCreateData.company_id();
        this.title = vacancyCreateData.title();
        this.area = vacancyCreateData.area();
        this.description = vacancyCreateData.description();
        this.location = vacancyCreateData.location();
        this.salary = vacancyCreateData.salary();
    }

}
