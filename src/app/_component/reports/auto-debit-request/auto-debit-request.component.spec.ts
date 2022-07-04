import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoDebitRequestComponent } from './auto-debit-request.component';

describe('AutoDebitRequestComponent', () => {
  let component: AutoDebitRequestComponent;
  let fixture: ComponentFixture<AutoDebitRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoDebitRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoDebitRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
