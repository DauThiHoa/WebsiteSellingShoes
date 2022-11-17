import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HistoryComponents} from "./history.component";


describe('TestComponent', () => {
  let component: HistoryComponents;
  let fixture: ComponentFixture<HistoryComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryComponents ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
