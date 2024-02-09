import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IJobRoles, IPersonalInformation, ITechnologies, IUserEducationalQualifications, IUserExperiences, IUserFresher } from '../../interfaces';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';
import { ReviewProceedComponent } from '../review-proceed/review-proceed.component';
import { QualificationsComponent } from '../qualifications/qualifications.component';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule, PersonalInfoComponent, QualificationsComponent, ReviewProceedComponent],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent implements OnInit{
  isDisabled:boolean = true;
  stepCount:number = 1;
  constructor(){ }
  ngOnInit(): void {
    
  }
  movePreviousStep(){
    console.log(this.stepCount);
    if(this.stepCount === 3){
      this.enableRegistration(true);
    }
    this.stepCount--;
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

  userPersonalInformation: IPersonalInformation = {
    firstName: '',
    lastName: '',
    email: '',
    countryCode: null,
    phoneNumber: null,
    portfolio: '',
    referralName: '',
    jobRelatedUpdates: null,
    profilePhotoBaseInfo: null,
    profilePhotoName: null,
    resumeInfo: null,
    resumeName: null
  };

  preferredJobRoles: IJobRoles[] = [
    {
      id: 1,
      JobRoleName: 'instructional Designer',
      value: false,
    },
    {
      id: 2,
      JobRoleName: 'software Engineer',
      value: false,
    },
    {
      id: 3,
      JobRoleName: 'software Quality Engineer',
      value: false,
    },
  ];

  familiarTechnologies: ITechnologies[] = [
    {
      id: 1,
      technologyName: 'Javascript',
      value: false,
    },
    {
      id: 2,
      technologyName: 'Angular JS',
      value: false,
    },
    {
      id: 3,
      technologyName: 'React',
      value: false,
    },
    {
      id: 4,
      technologyName: 'Node JS',
      value: false,
    },
    {
      id: 5,
      technologyName: 'Others',
      value: false,
    },
  ];

  expertiseTechnologies: ITechnologies[] = [
    {
      id: 1,
      technologyName: 'Javascript',
      value: false,
    },
    {
      id: 2,
      technologyName: 'Angular JS',
      value: false,
    },
    {
      id: 3,
      technologyName: 'React',
      value: false,
    },
    {
      id: 4,
      technologyName: 'Node JS',
      value: false,
    },
    {
      id: 5,
      technologyName: 'Others',
      value: false,
    },
  ];

  //   qualificationsInformation: any = {
  //     aggregatePercentage: '',
  //     passingYear: null,
  //     qualification: null,
  //     stream: null,
  //     collegeName: null,
  //     otherCollageName: null,
  //     collageLocation: '',
  //     isExperienced: false,
  //     javascript: false,
  //     angularJS: false,
  //     react: false,
  //     nodeJS: false,
  //     others: false,
  //     otherTechnologies: null,
  //     isAppearedInTestByZeus: null,
  //     appearedRoleName: null,
  //   };

  userEducationalQualifications: IUserEducationalQualifications = {
    aggregatePercentage: '',
    passingYear: null,
    qualification: null,
    stream: null,
    collegeName: null,
    otherCollegeName: null,
    collegeLocation: '',
  };

  userProfessionalQualificationsVisible: any = {
    isExperienced: false,
  };

  userFresher: IUserFresher = {
    // javascript: false,
    // angularJS: false,
    // react: false,
    // nodeJS: false,
    // others: false,
    otherTechnologies: null,
    isAppearedInTestByZeus: null,
    appearedRoleName: null,
  };

  userExperienced: IUserExperiences = {
    yearsOfExperience: null,
    currentCTC: null,
    expectedCTC: null,
    // e_javascript: false,
    // e_angularJS: false,
    // e_react: false,
    // e_nodeJS: false,
    // e_others: false,
    e_otherTechnologies: null,
    // f_javascript: false,
    // f_angularJS: false,
    // f_react: false,
    // f_nodeJS: false,
    // f_others: false,
    f_otherTechnologies: null,
    isInNoticePeriod: null,
    noticePeriodEnd: null,
    noticePeriodLength: null,
    isAppearedInTestByZeus: null,
    appearedRoleName: null,
  };

  setPersonalInformation(val: any) {
    this.preferredJobRoles = val.preferredJobRoles;
    this.userPersonalInformation = val.userInfo;
    window.scrollTo(0, 0);
    this.moveNextStep();
  }

  setQualificationsInformation(val: any) {
    this.userEducationalQualifications = val.userEducationalQualifications;
    this.userProfessionalQualificationsVisible =
      val.userProfessionalQualificationsVisible;
    this.userFresher = val.userFresher;
    this.userExperienced = val.userExperienced;
    window.scrollTo(0, 0);
    if (val.direction === 'PREVIOUS') {
      this.movePreviousStep();
    } else if (val.direction === 'NEXT') {
      this.moveNextStep();
    }
  }
  reviewPricessSubmited(val: any) {
    if (val.direction === 'PREVIOUS') {
      window.scrollTo(0, 0);
      this.movePreviousStep();
    }
  }
}