import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { IJobs } from '../interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-listing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './job-listing.component.html',
  styleUrl: './job-listing.component.scss'
})
export class JobListingComponent implements OnInit {
  constructor(private dataService : DataService){ }
  jobs: IJobs[] = [];
  ngOnInit(): void {
    this.dataService.getJobsData().subscribe((resp: IJobs[])=>{
      this.jobs = resp;
    })
  }
}
