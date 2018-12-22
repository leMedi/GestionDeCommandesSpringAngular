import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ILivraison } from 'app/shared/model/livraison.model';
import { LivraisonService } from './livraison.service';
import { ICommande } from 'app/shared/model/commande.model';
import { CommandeService } from 'app/entities/commande';

@Component({
    selector: 'jhi-livraison-update',
    templateUrl: './livraison-update.component.html'
})
export class LivraisonUpdateComponent implements OnInit {
    livraison: ILivraison;
    isSaving: boolean;

    commandes: ICommande[];
    date: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected livraisonService: LivraisonService,
        protected commandeService: CommandeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ livraison }) => {
            this.livraison = livraison;
            this.date = this.livraison.date != null ? this.livraison.date.format(DATE_TIME_FORMAT) : null;
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
        this.livraison.date = this.date != null ? moment(this.date, DATE_TIME_FORMAT) : null;
        if (this.livraison.id !== undefined) {
            this.subscribeToSaveResponse(this.livraisonService.update(this.livraison));
        } else {
            this.subscribeToSaveResponse(this.livraisonService.create(this.livraison));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILivraison>>) {
        result.subscribe((res: HttpResponse<ILivraison>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
