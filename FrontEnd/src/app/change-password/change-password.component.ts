import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-change-password',
    imports: [
        FormsModule,
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  protected errors:string[] = [];
  protected email:string = '';
  protected oldpassword:string = '';
  protected newpassword:string = '';

  public constructor(private router: Router) {
  }

  public async changePassword() {
    this.errors = [];

    if (!this.email || !this.validateEmail(this.email)) {
      this.errors.push("A valid email is required.");
    }

    if (!this.oldpassword || this.oldpassword.length < 6 || !this.newpassword || this.newpassword.length < 6) {
      this.errors.push("Password must be at least 6 characters long.");
    }

    if (this.oldpassword === this.newpassword) {
      this.errors.push("New password must be different from old password.");
    }

    if (this.errors.length > 0) {
      console.error("Validation errors:", this.errors);
      return;
    }

    try {
      const res = await fetch('http://localhost/changePassword', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email,
          password: this.oldpassword,
          newPassword: this.newpassword
        }),
      });

      const data = await res.json();

      console.log(data);
      console.log(this.oldpassword);
      console.log(this.newpassword);

      if (data.errors?.length > 0) {
        this.errors.push(...data.errors);
        return;
      }

      alert("Password changed successfully!");
      await this.router.navigate(['/home']);
    } catch (e: any) {
      this.errors.push(e.message);
      console.error("Login error:", e.message);
    }
  }

  private validateEmail = (email:string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
}
