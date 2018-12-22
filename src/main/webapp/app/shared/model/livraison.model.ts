import { Moment } from 'moment';
import { ICommande } from 'app/shared/model//commande.model';

export interface ILivraison {
    id?: number;
    date?: Moment;
    commande?: ICommande;
}

export class Livraison implements ILivraison {
    constructor(public id?: number, public date?: Moment, public commande?: ICommande) {}
}
