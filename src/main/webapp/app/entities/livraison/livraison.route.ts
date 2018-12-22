import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Livraison } from 'app/shared/model/livraison.model';
import { LivraisonService } from './livraison.service';
import { LivraisonComponent } from './livraison.component';
import { LivraisonDetailComponent } from './livraison-detail.component';
import { LivraisonUpdateComponent } from './livraison-update.component';
import { LivraisonDeletePopupComponent } from './livraison-delete-dialog.component';
import { ILivraison } from 'app/shared/model/livraison.model';

@Injectable({ providedIn: 'root' })
export class LivraisonResolve implements Resolve<ILivraison> {
    constructor(private service: LivraisonService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Livraison> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Livraison>) => response.ok),
                map((livraison: HttpResponse<Livraison>) => livraison.body)
            );
        }
        return of(new Livraison());
    }
}

export const livraisonRoute: Routes = [
    {
        path: 'livraison',
        component: LivraisonComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Livraisons'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'livraison/:id/view',
        component: LivraisonDetailComponent,
        resolve: {
            livraison: LivraisonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Livraisons'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'livraison/new',
        component: LivraisonUpdateComponent,
        resolve: {
            livraison: LivraisonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Livraisons'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'livraison/:id/edit',
        component: LivraisonUpdateComponent,
        resolve: {
            livraison: LivraisonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Livraisons'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const livraisonPopupRoute: Routes = [
    {
        path: 'livraison/:id/delete',
        component: LivraisonDeletePopupComponent,
        resolve: {
            livraison: LivraisonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Livraisons'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
