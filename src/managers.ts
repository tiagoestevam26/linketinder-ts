import { Business, Candidate } from './models.js';

export class BusinessManager {
    private businesses: Business[] = [];

    constructor() {
        this.loadFromStorage();
    }

    addBusiness(business: Business): void {
        this.businesses.push(business);
        this.saveToStorage();
    }

    listBusinesses(): Business[] {
        return this.businesses;
    }

    private saveToStorage(): void {
        localStorage.setItem("businesses", JSON.stringify(this.businesses));
    }

    private loadFromStorage(): void {
        const data = localStorage.getItem("businesses");
        if (data) {
            this.businesses = JSON.parse(data);
        }
    }
}

export class CandidatesManager {
    private candidates: Candidate[] = [];

    constructor() {
        this.loadFromStorage();
    }

    addCandidate(candidate: Candidate): void {
        this.candidates.push(candidate);
        this.saveToStorage();
    }

    listCandidates(): Candidate[] {
        return this.candidates;
    }

    private saveToStorage(): void {
        localStorage.setItem("candidates", JSON.stringify(this.candidates));
    }

    private loadFromStorage(): void {
        const data = localStorage.getItem("candidates");
        if (data) {
            this.candidates = JSON.parse(data);
        }
    }
}

// Criamos instâncias globais para serem usadas nas telas
export const businessManager = new BusinessManager();
export const candidateManager = new CandidatesManager();
