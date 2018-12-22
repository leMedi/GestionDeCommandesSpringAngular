/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionDeCommandesTestModule } from '../../../test.module';
import { LivraisonComponent } from 'app/entities/livraison/livraison.component';
import { LivraisonService } from 'app/entities/livraison/livraison.service';
import { Livraison } from 'app/shared/model/livraison.model';

describe('Component Tests', () => {
    describe('Livraison Management Component', () => {
        let comp: LivraisonComponent;
        let fixture: ComponentFixture<LivraisonComponent>;
        let service: LivraisonService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionDeCommandesTestModule],
                declarations: [LivraisonComponent],
                providers: []
            })
                .overrideTemplate(LivraisonComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LivraisonComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LivraisonService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Livraison(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.livraisons[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
