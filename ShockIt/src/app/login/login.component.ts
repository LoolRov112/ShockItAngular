import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoggedIn: boolean = false;
  loginForm!: FormGroup;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      mail: ['', [Validators.compose([Validators.required, Validators.email])]],
      pass: ['', [Validators.required]],
    });
  }

  onLogin() {
    let user = this.usersService.login(
      this.loginForm.value.mail,
      this.loginForm.value.pass
    );
    if (user == null) alert('Wrong email or password');
    else {
      this.isLoggedIn = true;
      alert('You Welcome');
      this.router.navigateByUrl('profile/userDetails');
    }
  }
}
