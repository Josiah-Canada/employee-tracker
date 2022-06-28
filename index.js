const mysql = require('mysql2');
const inquirer = require("inquirer");

const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Newsqlwhodis!97',
      database: 'employee_tracker'
    },
    console.log('Connected to the election database.')
);

db.connect(function (err) {
  if(err) throw err;
  startApp()
})
  
const questions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
      "View Department",
      "Add new Department",
      "Add new Employee",
      "View Employees",
      "Add Role",
      "View Role",
      "Update an employee"
    ]
  }
]

function startApp() {
  inquirer.prompt(questions)
  .then(answers => {
    // console.log(answers)
    if(answers.choice == "View Department") {
      viewDept()
    } else if(answers.choice == "Add new Department"){
      addDept()
    } else if(answers.choice == "Add new Employee"){
      addEmp()
    } else if(answers.choice == "View Employees"){
      viewEmp()
    } else if(answers.choice == "Add Role"){
      addRole()
    } else if(answers.choice == "View Role"){
      viewRole()
    } else if(answers.choice == "Update an employee"){
      upEmp
    }
  })
}

function viewDept() {
  const sqlString = `
  SELECT * 
  FROM department`
  
  db.query(sqlString, (err, data) => {
    if(err) throw err;
    console.log('\n');
    console.table(data);
    console.log('\n');

    startApp()
  })
}

// function viewRole() {
//   const sqlstring = `
//   SELECT role-id
//   FROM employee`

//   db.query(sqlString, (err, data) => {
//     if(err) throw err;
//     console.log('\n');
//     console.table(data);
//     console.log('\n');

//     startApp()
//   })
// }

function addDept() {
  inquirer.prompt([
    {
      type: "input",
      message: "What would you like the new department to be?",
      name: "newDept"
    },
    {
      type: "input",
      message: "What would the description of this department be?",
      name: "newDesc"
    },
  ]).then(deptAnswers => {
    const sqlString = `
    INSERT INTO department(name, description)
    VALUES (?, ?)`


    db.query(sqlString, [deptAnswers.newDept, deptAnswers.newDesc], (err, data) => {
      if (err) throw err;
      console.log("\n")
      console.log("Added a new department")
      console.log("\n")

      startApp()
    })
  })
}

function addEmp() {
  inquirer.prompt([
    {
      type: "input",
      message: "what is your employees' first name?",
      name: "empFirstName"
    },
    {
      type: "input",
      message: "what is your employees' last name?",
      name: "empLastName"
    },
    {
      type: "input",
      message: "what is your employees' role id?",
      name: "empRoleId"
    }
  ]).then(empAnswers => {
    const sqlString = `
    INSERT INTO employee(first_name, last_name, role_id)
    VALUES (?,?,?)`

    db.query(sqlString, [empAnswers.empFirstName, empAnswers.empLastName, empAnswers.empRoleId], (err, data) => {
      if (err) throw err;
      console.log('\n')
      console.log("Added a new employee")
      console.log('\n')

      startApp()
    })
  })
}

function viewEmp() {
  const sqlString = `
  SELECT * 
  FROM employee`
  
  db.query(sqlString, (err, data) => {
    if(err) throw err;
    console.log('\n');
    console.table(data);
    console.log('\n');

    startApp()
  })
}

function upEmp() {
  inquirer.prompt([
    {
      type: "input",
      message: "which employee would you like to change?",
      name: "chooseEmp"
    },
    {
      type: "input",
      message: "What is the updated first name?",
      name: "upName"
    },
    {
      type: "input",
      message: "what is the updated last name?",
      name: "upLastName"
    },
    {
      type: "input",
      message: "what is their updated role id?",
      name: "upRoleId"
    }
  ]).then(upEmpAnswers => {
    const sqlString = `
    UPDATE employee(first_name, last_name, role_id)
    VALUES(?,?,?)`

    db.query(sqlString, [upEmpAnswers.chooseEmp, upEmpAnswers.upName, upEmpAnswers.upLastName, upEmpAnswers.upRoleId], (err, data) => {
      if(err) throw err
      console.log('\n')
      console.log('Updated Employee')
      console.log('\n')
    })
  })
}

function addRole() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the name of this role",
      name: "roleName"
    },
    {
      type: "input",
      message: "What is the salary for this role",
      name: "roleSalary"
    },
    {
      type: "input",
      message: "What is the department of this role",
      name: "roleDepartment"
    }
  ]).then(roleAnswers => {
    const sqlString = `
    INSERT INTO role(title, salary, department_id)
    VALUES(?,?,?)`

    db.query(sqlString, [roleAnswers.roleName, roleAnswers.roleSalary, roleAnswers.roleDepartment], (err, data) => {
      if (err) throw err
      console.log('\n')
      console.log('Added a new role')
      console.log('\n')

      startApp()
    })
  })
}

function viewRole() {
  const sqlString = `
  SELECT * 
  FROM role`
  
  db.query(sqlString, (err, data) => {
    if(err) throw err;
    console.log('\n');
    console.table(data);
    console.log('\n');

    startApp()
  })
}