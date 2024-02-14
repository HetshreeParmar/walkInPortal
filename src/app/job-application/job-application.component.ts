import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { IJobs } from '../interfaces';

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [],
  templateUrl: './job-application.component.html',
  styleUrl: './job-application.component.scss'
})
export class JobApplicationComponent implements OnInit {
  job!: IJobs | null;
  constructor(private _route: ActivatedRoute, private _dataService: DataService) { }
  ngOnInit(): void {
    let id = +this._route.snapshot.paramMap.get('id')!;
    this._dataService.getOneJobData(id).subscribe((resp : IJobs | null) => {
      this.job = resp;
    })
  }
}
