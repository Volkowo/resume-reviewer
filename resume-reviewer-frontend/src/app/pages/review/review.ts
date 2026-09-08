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
  resume: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.jobDesc = '';
    this.resume = '';
  }

  resetInput(){
    this.jobDesc = '';
    this.resume = '';
  }

  submit() {
    console.log('Submit button clicked');
    console.log('Job Description:', this.jobDesc);
    console.log('Resume:', this.resume);
    if(this.jobDesc.trim() && this.resume.trim()) {
      this.http.post('http://localhost:3000/api/review', { jobDesc: this.jobDesc, resume: this.resume }).subscribe(() => {
      })
      this.resetInput();
    } else {
      alert('Please enter both a job description and a resume before submitting.');
    }

  }
}
