import { ComponentFixture, TestBed } from '@angular/core/testing';
import {EmailComponents} from "./email.component";


describe('TestComponent', () => {
  let component: EmailComponents;
  let fixture: ComponentFixture<EmailComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailComponents ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
