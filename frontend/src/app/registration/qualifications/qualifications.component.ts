import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RegistrationData, Tech, UserRegistrationRequest } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-qualifications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qualifications.component.html',
  styleUrl: './qualifications.component.scss'
})
export class QualificationsComponent implements OnInit{

  @ViewChild('aggregatePercentage') aggregatePercentage! : ElementRef;
  @ViewChild('passingYear') passingYear! : ElementRef;
  @ViewChild('qualification') qualification! : ElementRef;
  @ViewChild('stream') stream! : ElementRef;
  @ViewChild('collegeName') collegeName! : ElementRef;
  @ViewChild('otherCollegeName') otherCollegeName! : ElementRef;
  @ViewChild('collegeLocation') collegeLocation! : ElementRef;

  @ViewChild('yearsOfExperience') yearsOfExperience! : ElementRef;
  @ViewChild('currentCTC') currentCTC! : ElementRef;
  @ViewChild('expectedCTC') expectedCTC! : ElementRef;
  @ViewChild('expertiseTechnologiesHash') expertiseTechnologiesHash! : ElementRef;
  @ViewChild('otherexpertiseTechnologiesHash') otherexpertiseTechnologiesHash! : ElementRef;
  @ViewChild('isInNoticePeriod') isInNoticePeriod! : ElementRef;
  @ViewChild('noticePeriodEnd') noticePeriodEnd! : ElementRef;
  @ViewChild('noticePeriodLength') noticePeriodLength! : ElementRef;
  @ViewChild('exp_appearedRoleName') exp_appearedRoleName!: ElementRef;
  @ViewChild('fre_appearedRoleName') fre_appearedRoleName!: ElementRef;

  checkSingleField(ele : ElementRef, altr:string) : boolean{
    if(!ele.nativeElement.value){
      alert(altr);
      ele.nativeElement.focus();
      return false;
    }
    return true;
  }

  // experiencedOnNotice():boolean{
  //   if(this.userExperienced.isInNoticePeriod === null){
  //     alert('Enter, You are currently on Notice Period?');
  //     this.isInNoticePeriod.nativeElement.focus();
  //     return false;
  //   }
  //   return true;
  // }

