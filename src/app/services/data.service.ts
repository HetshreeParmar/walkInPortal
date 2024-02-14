import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map } from 'rxjs';
import { IJobs } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }
  baseURL: string = '../../assets/';

  getJobsData(): Observable<IJobs[]> {
    return this._http
      .get<IJobs[]>(this.baseURL + 'jobs.json')
      .pipe(catchError(this.handleError));
  }

  getOneJobData(id: number): Observable<IJobs | null>{
    return this._http.get<IJobs[]>(this.baseURL + 'jobs.json')
    .pipe(
      map((jobs: IJobs[]) => {
        let job = jobs.filter((job: IJobs) => job.id === id);
        return job && job.length ? job[0] : null;
      }),
      catchError(this.handleError)
    )
  } 

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
    }
    return throwError(error || 'Node.js server error');
  }
}
