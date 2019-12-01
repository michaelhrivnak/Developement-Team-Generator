//load depedencies
const Inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const fs = require('fs');
const Questions = require('./lib/questions');
const util = require('util');
const moment = require('moment');

//initialize our data containers
const employees = [];
const employeeHTML = [];
//set up our promise functions
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

async function start(){
    console.log("Please Building Your Team");
    //get intial response for Manager
    await Inquirer.prompt(new Questions().managerQuestions)
    .then(answers => {
        employees.push(new Manager(answers.name,answers.id,answers.email,answers.office));
        
    });
    //check variable for quitting
    let next = true;
    //keep getting respones until the user decides to quit
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
    //order employee list
    sortEmployees();
    //build the output file
    let employeesHTML = await generateEmployeeHTML();
    let mainHTML = await readFileAsync('./templates/main.html','utf8');
    mainHTML = mainHTML.replace("##DATA",employeesHTML);
    
    //create our output
    writeFileAsync(`./output/DevTeam_${moment().format("DD-MMM-YY_HHmm")}.html`,mainHTML).then( err=>{
        if(err){
            console.log(err);
        }
    });

}
//loop through employees and generate the html output
async function generateEmployeeHTML(){
    for(const employee of employees){
        let html = await getEmployeeHTML(employee);
        employeeHTML.push(html);
    }
    //join them into one output variable
    return employeeHTML.join("\n");
}

async function getEmployeeHTML(employee){
    //read the proper temple
    let html = await readFileAsync(`./templates/${employee.role.toLowerCase()}.html`,'utf8');
    
    //replace our holder values in the temples with proper values
    html = html.replace("@@NAME", employee.name)
    .replace("@@ID", employee.id)
    .replace(/@@EMAIL/g,employee.email);
   
    switch(employee.role){
        case "Manager":
            html = html.replace("@@OFFICE", employee.officeNumber);
            break;
        case "Intern":
            html = html.replace("@@SCHOOL", employee.school);
            break;
        case "Engineer":
            html = html.replace("@@GITHUB", employee.github);
        break;
    }
    return html;
}

//sorts the employees first by role then by id
function sortEmployees(){
   
   employees.sort((a,b)=>{
       
       if (a.role === b.role){
           //ids are sorted numerically
           return parseInt(a.id) - parseInt(b.id);
       //sorts manager to the front 
       }else if(a.role === "Manager"){
           return -1;
       }else if(b.role === "Manager"){
           return 1;
       //engineer > intern
       }else if(a.role === "Engineer" && b.role === "Intern"){
           return -1;
       }else {
           return 1;
       }
   });
}

//get intern specific questions and ask them
async function makeIntern(){
    await Inquirer.prompt(new Questions().internQuestions)
    .then(answers =>{
        const intern = new Intern(answers.name,answers.id, answers.email,answers.school);
        employees.push(intern);
    });
    
}
//get engineer specific questions and ask them
async function makeEngineer(){
   await Inquirer.prompt(new Questions().engineerQuestions)
    .then(answers =>{
        const engineer = new Engineer(answers.name,answers.id,answers.email,answers.github);
        employees.push(engineer)
    });
    
}
//run the app
start();



