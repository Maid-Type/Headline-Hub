import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  userID: string | null = sessionStorage.getItem('userID');
  userName: string | null = sessionStorage.getItem('userName');
  userStatus:string | null = sessionStorage.getItem('is_admin');

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.userID = sessionStorage.getItem('userID');
        this.userName = sessionStorage.getItem('userName');
      }
    });
  }

  ngOnInit() {
    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  private handleStorageChange(event: StorageEvent) {
    if (event.key === 'userID') {
      this.userID = event.newValue;
    } else if (event.key === 'userName') {
      this.userName = event.newValue;
    }
  }

  // login(userID: string, userName: string): void {
  //   sessionStorage.setItem('userID', userID);
  //   sessionStorage.setItem('userName', userName);
  //   this.userID = userID;
  //   this.userName = userName;
  // }
  //

  logout(): void {
    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('is_admin');
    this.userID = null;
    this.userName = null;
    this.router.navigate(['/login']);
  }
}
