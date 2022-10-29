import { ComponentFixture, TestBed } from '@angular/core/testing';
// Import module
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { ProductCreateComponent } from './product-create.component';

describe('ProductCreateComponent', () => {
  let component: ProductCreateComponent;
  let fixture: ComponentFixture<ProductCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveFormsModule ]
    })
      .compileComponents();
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsModule ]
    })
      .compileComponents();
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

