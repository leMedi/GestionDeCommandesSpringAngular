import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IProduit } from 'app/shared/model/produit.model';
import { ProduitService } from './produit.service';
import { ICommande } from 'app/shared/model/commande.model';
import { CommandeService } from 'app/entities/commande';

@Component({
    selector: 'jhi-produit-update',
    templateUrl: './produit-update.component.html'
})
export class ProduitUpdateComponent implements OnInit {
    produit: IProduit;
    isSaving: boolean;

    commandes: ICommande[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected produitService: ProduitService,
        protected commandeService: CommandeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ produit }) => {
            this.produit = produit;
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
        if (this.produit.id !== undefined) {
            this.subscribeToSaveResponse(this.produitService.update(this.produit));
        } else {
            this.subscribeToSaveResponse(this.produitService.create(this.produit));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduit>>) {
        result.subscribe((res: HttpResponse<IProduit>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
