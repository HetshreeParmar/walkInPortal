import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { JobListingComponent } from './job-listing/job-listing.component';
import { JobComponent } from './job/job.component';
import { ProgressBarComponent } from './registration/progress-bar/progress-bar.component';
import { JobAppliedComponent } from './job-applied/job-applied.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LoginComponent
    },
    {
        path: 'allJobs',
        pathMatch: 'full',
        component: JobListingComponent
    },
    {
        path: 'registration',
        pathMatch: 'full',
        component: ProgressBarComponent
    },
    { path: 'jobs/:id/application/:applicationid', component: JobAppliedComponent },
    // {
    //     path: 'createPassword',
    //     pathMatch: 'full',
    //     component: CreatePasswordComponent,
    // },
    {
        path: 'job/:id',
        pathMatch: 'full',
        component: JobComponent
    }
];
