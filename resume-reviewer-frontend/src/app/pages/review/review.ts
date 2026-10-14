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

  sampleJobDesc: string = `
  Junior Software Developer — Harbour Digital
  We are seeking a junior developer to help build and maintain web applications.

  Requirements:
  1. Experience developing applications using TypeScript.
  2. Experience building user interfaces using Angular.
  3. Ability to collaborate with other developers.
  4. Ability to write automated software tests.
  5. Experience working with PostgreSQL.
  6. An AWS Certified Cloud Practitioner certification.
  `;

  sampleResume: string = `
  Alex Morgan
  Junior Software Developer

  SUMMARY
  Recent Bachelor of Information Technology graduate with experience
  building web applications through university projects.

  EDUCATION
  Bachelor of Information Technology
  Example University, completed November 2025.

  PROJECTS

  Campus Event Manager
  February 2025 - June 2025
  - Developed an event registration application using TypeScript.
  - Built event listing pages and registration forms using Angular.
  - Worked with three other developers, reviewed their pull requests,
    and coordinated changes through weekly planning meetings.
  - Manually checked registration forms using valid and invalid inputs
    and recorded defects for the team to resolve.

  Community Library Database
  July 2025 - September 2025
  - Designed a MySQL database for books, members, and loans.
  - Wrote SQL queries using joins and aggregate functions.

  CERTIFICATIONS
  None.
  `;

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

    /*
      1. Put const jobDesc and resume BACK inside the if statement once done testing.
      2. Change jobDesc && resume inside if statement back to this.jobDesc && this.resume once done testing.
    */
    const jobDesc = this.sampleJobDesc.trim();
    const resume = this.sampleResume.trim();

    if(jobDesc && resume ) {
      this.loading.set(true);
      this.feedback.set('');
      this.error.set('');

      this.http.post('http://localhost:3000/api/review', { jobDesc, resume }).subscribe({
        next: (res: any) => {
          const feedback = JSON.stringify(res.feedback, null, 2); // Pretty-print the feedback JSON
          this.submittedJobDesc.set(jobDesc);
          this.submittedResume.set(resume);

          this.submitted.set(true);
          this.feedback.set(feedback);
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
