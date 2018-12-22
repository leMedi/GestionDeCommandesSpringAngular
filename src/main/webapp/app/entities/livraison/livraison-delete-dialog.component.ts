import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILivraison } from 'app/shared/model/livraison.model';
import { LivraisonService } from './livraison.service';

@Component({
    selector: 'jhi-livraison-delete-dialog',
    templateUrl: './livraison-delete-dialog.component.html'
})
export class LivraisonDeleteDialogComponent {
    livraison: ILivraison;

    constructor(
        protected livraisonService: LivraisonService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.livraisonService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'livraisonListModification',
                content: 'Deleted an livraison'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-livraison-delete-popup',
    template: ''
})
export class LivraisonDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ livraison }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LivraisonDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.livraison = livraison;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
