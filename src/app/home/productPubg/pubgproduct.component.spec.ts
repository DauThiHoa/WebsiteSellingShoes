import { ComponentFixture, TestBed } from '@angular/core/testing';
import {PubgProductComponents} from "./pubgproduct.component";


describe('ListProductComponent', () => {
  let component: PubgProductComponents;
  let fixture: ComponentFixture<PubgProductComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubgProductComponents ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubgProductComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
