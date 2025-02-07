USE mydb

-- Un schéma de base de données test
CREATE TABLE User(
    id INT AUTO_INCREMENT,
    first_name VARCHAR(33) NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY(id)
);

INSERT INTO User (first_name) VALUES ('John'), ('Eve');