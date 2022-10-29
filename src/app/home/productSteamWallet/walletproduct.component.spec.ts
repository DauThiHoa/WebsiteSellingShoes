import { ComponentFixture, TestBed } from '@angular/core/testing';
import {WalletProductComponents} from "./walletproduct.component";


describe('ListProductComponent', () => {
  let component: WalletProductComponents;
  let fixture: ComponentFixture<WalletProductComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletProductComponents ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletProductComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
