import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { BrandingComponent } from '../../../layouts/full/vertical/sidebar/branding.component';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, BrandingComponent],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  
  options = this.settings.getOptions();
  private http = inject(HttpClient);

  constructor(private settings: CoreService, private router: Router,private auth: AuthService,) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  /*submit() {
    // console.log(this.form.value);
    this.router.navigate(['/dashboards/dashboard1']);
  }*/

  submit() {
    if (this.form.invalid) return;
    
    const { email, password } = this.form.value;

    this.auth.login(email!, password!).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboards/dashboard1']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Credenciales incorrectas o error del servidor');
      },
    });
  }


}
