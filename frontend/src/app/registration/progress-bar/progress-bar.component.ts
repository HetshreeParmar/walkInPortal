import { Component, OnInit } from '@angular/core';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';
import { QualificationsComponent } from '../qualifications/qualifications.component';
import { ReviewProceedComponent } from '../review-proceed/review-proceed.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegistrationData, UserRegistrationRequest } from '../../interfaces';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [PersonalInfoComponent, QualificationsComponent, ReviewProceedComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent implements OnInit{
  isGoToPassword: boolean = false;
  isDisabled:boolean = true;
  stepCount:number = 1;
  movePreviousStep(){
    console.log(this.stepCount);
    if(this.stepCount === 3){
      this.enableRegistration(true);
    }
    this.stepCount--;
  }
  movePreviousPreviousStep(){
    this.enableRegistration(true);
    this.stepCount-=2;
  }
  moveNextStep(){
    if(this.stepCount === 2){
      this.enableRegistration(false);
    }
    this.stepCount++;
  }
  isAlreadyNextStep(stepCount: number){
    if(this.stepCount >= stepCount)
      return true;
    else 
      return false;
  }

  enableRegistration(value: boolean) {
    this.isDisabled = value;
  }
  registrationData: RegistrationData = {
    college: [],
    location: [],
    stream: [],
    qualification: [],
    tech: [],
    role: [],
    applicationTypes: []
  };
  userInfo: UserRegistrationRequest = {
    email: '',
    firstName: '',
    lastName: '',
    phoneNo: 0,
    portfolioUrl: '',
    referalEmpName: '',
    sendMeUpdate: 0,
    userId: 0,
    countrycode: 0,
    resume: '',
    profilePhoto: '',
    percentage: 0,
    passingYear: 0,
    qualificationId: 0,
    streamId: 0,
    collegeId: 0,
    expYear: 0,
    currentCTC: 0,
    expectedCTC: 0,
    currentlyOnNoticePeriod: 0,
    noticeEnd: null,
    noticePeriodLength: 0,
    appearedZeusTest: 0,
    zeusTestRole: '',
    applicationTypeId: 0,
    expertTechsId: [],
    familiarTechsId: [],
    resumeFileName: '',
    rolesId: [],
    otherCollege: '',
    otherExpertTechs: '',
    otherFamiliarTechs: '',
    otherCollegeLocations: ''
  }
  setPersonalInformation(val: any) {
    this.userInfo = val.userInfo;
    window.scrollTo(0, 0);
    this.moveNextStep();
  }

  setQualificationsInformation(val: any) {
    window.scrollTo(0, 0);
    if (val.direction === 'PREVIOUS') {
      this.movePreviousStep();
    } else if (val.direction === 'NEXT') {
      this.moveNextStep();
    }
  }

  reviewPricessSubmited(val: any) {
    console.log(val.direction);
    if (val.direction == 'PREVIOUS') {
      console.log("previous called");
      window.scrollTo(0, 0);
      this.movePreviousStep();
    }else if(val.direction == 'PREVIOUSP'){
      window.scrollTo(0,0);
      this.movePreviousPreviousStep();
    }
  }

  createAccountClicked(){
    // console.log(this.userInfo);
    console.log(this.userInfo.email);
    console.log(this._dataService.isEmailExists(this.userInfo.email));
    // if(!this._dataService.isEmailExists(this.userInfo.email)){
    // this._dataService.isEmailExists(this.userInfo.email)
    // .subscribe((resp) => {
    //   if(!resp)
        // this.isGoToPassword = true;
        this._dataService.AddUser(this.userInfo);
        this._router.navigate(["/"]);
      // else alert('User already exists');
    // },
    // (error) => { alert('User already exists')}
    // )
  // }
    // else{
    //   alert("user already exists");
    // }
    // this._dataService.AddUser(this.userInfo);
    // this._router.navigate(["/createPassword"]);
  }

  constructor(private _dataService: DataService, private _router: Router) {}
  ngOnInit(): void {
      this._dataService.getRegistrationData().subscribe((resp) => {
        this.registrationData = resp;
        console.log(resp);
      })
  }
  updateUserData(userData: UserRegistrationRequest): void {
    this.userInfo = userData;
  }
}
