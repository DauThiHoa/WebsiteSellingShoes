import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleComponent } from './google.component';

describe('GoogleComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        GoogleComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(GoogleComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Codingvila_Login_With_Google'`, () => {
    const fixture = TestBed.createComponent(GoogleComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Codingvila_Login_With_Google');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(GoogleComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('Codingvila_Login_With_Google app is running!');
  });
});
