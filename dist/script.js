// Importando os módulos corretamente
import { Business } from "./models.js";
import { Candidate } from "./models.js";
import { businessManager } from "./managers.js";
import { candidateManager } from "./managers.js";
document.addEventListener("DOMContentLoaded", () => {
    console.log("Script carregado com sucesso!");
    const empresaForm = document.getElementById("empresa-form");
    const candidatoForm = document.getElementById("candidato-form");
    let empresaCompetencias = [];
    let candidatoCompetencias = [];
    // Configurar a funcionalidade de adicionar competências
    setupCompetenceInput("empresa-form", "competence-business", "business-competences-list", empresaCompetencias);
    setupCompetenceInput("candidato-form", "competence-candidate", "candidate-competences-list", candidatoCompetencias);
    if (empresaForm) {
        empresaForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const cnpj = document.getElementById("cnpj").value;
            const country = document.getElementById("country").value;
            const state = document.getElementById("state").value;
            const cep = document.getElementById("cep").value;
            const description = document.getElementById("description").value;
            const empresa = new Business(name, email, cnpj, country, state, cep, description);
            empresa.waitedCompetences = empresaCompetencias; // Salvar competências
            businessManager.addBusiness(empresa);
            alert("Empresa cadastrada com sucesso!");
            empresaForm.reset();
            empresaCompetencias = []; // Resetar array de competências
            document.getElementById("competences-list").innerHTML = ""; // Limpar lista visual
        });
    }
    if (candidatoForm) {
        candidatoForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const cpf = document.getElementById("cpf").value;
            const age = document.getElementById("age").value;
            const state = document.getElementById("state").value;
            const cep = document.getElementById("cep").value;
            const description = document.getElementById("description").value;
            const candidato = new Candidate(name, email, state, cep, description, cpf, age);
            candidato.competences = candidatoCompetencias; // Salvar competências
            console.log(candidatoCompetencias);
            candidateManager.addCandidate(candidato);
            console.log("Candidato cadastrado:", candidato);
            alert("Candidato cadastrado com sucesso!");
            candidatoForm.reset();
            candidatoCompetencias = []; // Resetar array de competências
            document.getElementById("competences-list").innerHTML = ""; // Limpar lista visual
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
function setupCompetenceInput(formId, inputId, listId, storageArray) {
    const competenceInput = document.getElementById(inputId);
    const addCompetenceButton = document.getElementById(`add-${inputId}`);
    const competenceList = document.getElementById(listId);
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
//# sourceMappingURL=script.js.map