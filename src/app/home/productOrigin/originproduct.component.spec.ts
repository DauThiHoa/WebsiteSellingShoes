import { ComponentFixture, TestBed } from '@angular/core/testing';
import {OriginProductComponents} from "./originproduct.component";


describe('ListProductComponent', () => {
  let component: OriginProductComponents;
  let fixture: ComponentFixture<OriginProductComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OriginProductComponents ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginProductComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
