// Classe Candidate
export class Candidate {
    constructor(name, email, state, cep, description, CPF, age) {
        this.name = name;
        this.email = email;
        this.state = state;
        this.cep = cep;
        this.description = description;
        this.CPF = CPF;
        this.age = age;
        this.competences = [];
    }
    addCompetence(comp) {
        this.competences.push(comp);
    }
    toString() {
        return `Candidate { 
            CPF: ${this.CPF}, 
            Age: ${this.age}, 
            Name: ${this.name}, 
            Email: ${this.email}, 
            State: ${this.state}, 
            CEP: ${this.cep}, 
            Description: ${this.description} 
        }`;
    }
}
// Classe Business
export class Business {
    constructor(name, email, CNPJ, country, state, cep, description) {
        this.name = name;
        this.email = email;
        this.state = state;
        this.cep = cep;
        this.description = description;
        this.CNPJ = CNPJ;
        this.country = country;
        this.waitedCompetences = [];
    }
    addCompetence(comp) {
        this.waitedCompetences.push(comp);
    }
    toString() {
        return `Business { 
            CNPJ: ${this.CNPJ}, 
            Country: ${this.country}, 
            Name: ${this.name}, 
            Email: ${this.email}, 
            State: ${this.state}, 
            CEP: ${this.cep}, 
            Description: ${this.description} 
        }`;
    }
}
//# sourceMappingURL=models.js.map