import { Business } from "./models.js";
import { Candidate } from "./models.js";
import { businessManager } from "./managers.js";
import { candidateManager } from "./managers.js";
window.chartData = window.chartData || { labels: [], data: [] };
document.addEventListener("DOMContentLoaded", () => {
    console.log("Script carregado com sucesso!");
    const empresaForm = document.getElementById("empresa-form");
    const candidatoForm = document.getElementById("candidato-form");
    let empresaCompetencias = [];
    let candidatoCompetencias = [];
    setupCompetenceInput("empresa-form", "competence-business", "business-competences-list", empresaCompetencias);
    setupCompetenceInput("candidato-form", "competence-candidate", "candidate-competences-list", candidatoCompetencias);
    if (empresaForm) {
        empresaForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const cnpj = document.getElementById("cnpj").value.trim();
            const country = document.getElementById("country").value.trim();
            const state = document.getElementById("state").value.trim();
            const cep = document.getElementById("cep").value.trim();
            const description = document.getElementById("description").value.trim();
            // Regex patterns
            const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)?$/;
            const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
            const cepRegex = /^(\d{5}-\d{3}|\d{8})$/;
            // Validation
            if (!nameRegex.test(name)) {
                alert("Nome inválido. Deve conter pelo menos 3 caracteres e apenas letras.");
                return;
            }
            if (!emailRegex.test(email)) {
                alert("E-mail inválido. Formato esperado: exemplo@dominio.com");
                return;
            }
            if (!cnpjRegex.test(cnpj)) {
                alert("CNPJ inválido. Formato esperado: XX.XXX.XXX/XXXX-XX");
                return;
            }
            if (!cepRegex.test(cep)) {
                alert("CEP inválido. Formato esperado: XXXXX-XXX");
                return;
            }
            const empresa = new Business(name, email, cnpj, country, state, cep, description);
            empresa.waitedCompetences = empresaCompetencias;
            businessManager.addBusiness(empresa);
            alert("Empresa cadastrada com sucesso!");
            empresaForm.reset();
            empresaCompetencias = [];
            document.getElementById("competences-list").innerHTML = "";
        });
    }
    if (candidatoForm) {
        candidatoForm.addEventListener("submit", (event) => {
            event.preventDefault();
            // Captura os valores dos inputs
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const cpf = document.getElementById("cpf").value.trim();
            const age = document.getElementById("age").value.trim();
            const state = document.getElementById("state").value.trim();
            const cep = document.getElementById("cep").value.trim();
            const description = document.getElementById("description").value.trim();
            // Expressões regulares para validação
            const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/; // Apenas letras e espaços, mínimo 2 caracteres
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validação básica de e-mail
            const cpfRegex = /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/; // Formato 000.000.000-00
            const ageRegex = /^(1[89]|[2-9]\d)$/; // Idade entre 18 e 99
            const stateRegex = /^[A-Z]{2}$/; // Ex: SP, RJ, MG (duas letras maiúsculas)
            const cepRegex = /^(\d{5}-\d{3}|\d{8})$/; // Formato 00000-000
            // Validações
            if (!nameRegex.test(name)) {
                alert("Nome inválido! Deve conter apenas letras e espaços, com pelo menos 2 caracteres.");
                return;
            }
            if (!emailRegex.test(email)) {
                alert("E-mail inválido! Insira um formato válido (exemplo@dominio.com).");
                return;
            }
            if (!cpfRegex.test(cpf)) {
                alert("CPF inválido! Utilize o formato 000.000.000-00.");
                return;
            }
            if (!ageRegex.test(age)) {
                alert("Idade inválida! O candidato deve ter entre 18 e 99 anos.");
                return;
            }
            if (!stateRegex.test(state)) {
                alert("Estado inválido! Use a sigla com duas letras maiúsculas, ex: SP.");
                return;
            }
            if (!cepRegex.test(cep)) {
                alert("CEP inválido! Utilize o formato 00000-000.");
                return;
            }
            // Criar o candidato após validações
            const candidato = new Candidate(name, email, state, cep, description, cpf, age);
            candidato.competences = candidatoCompetencias;
            candidateManager.addCandidate(candidato);
            console.log("Candidato cadastrado:", candidato);
            alert("Candidato cadastrado com sucesso!");
            // Resetar o formulário
            candidatoForm.reset();
            candidatoCompetencias = [];
            document.getElementById("competences-list").innerHTML = "";
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
function contarCompetencias(candidatos) {
    const contagem = {};
    candidatos.forEach(candidate => {
        candidate.competences.forEach(competencia => {
            contagem[competencia] = (contagem[competencia] || 0) + 1;
        });
    });
    return contagem;
}
function atualizarGraficoCompetencias(candidatos) {
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
//# sourceMappingURL=script.js.map