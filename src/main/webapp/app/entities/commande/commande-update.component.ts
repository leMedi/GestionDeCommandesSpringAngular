import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ICommande } from 'app/shared/model/commande.model';
import { CommandeService } from './commande.service';
import { IProduit } from 'app/shared/model/produit.model';
import { ProduitService } from 'app/entities/produit';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client';

@Component({
    selector: 'jhi-commande-update',
    templateUrl: './commande-update.component.html'
})
export class CommandeUpdateComponent implements OnInit {
    commande: ICommande;
    isSaving: boolean;

    produits: IProduit[];

    clients: IClient[];
    date: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected commandeService: CommandeService,
        protected produitService: ProduitService,
        protected clientService: ClientService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ commande }) => {
            this.commande = commande;
            this.date = this.commande.date != null ? this.commande.date.format(DATE_TIME_FORMAT) : null;
        });
        this.produitService.query().subscribe(
            (res: HttpResponse<IProduit[]>) => {
                this.produits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.clientService.query().subscribe(
            (res: HttpResponse<IClient[]>) => {
                this.clients = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.commande.date = this.date != null ? moment(this.date, DATE_TIME_FORMAT) : null;
        if (this.commande.id !== undefined) {
            this.subscribeToSaveResponse(this.commandeService.update(this.commande));
        } else {
            this.subscribeToSaveResponse(this.commandeService.create(this.commande));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommande>>) {
        result.subscribe((res: HttpResponse<ICommande>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProduitById(index: number, item: IProduit) {
        return item.id;
    }

    trackClientById(index: number, item: IClient) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
