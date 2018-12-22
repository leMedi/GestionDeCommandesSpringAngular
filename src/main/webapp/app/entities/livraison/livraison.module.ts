import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionDeCommandesSharedModule } from 'app/shared';
import {
    LivraisonComponent,
    LivraisonDetailComponent,
    LivraisonUpdateComponent,
    LivraisonDeletePopupComponent,
    LivraisonDeleteDialogComponent,
    livraisonRoute,
    livraisonPopupRoute
} from './';

const ENTITY_STATES = [...livraisonRoute, ...livraisonPopupRoute];

@NgModule({
    imports: [GestionDeCommandesSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LivraisonComponent,
        LivraisonDetailComponent,
        LivraisonUpdateComponent,
        LivraisonDeleteDialogComponent,
        LivraisonDeletePopupComponent
    ],
    entryComponents: [LivraisonComponent, LivraisonUpdateComponent, LivraisonDeleteDialogComponent, LivraisonDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionDeCommandesLivraisonModule {}
