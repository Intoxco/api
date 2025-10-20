package lfjob.api.company;

public record CompanyCreateData(Long userId,String name, String business, String username, String password, String street, int number, String city, String state, String phone, String email){

}