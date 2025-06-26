import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  [x: string]: any;
  url: string = 'http://localhost:3000/users';
  headers = { 'content-type': 'application/json' };
  users: User[] = [];

  constructor(private http: HttpClient) {
    this.refresh();
  }

  refresh() {
    this.initUsers().subscribe((data) => (this.users = data));
  }

  initUsers(): Observable<any> {
    return this.http.get(this.url);
  }

  login(email: string, pass: string): User | null {
    for (let user of this.users) {
      if (user.mail == email && user.password == pass) {
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('name', user.name);
        sessionStorage.setItem('mail', user.mail);
        sessionStorage.setItem('gender', user.gender);
        sessionStorage.setItem('img', user.image);
        sessionStorage.setItem('birthDate', user.birthDate);
        sessionStorage.setItem('admin', JSON.stringify(user.isAdmin));
        return user;
      }
    }
    return null;
  }
  // service
  insert(user: User) {
    let body = JSON.stringify(user);
    return this.http.post(`${this.url}/register`, body, {
      headers: this.headers,
    });
  }

  // client
  register(
    name: string,
    email: string,
    birthDate: string,
    gender: string,
    pass: string
  ) {
    for (let user of this.users) if (user.mail == email) return false;
    let user: User = new User(name, email, birthDate, gender, pass);
    this.users.push(user);
    this.insert(user).subscribe(() => this.refresh());
    return true;
  }

  setImg(image: string | any) {
    for (let user of this.users) {
      if (user.name == sessionStorage.getItem('name')) this.setImg(image);
    }
  }

  deleteAcount(email: string) {
    return this.http.delete(`${this.url}/deleteUser/${email}`, {
      headers: this.headers,
    });
  }
}
