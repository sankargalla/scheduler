import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display "Thank you!" message after form submission', () => {
    // Ensure initially thankYouMessage is false
    expect(component.isThankYouMessageVisible()).toBeFalse();

    // Simulate form submission
    component.onSubmit();
    fixture.detectChanges();

    // Check if "Thank you!" message is displayed
    expect(component.isThankYouMessageVisible()).toBeTrue();

    // Optionally, you can also check the DOM directly
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Thank you!');
  });
});
