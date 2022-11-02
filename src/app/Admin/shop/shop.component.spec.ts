import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ShopComponents} from "./shop.component";


describe('TestComponent', () => {
  let component: ShopComponents;
  let fixture: ComponentFixture<ShopComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopComponents ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
