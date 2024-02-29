import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { QualificationsComponent } from './qualifications/qualifications.component';
import { ReviewProceedComponent } from './review-proceed/review-proceed.component';



@NgModule({
  declarations: [PersonalInfoComponent, QualificationsComponent, ReviewProceedComponent],
  imports: [
    CommonModule
  ]
})
export class RegistrationModule { }
