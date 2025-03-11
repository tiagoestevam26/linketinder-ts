// Interface Person
export interface Person {
    name: string;
    email: string;
    state: string;
    cep: string;
    description: string;
}

// Classe Candidate
export class Candidate implements Person {
    name: string;
    email: string;
    state: string;
    cep: string;
    description: string;
    CPF: string;
    age: string;
    competences: string[];

    constructor(name: string, email: string, state: string, cep: string, description: string, CPF: string, age: string) {
        this.name = name;
        this.email = email;
        this.state = state;
        this.cep = cep;
        this.description = description;
        this.CPF = CPF;
        this.age = age;
        this.competences = [];
    }

    addCompetence(comp: string): void {
        this.competences.push(comp);
    }

    toString(): string {
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
export class Business implements Person {
    name: string;
    email: string;
    state: string;
    cep: string;
    description: string;
    CNPJ: string;
    country: string;
    waitedCompetences: string[];

    constructor(name: string, email: string, CNPJ: string, country: string, state: string, cep: string, description: string) {
        this.name = name;
        this.email = email;
        this.state = state;
        this.cep = cep;
        this.description = description;
        this.CNPJ = CNPJ;
        this.country = country;
        this.waitedCompetences = [];
    }

    addCompetence(comp: string): void {
        this.waitedCompetences.push(comp);
    }

    toString(): string {
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
