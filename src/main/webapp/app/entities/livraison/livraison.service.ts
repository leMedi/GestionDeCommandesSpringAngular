import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILivraison } from 'app/shared/model/livraison.model';

type EntityResponseType = HttpResponse<ILivraison>;
type EntityArrayResponseType = HttpResponse<ILivraison[]>;

@Injectable({ providedIn: 'root' })
export class LivraisonService {
    public resourceUrl = SERVER_API_URL + 'api/livraisons';

    constructor(protected http: HttpClient) {}

    create(livraison: ILivraison): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(livraison);
        return this.http
            .post<ILivraison>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(livraison: ILivraison): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(livraison);
        return this.http
            .put<ILivraison>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ILivraison>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ILivraison[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(livraison: ILivraison): ILivraison {
        const copy: ILivraison = Object.assign({}, livraison, {
            date: livraison.date != null && livraison.date.isValid() ? livraison.date.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.date = res.body.date != null ? moment(res.body.date) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((livraison: ILivraison) => {
                livraison.date = livraison.date != null ? moment(livraison.date) : null;
            });
        }
        return res;
    }
}
