import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmionposComponent } from './emionpos.component';

describe('EmionposComponent', () => {
  let component: EmionposComponent;
  let fixture: ComponentFixture<EmionposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmionposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmionposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
