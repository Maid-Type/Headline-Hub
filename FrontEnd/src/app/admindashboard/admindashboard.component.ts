import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  imports: [
    RouterLink,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./admindashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  protected newsPosts: {
    author_id: number;
    author_name: string;
    category: string;
    content: string;
    created_at: string;
    image_url: null;
    news_title: string;
    post_ID: number;
    status: string;
  }[] = [];
  protected userID: string = '';
  protected userStatus: string = '';

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  public async ngOnInit() {
    this.userID = sessionStorage.getItem('userID') || '';
    this.userStatus = sessionStorage.getItem('is_admin') || '';

    if (!this.userID) {
      await this.router.navigate(['/login']);
      alert('Please login first!');
      return;
    }

    if (this.userStatus !== "1") {
      await this.router.navigate(['/home']);
      alert('You are not an admin!');
      return;
    }

    try {
      const response = await fetch(`http://localhost/news?userID=${this.userID}&status=pending`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (Array.isArray(responseData) && responseData.length === 0) {
        this.newsPosts = [];
      } else if (typeof responseData === 'string' && responseData === 'No news found!') {
        this.newsPosts = [];
      } else {
        this.newsPosts = responseData;
      }

    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }


  async approvePost(postId: number) {
    this.userID = sessionStorage.getItem('userID') || '';

    try {
      const response = await fetch(`http://localhost/news/approve/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: this.userID,
          status: 'approved'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      this.newsPosts = this.newsPosts.map(post =>
        post.post_ID === postId ? { ...post, status: 'approved' } : post
      );

      this.cdr.detectChanges();

      console.log(this.newsPosts);
      alert('Post approved successfully!');
    } catch (error) {
      console.error('Error approving post:', error);
      alert('An error occurred while approving the post. Please try again later.');
    }
  }

  async rejectPost(postId: number) {
    this.userID = sessionStorage.getItem('userID') || '';

    try {
      const response = await fetch(`http://localhost/news/approve/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: this.userID,
          status: 'rejected'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      this.newsPosts = this.newsPosts.map(post =>
        post.post_ID === postId ? { ...post, status: 'rejected' } : post
      );

      this.cdr.detectChanges();

      console.log(this.newsPosts);
      alert('Post approved successfully!');
    } catch (error) {
      console.error('Error approving post:', error);
      alert('An error occurred while approving the post. Please try again later.');
    }
  }
}
