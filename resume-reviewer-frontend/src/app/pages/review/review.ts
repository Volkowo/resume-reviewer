import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  imports: [FormsModule, MarkdownComponent],
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
  feedback = signal('');
  loading = signal(false);
  error = signal('');
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
    if (this.loading()) {return;} // Prevent multiple submissions while loading

    if(this.jobDesc.trim() && this.resume.trim() ) {
      this.loading.set(true);
      this.feedback.set('');
      this.error.set('');

      const jobDesc = this.jobDesc;
      const resume = this.resume;

      this.http.post('http://localhost:3000/api/review', { jobDesc, resume }).subscribe({
        next: (res: any) => {
          this.submittedJobDesc.set(jobDesc);
          this.submittedResume.set(resume);

          this.submitted.set(true);
          this.feedback.set(res.feedback);
          this.loading.set(false);
          this.jobDesc = '';
          this.resume = '';
        }, 
        error: (err) => {
          this.loading.set(false);
          this.error.set(err.error?.message || 'An error occurred while submitting the review. Please try again.'  );
        }
      });
      // anything here runs first before the http.post() call is completed.
    } else {
      this.submitted.set(false);
      this.loading.set(false);
      this.error.set('Please enter both a job description and a resume before submitting.');
    }

  }
}
