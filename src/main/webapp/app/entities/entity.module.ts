import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GestionDeCommandesClientModule } from './client/client.module';
import { GestionDeCommandesCommandeModule } from './commande/commande.module';
import { GestionDeCommandesProduitModule } from './produit/produit.module';
import { GestionDeCommandesFactureModule } from './facture/facture.module';
import { GestionDeCommandesLivraisonModule } from './livraison/livraison.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        GestionDeCommandesClientModule,
        GestionDeCommandesCommandeModule,
        GestionDeCommandesProduitModule,
        GestionDeCommandesFactureModule,
        GestionDeCommandesLivraisonModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionDeCommandesEntityModule {}
