import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IFacture } from 'app/shared/model/facture.model';
import { FactureService } from './facture.service';
import { ICommande } from 'app/shared/model/commande.model';
import { CommandeService } from 'app/entities/commande';

@Component({
    selector: 'jhi-facture-update',
    templateUrl: './facture-update.component.html'
})
export class FactureUpdateComponent implements OnInit {
    facture: IFacture;
    isSaving: boolean;

    commandes: ICommande[];
    date: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected factureService: FactureService,
        protected commandeService: CommandeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ facture }) => {
            this.facture = facture;
            this.date = this.facture.date != null ? this.facture.date.format(DATE_TIME_FORMAT) : null;
        });
        this.commandeService.query().subscribe(
            (res: HttpResponse<ICommande[]>) => {
                this.commandes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.facture.date = this.date != null ? moment(this.date, DATE_TIME_FORMAT) : null;
        if (this.facture.id !== undefined) {
            this.subscribeToSaveResponse(this.factureService.update(this.facture));
        } else {
            this.subscribeToSaveResponse(this.factureService.create(this.facture));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacture>>) {
        result.subscribe((res: HttpResponse<IFacture>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCommandeById(index: number, item: ICommande) {
        return item.id;
    }
}
