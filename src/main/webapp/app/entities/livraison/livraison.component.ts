import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILivraison } from 'app/shared/model/livraison.model';
import { AccountService } from 'app/core';
import { LivraisonService } from './livraison.service';

@Component({
    selector: 'jhi-livraison',
    templateUrl: './livraison.component.html'
})
export class LivraisonComponent implements OnInit, OnDestroy {
    livraisons: ILivraison[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected livraisonService: LivraisonService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.livraisonService.query().subscribe(
            (res: HttpResponse<ILivraison[]>) => {
                this.livraisons = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLivraisons();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILivraison) {
        return item.id;
    }

    registerChangeInLivraisons() {
        this.eventSubscriber = this.eventManager.subscribe('livraisonListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