  checkAllFields():boolean{
    if(this.checkSingleField(this.aggregatePercentage, 'Percentage is required')){
      if(this.checkSingleField(this.passingYear, 'Please select Passing year!')){
        if(this.checkSingleField(this.qualification, 'Please select Qualification')){
          if(this.checkSingleField(this.stream, 'Please select Stream')){
            if(this.checkSingleField(this.collegeName, 'Please select College')){
              if(this.checkSingleField(this.collegeLocation, 'Please enter college Location')){
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }

  checkExpertiseJobContainer(ele: ElementRef):boolean{
    if(this.userInfo.expertTechsId.length > 0)
      return true;
    alert('Select atlease one expertise technology');
    // ele.nativeElement.focus();
    return false;
  }

  experiencedOnNotice():boolean{
    if(this.userInfo.currentlyOnNoticePeriod === null){
      alert('Enter, You are currently on Notice Period?');
      this.isInNoticePeriod.nativeElement.focus();
      return false;
    }
    return true;
  }

  experienceNoticePeriodEnd(ele: ElementRef): boolean{
    console.log(this.userInfo.currentlyOnNoticePeriod);
    if(!this.userInfo.currentlyOnNoticePeriod)
      return true;
    else if(!this.userInfo.noticeEnd){
      alert('Enter, When will your notice period end?');
      ele.nativeElement.focus();
      return false;
    }
    return true;
  }

  experienceNoticePeriodLength(ele: ElementRef): boolean{
    if(!ele.nativeElement.value){
      alert('Enter, How long is your notice period?');
      ele.nativeElement.focus();
      return false;
    }
    return true;
  }

  exp_checkAppearedInTestByZeus(): boolean{
    if(this.userInfo.appearedZeusTest !== null){
      return true;
    }
    alert('Please Select One option of Have You Appeared For Any Test By Zeus in the past 12 months?');
    // this.userInfo.appearedZeusTest.nativeElement.focus();
    return false;
  }

  fre_checkAppearedInTestByZeus(): boolean{
    if(this.userInfo.appearedZeusTest !== null){
      return true;
    }
    alert('Please Select One option of Have You Appeared For Any Test By Zeus in the past 12 months?');
    // this.userInfo.appearedZeusTest.nativeElement.focus();
    return false;
  }

  whichRoleApplied(){
    if(this.userInfo.applicationTypeId === 2){
      if(this.userInfo.appearedZeusTest && !this.exp_appearedRoleName.nativeElement.value){
        alert('Enter, Which role did you apply for?');
        this.exp_appearedRoleName.nativeElement.focus();
        return false;
      }
      return true;
    } else{
      if(this.userInfo.appearedZeusTest && !this.fre_appearedRoleName.nativeElement.value){
        alert('Enter, Which role did you apply for?');
        this.fre_appearedRoleName.nativeElement.focus();
        return false;
      }
      return true;
    }
  }

  Experienceapplicant():boolean{
    if(this.checkSingleField(this.yearsOfExperience, 'Please enter years of Experience')){
      if(this.checkSingleField(this.currentCTC, 'Please enter current CTC')){
        if(this.checkSingleField(this.expectedCTC, 'Please enter expected CTC')){
          if(this.checkExpertiseJobContainer(this.expertiseTechnologiesHash)){
            if(this.experiencedOnNotice()){
              if(this.experienceNoticePeriodEnd(this.isInNoticePeriod)){
                if(this.experienceNoticePeriodLength(this.noticePeriodEnd)){
                  if(this.exp_checkAppearedInTestByZeus()){
                    if(this.whichRoleApplied()){
                      return true;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return false;
  }

  fresherApplicant():boolean{
    if(this.fre_checkAppearedInTestByZeus()){
      if(this.whichRoleApplied()){
        return true;
      }
    }
    return false;
  }

  professionalCheck():boolean{
    if(this.userInfo.applicationTypeId === 2){
      return this.Experienceapplicant();
    }else if(this.userInfo.applicationTypeId === 1){
      return this.fresherApplicant();
    }else{
    return false;}
  }

  isEducationalQualificationsVisible: boolean = false;
  isProfessionalQualificationsVisible: boolean = false;

  changeEducationalQualificationsVisible() {
    this.isEducationalQualificationsVisible =
      !this.isEducationalQualificationsVisible;
  }
  changeProfessionalQualificationsVisible() {
    this.isProfessionalQualificationsVisible =
      !this.isProfessionalQualificationsVisible;
  }

  selectedApplicantType: string = '';
  currentYear = new Date().getFullYear();
  yearsList = Array.from({ length: 51 }, (_, index) => this.currentYear - index);

  handleApplicantTypeChange(applicantType: string): void {
    this.selectedApplicantType = applicantType;
    // this.updateComponentsVisibility();
  }

  toggleFamiliarTech(tech: Tech): void {
    const i = this.userInfo.familiarTechsId.indexOf(tech.technologyId)
    if(i>-1){
      this.userInfo.familiarTechsId.splice(i,1);
    }
    else{
      this.userInfo.familiarTechsId.push(tech.technologyId);
    }
  }
  toggleExpertiseTech(tech: Tech): void {
    const i = this.userInfo.expertTechsId.indexOf(tech.technologyId)
    if(i>-1){
      this.userInfo.expertTechsId.splice(i,1);
      console.log(this.userInfo.expertTechsId);
    }
    else{
      this.userInfo.expertTechsId.push(tech.technologyId);
      console.log(this.userInfo.expertTechsId);
    }
  }

  

  @Input() userInfo!: UserRegistrationRequest;
  @Input() registrationData!: RegistrationData;
  @Input() techs: Tech[] = [];
  @Output() qualificationsSubmited = new EventEmitter();
  @Output() userDataUpdated = new EventEmitter<any>();
  updateUserData(): void {
    this.userDataUpdated.emit(this.userInfo);
    console.log(this.userInfo);
  }
  onSubmit(direction: string)
  {
    if(direction == 'NEXT')
    {
      const finalCheck: boolean = this.checkAllFields() && this.professionalCheck();
      console.log("Final check", finalCheck);
      if(finalCheck){
        this.qualificationsSubmited.emit({
          direction,
        });
      }
    }else{
      this.qualificationsSubmited.emit({
        direction,
      })
    }
  }
  ngOnInit(): void {
    console.log("at wualification", this.techs);
      console.log(this.registrationData);
      console.log(this.userInfo);
  }
}
