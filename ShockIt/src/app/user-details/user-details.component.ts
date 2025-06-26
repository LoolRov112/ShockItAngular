import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { json } from 'node:stream/consumers';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent {
  selectedImg: any = null;

  constructor(private usersService: UsersService, private router: Router) {}

  userDetails = {
    name: sessionStorage.getItem('name'),
    birthDate: sessionStorage.getItem('birthDate'),
    mail: sessionStorage.getItem('mail'),
    gender: sessionStorage.getItem('gender'),
    img: sessionStorage.getItem('img'),
  };

  onFileSelected(event: any) {
    let file = event.target.files[0];
    if (file) {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        let newImage = e.target.result;
        if (newImage) {
          sessionStorage.setItem('img', newImage);
          this.userDetails.img = e.target.result;
          this.usersService.setImg(this.userDetails.img);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  deleteProfile() {
    const mail = sessionStorage.getItem('mail');
    if (mail) {
      this.usersService.deleteAcount(mail).subscribe(() => {
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('mail');
        sessionStorage.removeItem('birthDate');
        sessionStorage.removeItem('gender');
        sessionStorage.removeItem('img');
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('admin');
        this.router.navigateByUrl('/').then(() => {
          window.location.reload();
        });
      });
    } else {
      console.log('No mail found in sessionStorage.');
    }
  }
}
