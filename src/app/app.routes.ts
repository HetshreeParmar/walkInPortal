import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProgressBarComponent } from './registration/progress-bar/progress-bar.component';
import { JobListingComponent } from './job-listing/job-listing.component';
import { JobComponent } from './job/job.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LoginComponent
    },
    {
        path: 'registration',
        pathMatch: 'full',
        component: ProgressBarComponent
    },
    {
        path: 'allJobs',
        pathMatch: 'full',
        component: JobListingComponent
    },
    {
        path: 'job/:id',
        pathMatch: 'full',
        component: JobComponent
    }
];
