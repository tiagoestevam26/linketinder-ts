export class BusinessManager {
    constructor() {
        this.businesses = [];
        this.loadFromStorage();
    }
    addBusiness(business) {
        this.businesses.push(business);
        this.saveToStorage();
    }
    listBusinesses() {
        return this.businesses;
    }
    saveToStorage() {
        localStorage.setItem("businesses", JSON.stringify(this.businesses));
    }
    loadFromStorage() {
        const data = localStorage.getItem("businesses");
        if (data) {
            this.businesses = JSON.parse(data);
        }
    }
}
export class CandidatesManager {
    constructor() {
        this.candidates = [];
        this.loadFromStorage();
    }
    addCandidate(candidate) {
        this.candidates.push(candidate);
        this.saveToStorage();
    }
    listCandidates() {
        return this.candidates;
    }
    saveToStorage() {
        localStorage.setItem("candidates", JSON.stringify(this.candidates));
    }
    loadFromStorage() {
        const data = localStorage.getItem("candidates");
        if (data) {
            this.candidates = JSON.parse(data);
        }
    }
}
// Criamos instâncias globais para serem usadas nas telas
export const businessManager = new BusinessManager();
export const candidateManager = new CandidatesManager();
//# sourceMappingURL=managers.js.map