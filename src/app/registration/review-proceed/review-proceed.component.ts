import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IJobRoles, ITechnologies } from '../../interfaces';

@Component({
  selector: 'app-review-proceed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-proceed.component.html',
  styleUrl: './review-proceed.component.scss'
})
export class ReviewProceedComponent {
  objectKeys = Object.keys;

  userInfo: any = {};
  preferredJobRoles: IJobRoles[] = [];
  userEducationalQualifications: any = {};
  userProfessionalQualificationsVisible: any = {};
  userFresher: any = {};
  userExperienced: any = {};
  familiarTechnologies: ITechnologies[] = [];
  expertiseTechnologies: ITechnologies[] = [];

  @Input() set prevUserInfo(val: any) {
    this.userInfo = val.userInfo;
    this.preferredJobRoles = val.preferredJobRoles;
    this.userEducationalQualifications = val.userEducationalQualifications;
    this.userProfessionalQualificationsVisible =
      val.userProfessionalQualificationsVisible;
    this.userFresher = val.userFresher;
    this.userExperienced = val.userExperienced;
    this.familiarTechnologies = val.familiarTechnologies;
    this.expertiseTechnologies = val.expertiseTechnologies;
  }

  @Output() reviewPricessSubmited = new EventEmitter();

  onSubmit(direction: string) {
    this.reviewPricessSubmited.emit({
      direction,
    });
  }
}
