import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProgressBarComponent } from './registration/progress-bar/progress-bar.component';
import { LoginComponent } from './login/login.component';
import { JobListingComponent } from './job-listing/job-listing.component';
import { JobComponent } from './job/job.component';
import { JobApplicationComponent } from './job-application/job-application.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, HeaderComponent, ProgressBarComponent, JobListingComponent, JobComponent, JobApplicationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Myfrontend';
}
