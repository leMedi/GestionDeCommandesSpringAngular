import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionDeCommandesSharedModule } from 'app/shared';
import {
    FactureComponent,
    FactureDetailComponent,
    FactureUpdateComponent,
    FactureDeletePopupComponent,
    FactureDeleteDialogComponent,
    factureRoute,
    facturePopupRoute
} from './';

const ENTITY_STATES = [...factureRoute, ...facturePopupRoute];

@NgModule({
    imports: [GestionDeCommandesSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FactureComponent,
        FactureDetailComponent,
        FactureUpdateComponent,
        FactureDeleteDialogComponent,
        FactureDeletePopupComponent
    ],
    entryComponents: [FactureComponent, FactureUpdateComponent, FactureDeleteDialogComponent, FactureDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionDeCommandesFactureModule {}
