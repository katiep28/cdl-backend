CREATE DATABASE cdlcheckout;

 USE cdlcheckout;

CREATE TABLE user (id SMALLINT, firstname VARCHAR(36), secondname VARCHAR(36), PRIMARY KEY(id));

CREATE TABLE usershopheader (id VARCHAR(36), userid SMALLINT, savings FLOAT(2,2), totalcost FLOAT(3,2), 
PRIMARY KEY (id),
FOREIGN KEY (userid) REFERENCES user(id)
);

CREATE TABLE usershopitems (id SMALLINT, usershopheaderid VARCHAR(36), itemname VARCHAR(10), qty SMALLINT, price FLOAT(3,2), 
PRIMARY KEY(usershopheaderid, id),
FOREIGN KEY (usershopheaderid) REFERENCES usershopheader(id)
);

INSERT INTO user (id, firstname, secondname) 
VALUES (1,'Katie','Postle');

INSERT INTO usershopheader (id, userid, savings, totalcost)
VALUES (uuid(),1,0.45,1.75);


