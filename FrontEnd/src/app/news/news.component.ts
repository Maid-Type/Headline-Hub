import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  public userID: string = '';
  protected newsList: any[] = [];
  protected filteredNewsList: any[] = [];
  protected date: string = '';

  constructor(private router: Router) {}

  public async ngOnInit() {
    this.userID = sessionStorage.getItem('userID') || '';

    if (!this.userID) {
      await this.router.navigate(['/login']);
      alert('Please login first!');
    }

    try {
      const response = await fetch(`http://localhost/news?userID=${this.userID}&status=approved`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      this.newsList = await response.json();
      this.filteredNewsList = [...this.newsList];
      console.log(this.newsList);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }

  public filterByDate(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedDate = inputElement.value;

    this.date = selectedDate;

    if (selectedDate) {
      // Filter by date part (YYYY-MM-DD), ensuring created_at is not null or undefined
      this.filteredNewsList = this.newsList.filter(news => {
        const newsDate = news.created_at ? news.created_at.split('T')[0] : ''; // Extract the date part (YYYY-MM-DD)
        return newsDate === selectedDate; // Compare with the selected date
      });
    } else {
      this.filteredNewsList = [...this.newsList];
    }
  }

}
