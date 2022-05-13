import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDetalheComponent } from './pet-detalhe.component';

describe('PetDetalheComponent', () => {
  let component: PetDetalheComponent;
  let fixture: ComponentFixture<PetDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
