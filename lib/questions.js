class Questions{
    constructor(){        
    this.managerQuestions = [{
                        type:"input",
                        message: "What is the managers Name?",
                        name: "name"
                    },
                    {  type:"number",
                        message: "What is the managers ID?",
                        name: "id"
                    },
                    {  type:"input",
                        message: "What is the managers email?",
                        name: "email"
                    },
                    {  type:"number",
                        message: "What is the managers office number",
                        name: "office"
                    }];
    this.engineerQuestions = [{  
                        type:"input",
                        message: "What is the engineers Name?",
                        name: "name"
                    },
                    {  type:"number",
                        message: "What is the engineers ID?",
                        name: "id"
                    },
                    {  type:"input",
                        message: "What is the engineers email?",
                        name: "email"
                    },
                    {  type:"number",
                        message: "What is the engineers GitHub Username",
                        name: "github"
                    }];
    this.internQuestions = [{  
                        type:"input",
                        message: "What is the interns Name?",
                        name: "name"
                    },
                    {  type:"number",
                        message: "What is the interns ID?",
                        name: "id"
                    },
                    {  type:"input",
                        message: "What is the interns email?",
                        name: "email"
                    },
                    {  type:"number",
                        message: "What is the interns school",
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