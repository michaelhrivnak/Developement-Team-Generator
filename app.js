const Inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const fs = require('fs');
const Questions = require('./lib/questions');

let employees = [];

async function start(){

   console.log("Please Building Your Team");
    await Inquirer.prompt(new Questions().managerQuestions)
    .then(answers => {
        employees.push(new Manager(answers.name,answers.id,answers.email,answers.office));
        
    });
    let next = true;
    while (next){
        await Inquirer.prompt(new Questions().nextEmployee)
        .then(async function(answers){
                switch(answers.employee){
                case "Engineer":
                    await makeEngineer();                    
                    break;
                case "Intern" :             
                    await makeIntern();                     
                    break;
                case "Quit":
                    next = false;
                break;
            }
        });
    }
    sortEmployees();
    console.log(employees);

}

function sortEmployees(){
   
   employees.sort((a,b)=>{
       if(a.role === "Manager" || b.role === "Manager"){
           return -1;
       }else if (a.role === b.role){
           if(a.id > b.id){
               return 1;
           }else if(a.id < b.id){
               return -1;
           }else{
               return 0;
           }
       }else if(a.role === "Engineer" && b.role === "Intern"){
           return -1;
       }else {
           return 1;
       }
   });
}

async function makeIntern(){
    await Inquirer.prompt(new Questions().internQuestions)
    .then(answers =>{
        const intern = new Intern(answers.name,answers.id, answers.email,answers.school);
        employees.push(intern);
    });
    
}
async function makeEngineer(){
   await Inquirer.prompt(new Questions().engineerQuestions)
    .then(answers =>{
        const engineer = new Engineer(answers.name,answers.id,answers.email,answers.github);
        employees.push(engineer)
    });
    
}

start();



