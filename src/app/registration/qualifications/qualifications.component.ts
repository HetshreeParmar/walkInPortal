import { CommonModule } from '@angular/common';
import { Component,  EventEmitter, Input,  Output } from '@angular/core';
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
  familiarTechnologies: ITechnologies[] = [];
  expertiseTechnologies: ITechnologies[] = [];
 
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

  onSubmit(direction: string) {
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

  // isEducationalQualificationsVisible: boolean = true;
  // isProfessionalQualificationsVisible: boolean = false;

  // userEducationalQualifications: any = {};
  // userProfessionalQualificationsVisible: any = {};
  // userFresher: any = {};
  // userExperienced: any = {};
  // familiarTechnologies: ITechnologies[] = [];
  // expertiseTechnologies: ITechnologies[] = [];

  // @Input() set prevUserInfo(val: any) {
  //   this.userEducationalQualifications = val.userEducationalQualifications;
  //   this.userProfessionalQualificationsVisible =
  //     val.userProfessionalQualificationsVisible;
  //   this.userFresher = val.userFresher;
  //   this.userExperienced = val.userExperienced;
  //   this.familiarTechnologies = val.familiarTechnologies;
  //   this.expertiseTechnologies = val.expertiseTechnologies;
  // }
  // changeEducationalQualificationsVisible() {
  //   this.isEducationalQualificationsVisible =
  //     !this.isEducationalQualificationsVisible;
  // }
  // changeProfessionalQualificationsVisible() {
  //   this.isProfessionalQualificationsVisible =
  //     !this.isProfessionalQualificationsVisible;
  // }

  // @Output() qualificationsSubmited = new EventEmitter();

  // onSubmit(direction: string) {
  //   this.qualificationsSubmited.emit({
  //     userEducationalQualifications: this.userEducationalQualifications,
  //     userProfessionalQualificationsVisible:
  //       this.userProfessionalQualificationsVisible,
  //     userFresher: this.userFresher,
  //     userExperienced: this.userExperienced,
  //     familiarTechnologies: this.familiarTechnologies,
  //     expertiseTechnologies: this.expertiseTechnologies,
  //     direction,
  //   });
  // }
}
