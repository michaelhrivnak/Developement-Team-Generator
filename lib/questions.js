class Questions{
    constructor(){        
    this.managerQuestions = [{
                        type:"input",
                        message: "What is the manager's Name?",
                        name: "name"
                    },
                    {  type:"input",
                        message: "What is the manager's ID?",
                        name: "id"
                    },
                    {  type:"input",
                        message: "What is the manager's email?",
                        name: "email"
                    },
                    {  type:"number",
                        message: "What is the manager's office number",
                        name: "office"
                    }];
    this.engineerQuestions = [{  
                        type:"input",
                        message: "What is the engineer's Name?",
                        name: "name"
                    },
                    {  type:"input",
                        message: "What is the engineer's ID?",
                        name: "id"
                    },
                    {  type:"input",
                        message: "What is the engineer's email?",
                        name: "email"
                    },
                    {  type:"input",
                        message: "What is the engineer's GitHub Username",
                        name: "github"
                    }];
    this.internQuestions = [{  
                        type:"input",
                        message: "What is the intern's Name?",
                        name: "name"
                    },
                    {  type:"input",
                        message: "What is the intern's ID?",
                        name: "id"
                    },
                    {  type:"input",
                        message: "What is the intern's email?",
                        name: "email"
                    },
                    {  type:"input",
                        message: "What is the intern's school",
                        name: "school"
                    }];
        this.nextEmployee = {
                        type:"list",
                        message:"What type of Employee would you like to make next?",
                        choices:["Engineer","Intern","Quit"],
                        name:"employee"
        }    
    }    
}
module.exports = Questions;