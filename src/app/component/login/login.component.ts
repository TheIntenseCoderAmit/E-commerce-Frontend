import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  backgroundImgPath: string = "./assets/Login-Background.jpg";
  formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  authService = inject(AuthService);
router=inject(Router);
  login() {

    this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!).subscribe((result:any) => {
localStorage.setItem('token', result.token);
localStorage.setItem('user',JSON.stringify( result.user));
this.router.navigateByUrl('/');
    })
  }
}
