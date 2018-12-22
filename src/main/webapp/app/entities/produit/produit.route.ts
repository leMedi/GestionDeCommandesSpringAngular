import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Produit } from 'app/shared/model/produit.model';
import { ProduitService } from './produit.service';
import { ProduitComponent } from './produit.component';
import { ProduitDetailComponent } from './produit-detail.component';
import { ProduitUpdateComponent } from './produit-update.component';
import { ProduitDeletePopupComponent } from './produit-delete-dialog.component';
import { IProduit } from 'app/shared/model/produit.model';

@Injectable({ providedIn: 'root' })
export class ProduitResolve implements Resolve<IProduit> {
    constructor(private service: ProduitService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Produit> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Produit>) => response.ok),
                map((produit: HttpResponse<Produit>) => produit.body)
            );
        }
        return of(new Produit());
    }
}

export const produitRoute: Routes = [
    {
        path: 'produit',
        component: ProduitComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Produits'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'produit/:id/view',
        component: ProduitDetailComponent,
        resolve: {
            produit: ProduitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Produits'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'produit/new',
        component: ProduitUpdateComponent,
        resolve: {
            produit: ProduitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Produits'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'produit/:id/edit',
        component: ProduitUpdateComponent,
        resolve: {
            produit: ProduitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Produits'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const produitPopupRoute: Routes = [
    {
        path: 'produit/:id/delete',
        component: ProduitDeletePopupComponent,
        resolve: {
            produit: ProduitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Produits'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
