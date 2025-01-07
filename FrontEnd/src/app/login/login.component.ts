import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  protected username: string = '';
  protected email: string = '';
  protected password: string = '';
  protected user: any = null;
  protected errors: string[] = [];

  public constructor(private router: Router) {
    const userID = sessionStorage.getItem('userID');

    if (userID) {
      this.router.navigate(['/home']);
      alert('You are already logged in!');
      return;
    }
  }

  public async login() {
    this.errors = [];

    if (!this.username || this.username.trim().length === 0) {
      this.errors.push("Username is required.");
    }

    if (!this.email || !this.validateEmail(this.email)) {
      this.errors.push("A valid email is required.");
    }

    if (!this.password || this.password.length < 6) {
      this.errors.push("Password must be at least 6 characters long.");
    }

    if (this.errors.length > 0) {
      console.error("Validation errors:", this.errors);
      return;
    }

    try {
      const res = await fetch('http://localhost/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.username,
          email: this.email,
          password: this.password,
        }),
      });

      this.user = await res.json();

      if (this.user.errors?.length > 0) {
        this.errors.push(...this.user.errors);
        return;
      }

      sessionStorage.setItem('userID', JSON.stringify(this.user[0].ID));
      sessionStorage.setItem('userName', JSON.stringify(this.user[0].korisnicko_ime));
      sessionStorage.setItem('is_admin', JSON.stringify(this.user[0].is_admin));
      console.log(sessionStorage);
      alert("Login successful!");
      this.router.navigate(['/home']);
    } catch (e: any) {
      this.errors.push(e.message);
      console.error("Login error:", e.message);
    }
  }

  private validateEmail = (email:string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
}
