CREATE TABLE user (
    user_id int(11) NOT NULL AUTO_INCREMENT,
    username varchar(20) NOT NULL UNIQUE,
    password varchar(20) NOT NULL,
    primary key(user_id)
)