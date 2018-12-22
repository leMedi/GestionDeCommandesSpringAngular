/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionDeCommandesTestModule } from '../../../test.module';
import { LivraisonUpdateComponent } from 'app/entities/livraison/livraison-update.component';
import { LivraisonService } from 'app/entities/livraison/livraison.service';
import { Livraison } from 'app/shared/model/livraison.model';

describe('Component Tests', () => {
    describe('Livraison Management Update Component', () => {
        let comp: LivraisonUpdateComponent;
        let fixture: ComponentFixture<LivraisonUpdateComponent>;
        let service: LivraisonService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionDeCommandesTestModule],
                declarations: [LivraisonUpdateComponent]
            })
                .overrideTemplate(LivraisonUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LivraisonUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LivraisonService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Livraison(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.livraison = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Livraison();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.livraison = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
