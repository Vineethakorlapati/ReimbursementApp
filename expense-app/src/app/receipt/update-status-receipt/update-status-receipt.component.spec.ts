import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatusReceiptComponent } from './update-status-receipt.component';

describe('UpdateStatusReceiptComponent', () => {
  let component: UpdateStatusReceiptComponent;
  let fixture: ComponentFixture<UpdateStatusReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStatusReceiptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStatusReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
