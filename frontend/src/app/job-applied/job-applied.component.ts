import { Component, OnInit } from '@angular/core';
import { IApplication } from '../interfaces';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-job-applied',
  standalone: true,
  imports: [],
  templateUrl: './job-applied.component.html',
  styleUrl: './job-applied.component.scss'
})
export class JobAppliedComponent implements OnInit{

  constructor(private _http: HttpClient, private _route: ActivatedRoute, private _dataService: DataService, private _router: Router) {}
  application: IApplication ={
    applicationId: 0,
    resume: '',
    userId: 0,
    jobId: 0,
    slotId: 0,
    hallticket: '',
    job: {
      jobId: 0,
      jobName: '',
      fromTime: new Date,
      toTime: new Date,
      venue: '',
      thingsToRem: '',
      date: new Date
    },
    slot: {
      slotId: 0,
      fromTime: {
        hours: 0,
        minutes: 0
      },
      toTime: {
        hours: 0,
        minutes: 0
      }
    },
    applicationRoles: null
  };
  applicationId!: number;
  applicationdetails: string = '';

  ngOnInit(): void {
      let id! : string | null ;
      var href:string = this._router.url;
      var len:number = href.length;
      id = href.split('/')[4];
      // console.log(half_url);
      this._route.paramMap.subscribe(params => {
        // id = params.get('applicationId');
        console.log(params.get('applicationId'));
        if(id){
          this.applicationId = +id;
          console.log("application id", id);
          this._dataService.getApplication(this.applicationId).subscribe((data) => {
            this.application = data
            console.log(data.thingsToRem);
          })
        }
      });
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
    return formattedDateString;
  }

  convertTo12HourFormat(time24: Time): string {
    var timeString = time24.toString();
    timeString = timeString.substring(0, 5);
    return timeString;
  }
}
