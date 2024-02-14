import { CommonModule } from '@angular/common';
import { Component,  ElementRef,  EventEmitter, Input,  Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITechnologies } from '../../interfaces';

@Component({
  selector: 'app-qualifications',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './qualifications.component.html',
  styleUrl: './qualifications.component.scss'
})
export class QualificationsComponent {
  isEducationalQualificationsVisible: boolean = false;
  isProfessionalQualificationsVisible: boolean = false;
  
  userEducationalQualifications: any = {};
  userProfessionalQualificationsVisible: any = {};
  userFresher: any = {};
  userExperienced: any = {};
  familiarTechnologies!: ITechnologies;
  expertiseTechnologies!: ITechnologies;
 
  changeEducationalQualificationsVisible() {
    this.isEducationalQualificationsVisible =
      !this.isEducationalQualificationsVisible;
  }
  changeProfessionalQualificationsVisible() {
    this.isProfessionalQualificationsVisible =
      !this.isProfessionalQualificationsVisible;
  }

  @Input() set prevUserInfo(val: any) {
    this.userEducationalQualifications = val.userEducationalQualifications;
    this.userProfessionalQualificationsVisible =
      val.userProfessionalQualificationsVisible;
    this.userFresher = val.userFresher;
    this.userExperienced = val.userExperienced;
    this.familiarTechnologies = val.familiarTechnologies;
    this.expertiseTechnologies = val.expertiseTechnologies;
  }

  @Output() qualificationsSubmited = new EventEmitter();

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

  checkSingleField(ele : ElementRef) : boolean{
    if(!ele.nativeElement.value){
      alert("This field cannot be empty");
      ele.nativeElement.focus();
      return false;
    }
    return true;
  }

  experiencedOnNotice():boolean{
    if(this.userExperienced.isInNoticePeriod === null){
      alert('Enter, You are currently on Notice Period?');
      this.isInNoticePeriod.nativeElement.focus();
      return false;
    }
    return true;
  }

  experienceNoticePeriodEnd(ele: ElementRef): boolean{
    if(this.userExperienced.isInNoticePeriod === false)
      return true;
    else if(!this.userExperienced.noticePeriodEnd){
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

  fre_checkAppearedInTestByZeus(): boolean{
    if(this.userFresher.isAppearedInTestByZeus !== null){
      return true;
    }
    alert('Please Select One option of Have You Appeared For Any Test By Zeus in the past 12 months?');
    this.userFresher.isAppearedInTestByZeus.nativeElement.focus();
    return false;
  }

  exp_checkAppearedInTestByZeus(): boolean{
    if(this.userExperienced.isAppearedInTestByZeus !== null){
      return true;
    }
    alert('Please Select One option of Have You Appeared For Any Test By Zeus in the past 12 months?');
    this.userExperienced.isAppearedInTestByZeus.nativeElement.focus();
    return false;
  }

  checkExpertiseTech(ele: ElementRef): boolean{
    if(this.userProfessionalQualificationsVisible.isExperienced){
      if(this.expertiseTechnologies.values.includes(true)){
        return true;
      }
      alert('Select atleast one Expertise technology');
      ele.nativeElement.focus();
      return false;
    }
    return true;
  }

  checkAllFields(): boolean{
    if(this.checkSingleField(this.aggregatePercentage)){
      if(this.checkSingleField(this.passingYear)){
        if(this.checkSingleField(this.qualification)){
          if(this.checkSingleField(this.stream)){
            if(this.checkSingleField(this.collegeName)){
              if(this.checkSingleField(this.collegeLocation)){
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }

  whichRoleApplied(){
    if(this.userProfessionalQualificationsVisible.isExperienced){
      if(this.userExperienced.isAppearedInTestByZeus && !this.exp_appearedRoleName.nativeElement.value){
        alert('Enter, Which role did you apply for?');
        this.exp_appearedRoleName.nativeElement.focus();
        return false;
      }
      return true;
    } else{
      if(this.userFresher.isAppearedInTestByZeus && !this.fre_appearedRoleName.nativeElement.value){
        alert('Enter, Which role did you apply for?');
        this.fre_appearedRoleName.nativeElement.focus();
        return false;
      }
      return true;
    }
  }

  fresherApplicant(): boolean{
    if(this.fre_checkAppearedInTestByZeus()){
      return this.whichRoleApplied();
    }
    return false;
  }

  Experienceapplicant(): boolean{
    if(this.checkSingleField(this.yearsOfExperience)){
      if(this.checkSingleField(this.currentCTC)){
        if(this.checkSingleField(this.expectedCTC)){
          if(this.checkExpertiseTech(this.expertiseTechnologiesHash)){
            if(this.experiencedOnNotice()){
              if(this.experienceNoticePeriodEnd(this.isInNoticePeriod)){
                if(this.experienceNoticePeriodLength(this.noticePeriodLength)){
                  if(this.exp_checkAppearedInTestByZeus()){
                    return this.whichRoleApplied();
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

  professionalCheck(): boolean{
    if(this.userProfessionalQualificationsVisible. isExperienced){
      return this.Experienceapplicant();
    }else{
      return this.fresherApplicant();
    }
  }

  onSubmit(direction: string) {
    console.log(direction);
    if(direction === 'NEXT'){
      const finalCheck: boolean = this.checkAllFields() && this.professionalCheck();
      if(finalCheck){
        this.qualificationsSubmited.emit({
          userEducationalQualifications: this.userEducationalQualifications,
          userProfessionalQualificationsVisible:
            this.userProfessionalQualificationsVisible,
          userFresher: this.userFresher,
          userExperienced: this.userExperienced,
          familiarTechnologies: this.familiarTechnologies,
          expertiseTechnologies: this.expertiseTechnologies,
          direction,
        });
      }
    }else{
      this.qualificationsSubmited.emit({
        userEducationalQualifications: this.userEducationalQualifications,
        userProfessionalQualificationsVisible:
          this.userProfessionalQualificationsVisible,
        userFresher: this.userFresher,
        userExperienced: this.userExperienced,
        familiarTechnologies: this.familiarTechnologies,
        expertiseTechnologies: this.expertiseTechnologies,
        direction,
      });
    }
  }
}
