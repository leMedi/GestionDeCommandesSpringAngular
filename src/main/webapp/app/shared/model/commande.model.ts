import { Moment } from 'moment';
import { IFacture } from 'app/shared/model//facture.model';
import { ILivraison } from 'app/shared/model//livraison.model';
import { IProduit } from 'app/shared/model//produit.model';
import { IClient } from 'app/shared/model//client.model';

export interface ICommande {
    id?: number;
    date?: Moment;
    factures?: IFacture[];
    livraisons?: ILivraison[];
    produits?: IProduit[];
    client?: IClient;
}

export class Commande implements ICommande {
    constructor(
        public id?: number,
        public date?: Moment,
        public factures?: IFacture[],
        public livraisons?: ILivraison[],
        public produits?: IProduit[],
        public client?: IClient
    ) {}
}
