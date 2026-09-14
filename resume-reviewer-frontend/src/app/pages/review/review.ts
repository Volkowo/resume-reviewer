import { Component, OnInit, signal } from '@angular/core';
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
  submittedJobDesc = signal('');
  submittedResume = signal('');
  test = signal('');
  submitted = signal(false);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.resetInput();
  }

  // Look into this again and about the way to reset the input fields etc etc
  resetInput(){
    this.jobDesc = '';
    this.resume = '';
    this.submitted.set(false);
    this.submittedJobDesc.set('');
    this.submittedResume.set('');
    this.test.set('');
  }

  submit() {
    console.log('Submit button clicked');
    console.log('Job Description:', this.jobDesc);
    console.log('Resume:', this.resume);
    if(this.jobDesc.trim() && this.resume.trim()) {
      this.http.post('http://localhost:3000/api/review', { jobDesc: this.jobDesc, resume: this.resume }).subscribe((res: any) => {
        this.test.set(res.message);
        this.submittedJobDesc.set(this.jobDesc);
        this.submittedResume.set(this.resume);
        this.submitted.set(true);
      });
      this.resetInput();
    } else {
      this.submitted.set(false);
      alert('Please enter both a job description and a resume before submitting.');
    }

  }
}
