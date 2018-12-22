import { ICommande } from 'app/shared/model//commande.model';

export interface IClient {
    id?: number;
    nom?: string;
    prenom?: string;
    adresse?: string;
    telephone?: number;
    commandes?: ICommande[];
}

export class Client implements IClient {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public adresse?: string,
        public telephone?: number,
        public commandes?: ICommande[]
    ) {}
}
