const Inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const fs = require('fs');
const Questions = require('./lib/questions');
const util = require('util');

const employees = [];
const employeeHTML = [];

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

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
    let employeesHTML = await generateEmployeeHTML();
    let mainHTML = await readFileAsync('./templates/main.html','utf8',data => data);
    mainHTML.replace("##DATA",employeesHTML);

    writeFileAsync('team.html','utf8',mainHTML, err=>{
        if(err){
            console.log(err);
        }
    });

}


async function generateEmployeeHTML(){
    for(const employee of employees){
        let html = await getEmployeeHTML(employee);
        employeeHTML.push(html);
    }
    return employeeHTML.join("\n");
}

async function getEmployeeHTML(employee){

    await html = readFileAsync(`./templates/${employee .role.toLoweCase()}.html`,'utf8',(err,data) =>{
        if(err){
            console.log(err);
            return;
        }
        return data;
    });

    html.replace("@@NAME", employee.name);
    html.replace("@@ID", employee.id);
    html.replace("@@EMAIL",employee.email);

    switch(employee.role){
        case "Manager":
            html.replace("@@OFFICE", employee.officeNumber);
            break;
        case "Intern":
            html.replace("@@SCHOOL", employee.school);
            break;
        case "Engineer":
            html.replace("@@GITHUB", employee.github);
        break;
    }
    return html;
}


function sortEmployees(){
   
   employees.sort((a,b)=>{
       if (a.role === b.role){
           if(a.id > b.id){
               return 1;
           }else if(a.id < b.id){
               return -1;
           }else{
               return 0;
           }
       }else if(a.role === "Manager"){
           return -1;
       }else if(b.role === "Manager"){
           return 1;
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



