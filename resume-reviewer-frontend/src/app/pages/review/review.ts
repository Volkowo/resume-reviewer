import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-review',
  styleUrl: './review.css',
  templateUrl: './review.html',
})
export class Review implements OnInit {
  jobDesc: string = '';

  ngOnInit() {
    this.jobDesc = '';
  }

  submit() {
    if(this.jobDesc.trim()){
      console.log('Submit button clicked');
      console.log('Job Description:', this.jobDesc);
    } else {
      alert('Please enter a job description before submitting.');
    }
  }
}
