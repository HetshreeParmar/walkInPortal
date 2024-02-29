import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { IApplicationRequest, IJob } from '../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent {
  job!: IJob | null;
  jobRolesDrop: boolean[] = [];
  isPreRequisitesApplicationClose: boolean = true;

  isAppliedInJob: boolean = false;

  anyValue: any;

  application: IApplicationRequest = {
    resume: null,
    userId: 0,
    jobId: 0,
    slotId: 0,
    rolesid: []
  };

  applyInJob: any = {
    timeSlot: '',
    preference: [],
  };
  constructor(private _route: ActivatedRoute ,private _dataService: DataService, private _changeDetector: ChangeDetectorRef, private _router: Router) { }
  ngOnInit(): void {
    let id: number | null = +this._route.snapshot.paramMap.get('id')!;
    this._dataService.getOneJobData(id).subscribe((resp)=>{
      this.job = resp;
    });
    this.application.jobId = id;
    
    if(this.job?.jobRoles?.length){
      for(let i=0;i<this.job?.jobRoles?.length; i++){
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

  toggleJobRole(role: number): void {
    this.application.rolesid.push(role);
  }

  toggleSlot(slot: number) {
    this.application.slotId = slot;
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

  inputFile: any;
  @ViewChild('fileName') fileName!: ElementRef;
  uploadResume(event: any): void {
    this.inputFile = event.target.files[0];

    if (this.inputFile) {
      const reader = new FileReader();
      reader.onloadend = (e: any) => {
        this.application.resume = e.target.result as string;
      };
      reader.readAsDataURL(this.inputFile);
    }

    this.fileName = this.inputFile ? this.inputFile.name : '';
  }
  applyIntoJob() {
    console.log(typeof(localStorage.getItem('token')?.split('/')[1]));
    // var email:string = '';
    var email = localStorage.getItem('token')?.split('/')[1]!;
    this._dataService.getUserId(email).subscribe((resp) => {
      console.log(resp.id);
      this.application.userId = resp.id;
      this._dataService.applyJob(this.application).subscribe((data) =>{
      this._router.navigate([`/jobs/${this.application.jobId}/application/${data}`])})
    })
    // this.isAppliedInJob = true;
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
