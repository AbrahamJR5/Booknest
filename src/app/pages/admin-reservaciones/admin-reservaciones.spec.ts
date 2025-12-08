import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReservaciones } from './admin-reservaciones';

describe('AdminReservaciones', () => {
  let component: AdminReservaciones;
  let fixture: ComponentFixture<AdminReservaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReservaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReservaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
