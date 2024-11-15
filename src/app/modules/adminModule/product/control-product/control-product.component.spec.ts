import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlProductComponent } from './control-product.component';

describe('ControlProductComponent', () => {
  let component: ControlProductComponent;
  let fixture: ComponentFixture<ControlProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
