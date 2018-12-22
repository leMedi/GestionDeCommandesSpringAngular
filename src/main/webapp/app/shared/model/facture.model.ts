import { Moment } from 'moment';
import { ICommande } from 'app/shared/model//commande.model';

export interface IFacture {
    id?: number;
    date?: Moment;
    montant?: number;
    commande?: ICommande;
}

export class Facture implements IFacture {
    constructor(public id?: number, public date?: Moment, public montant?: number, public commande?: ICommande) {}
}
