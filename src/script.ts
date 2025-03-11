// Importando os módulos corretamente
import { Business } from "./models.js";
import { Candidate } from "./models.js";
import { businessManager } from "./managers.js";
import { candidateManager } from "./managers.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("Script carregado com sucesso!");
    
    const empresaForm = document.getElementById("empresa-form") as HTMLFormElement;
    const candidatoForm = document.getElementById("candidato-form") as HTMLFormElement;

    let empresaCompetencias: string[] = [];
    let candidatoCompetencias: string[] = [];

    // Configurar a funcionalidade de adicionar competências
    setupCompetenceInput("empresa-form", "competence-business", "business-competences-list", empresaCompetencias);
    setupCompetenceInput("candidato-form", "competence-candidate", "candidate-competences-list", candidatoCompetencias);

    if (empresaForm) {
        empresaForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = (document.getElementById("name") as HTMLInputElement).value;
            const email = (document.getElementById("email") as HTMLInputElement).value;
            const cnpj = (document.getElementById("cnpj") as HTMLInputElement).value;
            const country = (document.getElementById("country") as HTMLInputElement).value;
            const state = (document.getElementById("state") as HTMLInputElement).value;
            const cep = (document.getElementById("cep") as HTMLInputElement).value;
            const description = (document.getElementById("description") as HTMLInputElement).value;

            const empresa = new Business(name, email, cnpj, country, state, cep, description);
            empresa.waitedCompetences = empresaCompetencias; // Salvar competências

            businessManager.addBusiness(empresa);
            alert("Empresa cadastrada com sucesso!");
            empresaForm.reset();
            empresaCompetencias = []; // Resetar array de competências
            document.getElementById("competences-list")!.innerHTML = ""; // Limpar lista visual
        });
    }

    if (candidatoForm) {
        candidatoForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = (document.getElementById("name") as HTMLInputElement).value;
            const email = (document.getElementById("email") as HTMLInputElement).value;
            const cpf = (document.getElementById("cpf") as HTMLInputElement).value;
            const age = (document.getElementById("age") as HTMLInputElement).value;
            const state = (document.getElementById("state") as HTMLInputElement).value;
            const cep = (document.getElementById("cep") as HTMLInputElement).value;
            const description = (document.getElementById("description") as HTMLInputElement).value;

            const candidato = new Candidate(name, email, state, cep, description, cpf, age);
            candidato.competences = candidatoCompetencias; // Salvar competências
            console.log(candidatoCompetencias);


            candidateManager.addCandidate(candidato);
            console.log("Candidato cadastrado:", candidato);
            alert("Candidato cadastrado com sucesso!");
            candidatoForm.reset();
            candidatoCompetencias = []; // Resetar array de competências
            document.getElementById("competences-list")!.innerHTML = ""; // Limpar lista visual
        });
    }

    const businessList = document.getElementById("empresas-list");
    const candidatesList = document.getElementById("candidatos-list");

    if (businessList) {
        businessList.innerHTML = ""; // Limpar lista antes de recarregar

    businessManager.listBusinesses().forEach(business => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${business.name}</td>
            <td>${business.email}</td>
            <td>${business.CNPJ}</td>
            <td>${business.country}</td>
            <td>${business.state}</td>
            <td>${business.cep}</td>
            <td>${business.description}</td>
            <td>${business.waitedCompetences.join(", ") || "Nenhuma"}</td> 
        `;

        businessList.appendChild(row);
    });
    }

    if (candidatesList) {
        candidatesList.innerHTML = ""; // Limpar lista antes de recarregar

        candidateManager.listCandidates().forEach(candidate => {
            const row = document.createElement("tr");
    
            row.innerHTML = `
                <td>${candidate.name}</td>
                <td>${candidate.email}</td>
                <td>${candidate.CPF}</td>
                <td>${candidate.age}</td>
                <td>${candidate.state}</td>
                <td>${candidate.cep}</td>
                <td>${candidate.description}</td>
                <td>${candidate.competences.join(", ") || "Nenhuma"}</td> 
            `;
    
            candidatesList.appendChild(row);
        });
    }
});


// Função para adicionar competências dinamicamente
function setupCompetenceInput(formId: string, inputId: string, listId: string, storageArray: string[]) {
    const competenceInput = document.getElementById(inputId) as HTMLInputElement;
    const addCompetenceButton = document.getElementById(`add-${inputId}`) as HTMLButtonElement;
    const competenceList = document.getElementById(listId) as HTMLUListElement;

    if (addCompetenceButton && competenceInput && competenceList) {
        addCompetenceButton.addEventListener("click", () => {
            const competence = competenceInput.value.trim();
            if (competence) {
                storageArray.push(competence);
                const listItem = document.createElement("li");
                listItem.textContent = competence;
                competenceList.appendChild(listItem);
                competenceInput.value = "";
            }
        });
    }
}


;
