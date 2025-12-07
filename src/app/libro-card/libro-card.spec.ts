import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroCard } from './libro-card';

describe('LibroCard', () => {
  let component: LibroCard;
  let fixture: ComponentFixture<LibroCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibroCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibroCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
