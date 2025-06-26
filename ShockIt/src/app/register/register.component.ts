import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  signUpForm!: FormGroup;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.signUpForm = fb.group({
      name: ['', [Validators.required]],
      mail: ['', [Validators.compose([Validators.required, Validators.email])]],
      pass: ['', [Validators.required]],
      reapetPass: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }

  onRegister() {
    if (this.signUpForm.value.reapetPass === this.signUpForm.value.pass) {
      let user = this.usersService.register(
        this.signUpForm.value.name,
        this.signUpForm.value.mail,
        this.signUpForm.value.birthDate,
        this.signUpForm.value.gender,
        this.signUpForm.value.pass
      );
      if (!user) alert('user already exists');
      alert('Welcome To Our Site');
      this.router.navigateByUrl('profile');
    } else {
      alert('Passwords not equals');
    }
  }
}
