const Employee = require("./Employee");

class Engineer extends Employee{
    constructor(name, id, email, gitHub){
        super(name,id,email,"Engineer");
        this.github = gitHub;
        
    }
    
    getGithub(){
        return this.github;
    }
}
module.exports = Engineer;