import { NgModule } from '@angular/core';

import { GestionDeCommandesSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [GestionDeCommandesSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [GestionDeCommandesSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class GestionDeCommandesSharedCommonModule {}
