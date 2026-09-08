import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [FormsModule],
  selector: 'app-review',
  styleUrl: './review.css',
  templateUrl: './review.html',
})
export class Review implements OnInit {
  jobDesc: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.jobDesc = '';
  }

  submit() {
    if(this.jobDesc.trim()){
      this.http.post('http://localhost:3000/api/review', { jobDesc: this.jobDesc }).subscribe(() => {
        console.log('Submit button clicked');
        console.log('Job Description:', this.jobDesc);
      })
    } else {
      alert('Please enter a job description before submitting.');
    }

  }
}
