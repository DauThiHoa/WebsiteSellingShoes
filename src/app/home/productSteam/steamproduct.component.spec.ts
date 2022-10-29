import { ComponentFixture, TestBed } from '@angular/core/testing';
import {SteamProductComponents} from "./steamproduct.component";


describe('ListProductComponent', () => {
  let component: SteamProductComponents;
  let fixture: ComponentFixture<SteamProductComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteamProductComponents ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SteamProductComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
