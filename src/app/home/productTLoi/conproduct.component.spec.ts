import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ConProductComponents} from "./conproduct.component";


describe('ListProductComponent', () => {
  let component: ConProductComponents;
  let fixture: ComponentFixture<ConProductComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConProductComponents ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConProductComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
