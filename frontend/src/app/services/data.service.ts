import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map } from 'rxjs';
import { IApplication, IApplicationRequest, IJob,  RegistrationData, UserRegistrationRequest } from '../interfaces';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  baseURL: string = 'https://localhost:7182/';
  getJobsData(): Observable<IJob[]> {
    var allJobs = this._http
                    .get<IJob[]>(this.baseURL + 'jobs')
                    .pipe(catchError(this.handleError));
    console.log(allJobs);
    return allJobs;
  }

  getOneJobData(id: number): Observable<IJob>{
    return this._http.get<IJob>(this.baseURL + 'job/' + id);
  } 

  getRegistrationData(): Observable<RegistrationData>{
    return this._http.get<RegistrationData>(this.baseURL + 'getregistrationdata')
      .pipe(catchError(this.handleError));
  }

  AddUser(UserInfo: UserRegistrationRequest): Observable<UserRegistrationRequest>{
    var userDataAdded = this._http.post<UserRegistrationRequest>(this.baseURL + 'user', UserInfo).subscribe((resp)=> console.log(resp));
    console.log("at adding data", userDataAdded);
    return this._http.post<UserRegistrationRequest>(this.baseURL + 'user', UserInfo).pipe(catchError(this.handleError));
    // console.log(userDataAdded);
    // return userDataAdded;
  }

  isEmailExists(email: string){
    return this._http.get(this.baseURL + 'userExists/' + email);
  }

  getUserId(email: string) : Observable<any>{
    return this._http.get(this.baseURL + 'getUserId/' + email);
  }

  applyJob(Iapplication: IApplicationRequest){
    return this._http.post(this.baseURL + 'apply', {resume: Iapplication.resume, userId: Iapplication.userId, jobId: Iapplication.jobId, slotId: Iapplication.slotId, rolesid: Iapplication.rolesid});
  }

  getApplication(applicationId: number):Observable<any>{
    return this._http.get(this.baseURL + 'getApplication/' + applicationId);
  }
  // isEmailExists(email: string){
  //   return this._http.get<any>(this.baseURL + 'userExists', email);
  // }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
    }
    return throwError(error || 'Node.js server error');
  }
}
