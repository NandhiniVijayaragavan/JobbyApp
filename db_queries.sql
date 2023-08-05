create database jobbyapp_db;
use jobbyapp_db;

create table user (id int primary key auto_increment, name varchar(200), 
email varchar(100), phoneno bigint(11),image varchar(200), password varchar(100), 
isemployer boolean, dob date, about text);

select * from user;

drop table user;