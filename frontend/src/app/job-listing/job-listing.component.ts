import { Component } from '@angular/core';
import { IJob } from '../interfaces';
import { DataService } from '../services/data.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-listing',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './job-listing.component.html',
  styleUrl: './job-listing.component.scss'
})
export class JobListingComponent {
  constructor(private dataService : DataService){ }
  jobs: IJob[] = [];
  ngOnInit(): void {
    this.dataService.getJobsData().subscribe((resp: IJob[])=>{
      this.jobs = resp;
    })
  }
  formatdate(date: Date): string {
    const originalDate = new Date(date);
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const day = originalDate.getDate();
    const month = monthNames[originalDate.getMonth()];
    const year = originalDate.getFullYear();
    const formattedDateString = `${day}-${month}-${year}`;
    // console.log(formattedDateString);
    return formattedDateString;
  }
}
