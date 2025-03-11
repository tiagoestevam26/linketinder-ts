import { Business } from "./models.js";
import { Candidate } from "./models.js";
import { businessManager } from "./managers.js";
import { candidateManager } from "./managers.js";


// Definir chartData no window
declare global {
    interface Window {
        chartData: { labels: string[]; data: number[] };
    }
}

window.chartData = window.chartData || { labels: [], data: [] };

document.addEventListener("DOMContentLoaded", () => {
    console.log("Script carregado com sucesso!");

    const empresaForm = document.getElementById("empresa-form") as HTMLFormElement;
    const candidatoForm = document.getElementById("candidato-form") as HTMLFormElement;

    let empresaCompetencias: string[] = [];
    let candidatoCompetencias: string[] = [];

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
            empresa.waitedCompetences = empresaCompetencias; 

            businessManager.addBusiness(empresa);
            alert("Empresa cadastrada com sucesso!");
            empresaForm.reset();
            empresaCompetencias = []; 
            document.getElementById("competences-list")!.innerHTML = ""; 
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
            candidato.competences = candidatoCompetencias; 
            console.log(candidatoCompetencias);


            candidateManager.addCandidate(candidato);
            console.log("Candidato cadastrado:", candidato);
            alert("Candidato cadastrado com sucesso!");
            candidatoForm.reset();
            candidatoCompetencias = []; 
            document.getElementById("competences-list")!.innerHTML = ""; 
        });
    }

    const businessList = document.getElementById("empresas-list");
    const candidatesList = document.getElementById("candidatos-list");

    if (businessList) {
        businessList.innerHTML = ""; 

        businessManager.listBusinesses().forEach(business => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${business.name}</td>                       
            <td>${business.country}</td>
            <td>${business.state}</td>      
            <td>${business.waitedCompetences.join(", ") || "Nenhuma"}</td> 
        `;

            businessList.appendChild(row);
        });
    }

    if (candidatesList) {
        candidatesList.innerHTML = ""; 


        candidateManager.listCandidates().forEach(candidate => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${candidate.name}</td>
                <td>${candidate.state}</td>
                <td>${candidate.competences.join(", ") || "Nenhuma"}</td> 
            `;

            candidatesList.appendChild(row);


        });

        atualizarGraficoCompetencias(candidateManager.listCandidates());

    }




});


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
};


function contarCompetencias(candidatos: Candidate[]): { [key: string]: number } {
    const contagem: { [key: string]: number } = {};

    candidatos.forEach(candidate => {
        candidate.competences.forEach(competencia => {
            contagem[competencia] = (contagem[competencia] || 0) + 1;
        });
    });

    return contagem;
}

function atualizarGraficoCompetencias(candidatos: Candidate[]) {
    const competenciasCount = contarCompetencias(candidatos);

    window.chartData = {
        labels: Object.keys(competenciasCount),
        data: Object.values(competenciasCount)
    };

    console.log("Atualizando gráfico com:", window.chartData);

    const scriptContainer = document.getElementById("script-container");
    if (scriptContainer) {
        scriptContainer.innerHTML = ""; 

        const chartJsScript = document.createElement("script");
        chartJsScript.src = "https://cdn.jsdelivr.net/npm/chart.js";
        chartJsScript.onload = () => {
            const scriptTag = document.createElement("script");
            scriptTag.textContent = `
                var ctx = document.getElementById("myChart").getContext("2d");
                var myChart = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: ${JSON.stringify(window.chartData.labels)},
                        datasets: [{
                            label: "Número de Candidatos por Competência",
                            data: ${JSON.stringify(window.chartData.data)},
                            backgroundColor: "rgba(54, 162, 235, 0.5)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: { y: { beginAtZero: true } }
                    }
                });
            `;
            scriptContainer.appendChild(scriptTag);
        };

        scriptContainer.appendChild(chartJsScript);
    }
}
