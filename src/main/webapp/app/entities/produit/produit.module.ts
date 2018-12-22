import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionDeCommandesSharedModule } from 'app/shared';
import {
    ProduitComponent,
    ProduitDetailComponent,
    ProduitUpdateComponent,
    ProduitDeletePopupComponent,
    ProduitDeleteDialogComponent,
    produitRoute,
    produitPopupRoute
} from './';

const ENTITY_STATES = [...produitRoute, ...produitPopupRoute];

@NgModule({
    imports: [GestionDeCommandesSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProduitComponent,
        ProduitDetailComponent,
        ProduitUpdateComponent,
        ProduitDeleteDialogComponent,
        ProduitDeletePopupComponent
    ],
    entryComponents: [ProduitComponent, ProduitUpdateComponent, ProduitDeleteDialogComponent, ProduitDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionDeCommandesProduitModule {}
