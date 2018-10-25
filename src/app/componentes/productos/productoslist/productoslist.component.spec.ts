import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoslistComponent } from './productoslist.component';

describe('ProductoslistComponent', () => {
  let component: ProductoslistComponent;
  let fixture: ComponentFixture<ProductoslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
