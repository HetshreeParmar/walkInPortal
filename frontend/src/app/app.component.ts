import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { JobListingComponent } from './job-listing/job-listing.component';
import { JobComponent } from './job/job.component';
import { ProgressBarComponent } from './registration/progress-bar/progress-bar.component';
import { PersonalInfoComponent } from './registration/personal-info/personal-info.component';
import { QualificationsComponent } from './registration/qualifications/qualifications.component';

import { ReviewProceedComponent } from './registration/review-proceed/review-proceed.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LoginComponent, JobListingComponent, JobComponent, ProgressBarComponent, PersonalInfoComponent, QualificationsComponent, ReviewProceedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
