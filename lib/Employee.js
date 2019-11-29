class Employee{
    constructor(name, id, email, role = "Employee"){
        this.name = name;
        this.role = role;        
        this.id = id;
        this.email = email;
    }
    getId(){
        return this.id;
    }
    getEmail(){
        return this.email;
    }
    getRole(){
        return this.role;
    }
    getName(){
        return this.name;
    }
}
module.exports = Employee;