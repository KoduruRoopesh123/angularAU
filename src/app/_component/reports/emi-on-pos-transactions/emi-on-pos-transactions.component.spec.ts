import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiOnPosTransactionsComponent } from './emi-on-pos-transactions.component';

describe('EmiOnPosTransactionsComponent', () => {
  let component: EmiOnPosTransactionsComponent;
  let fixture: ComponentFixture<EmiOnPosTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmiOnPosTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmiOnPosTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
