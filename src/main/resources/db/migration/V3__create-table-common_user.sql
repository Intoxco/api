CREATE TABLE common_user (
    email varchar(150) DEFAULT NULL,
    phone varchar(14) DEFAULT NULL,
    experience varchar(600) DEFAULT NULL,
    education varchar(600) DEFAULT NULL,
    user_id int(11) NOT NULL,
    name varchar(150) NOT NULL,
    primary key(user_id),
    foreign key(user_id) references user(user_id)
)