package lfjob.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.sql.Connection;
import java.sql.DriverManager;



@SpringBootApplication
public class ApiApplication {

	public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
        try {
            Connection conn = DriverManager.getConnection(
                    "jdbc:mariadb://localhost:3307/lfjob"
            );
            System.out.println("Conexao estabelecida com sucesso");
        }catch(Exception e) {
            System.out.println("Error connecting to database");
        }
    }

}