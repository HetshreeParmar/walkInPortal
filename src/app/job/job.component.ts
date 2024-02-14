import { CommonModule } from '@angular/common';
import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IJobs } from '../interfaces';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobApplicationComponent } from '../job-application/job-application.component';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [CommonModule, FormsModule, JobApplicationComponent],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent implements OnInit, AfterContentChecked {
  job!: IJobs | null;
  jobRolesDrop: boolean[] = [];
  isPreRequisitesApplicationClose: boolean = true;

  isAppliedInJob: boolean = false;

  anyValue: any;

  applyInJob: any = {
    timeSlot: '',
    preference: [],
  };
  constructor(private _route: ActivatedRoute ,private _dataService: DataService, private _changeDetector: ChangeDetectorRef) { }
  ngOnInit(): void {
    let id: number | null = +this._route.snapshot.paramMap.get('id')!;
    this._dataService.getOneJobData(id).subscribe((resp)=>{
      this.job = resp;
    });
    if(this.job?.job_roles?.length){
      for(let i=0;i<this.job?.job_roles?.length; i++){
        this.jobRolesDrop.push(true);
        this.applyInJob.preference.push(false);
      }
    }
    this.jobRolesDrop = new Array<boolean>(10).fill(true);
  }

  ngAfterContentChecked(): void {
    this._changeDetector.detectChanges();
  }

  goUpClicked() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toogleRequisitesProcess(){
    this.isPreRequisitesApplicationClose = !this.isPreRequisitesApplicationClose;
  }
  clickClose(id: any) {
    this.jobRolesDrop[id] = !this.jobRolesDrop[id];
  }
  isApplyDisabled() {
    if(this.applyInJob.timeSlot.length > 0 && this.applyInJob.preference.includes(true)){
      return false;
    }
    return true;
  }

  applyIntoJob() {
    this.isAppliedInJob = true;
  }
}
