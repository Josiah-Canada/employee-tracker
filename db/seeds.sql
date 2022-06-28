INSERT INTO department(name , description)
VALUES ("HR", "Human Resources that Resource Humans"),
("Marketing", "When the Developers are done coming up with ideas, how do we sell more apps?");

INSERT INTO employee(first_name, last_name, role_id)
VALUES ("Erving", "Lopez", "7984678"),
("Irine", "Brown", "7544432");

INSERT INTO role(name, salary, department)
VALUES ("Librarian", "77,000", "Library"),
("Repair-man", "58,000", "Electric");

UPDATE employee
SET first_name = 'Toni', last_name = 'Childs', role_id = "5678844"
WHERE employeeId = *;