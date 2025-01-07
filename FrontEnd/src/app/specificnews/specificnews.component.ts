import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-specificnews',
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './specificnews.component.html',
  styleUrl: './specificnews.component.css'
})
export class SpecificnewsComponent implements OnInit {
  newsId: string | null = null;
  userID:string | null = null;
  news: any = {};

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    this.newsId = this.route.snapshot.paramMap.get('id');
    this.userID = sessionStorage.getItem('userID') || '';

    if (!this.userID) {
      await this.router.navigate(['/login']);
      alert('Please login first!');
    }

    try {
      const response = await fetch(`http://localhost/news/${this.newsId}?userID=${this.userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      this.news = await response.json();
      console.log(this.news);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }

  goBack(): void {
    window.history.back();
  }
}
