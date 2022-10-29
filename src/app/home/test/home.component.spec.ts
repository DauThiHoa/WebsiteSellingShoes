import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HomeComponents} from "./home.component";


describe('TestComponent', () => {
  let component: HomeComponents;
  let fixture: ComponentFixture<HomeComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponents ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
