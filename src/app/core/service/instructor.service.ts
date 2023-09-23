import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from './logger.service';
import { Users } from '../models/user.model';
import { CoursePaginationModel } from '../models/course.model';
import { AppConstants } from '@shared/constants/app.constants';
import { ApiResponse } from '@core/models/general.response';
import { environment } from 'environments/environment';

const Logging = new Logger('AuthenticationService');

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
    private currentUserSubject!: BehaviorSubject<any>;
    public currentUser!: Observable<any>;
  defaultUrl = environment['apiUrl'];
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
        JSON.parse(localStorage.getItem('currentUser') || '{}')
      );
      this.currentUser = this.currentUserSubject.asObservable();
  
  }
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

 
  
  CreateUser(user: Users): Observable<ApiResponse> {
    //const apiUrl = `${this.prefix}admin/course-kit/`;
    const loginUrl =this.defaultUrl + 'auth/instructorCreate';
    return this.http.post<ApiResponse>(loginUrl, user);
  }
  uploadVideo(files: File): Observable<any> {
    const formData = new FormData();
    //for (let file of files) {
      formData.append('Files', files, files.name);
    //}
    const apiUrl = `${this.defaultUrl}admin/video/upload`;
    return this.http.post(apiUrl, formData);
  }


 

  getAccessToken() {
    //let user =JSON.parse();
    const user = this.getUserInfo();
    localStorage.getItem(AppConstants.KEY_USER_DATA)
   return user ? user.token : null;
  }

  getUserInfo() {
    //let consta =localStorage.getItem(AppConstants.KEY_USER_DATA)
    return JSON.parse(localStorage.getItem(AppConstants.KEY_USER_DATA)||'{}');
  }

  saveUserInfo(info:any) {
    localStorage.setItem(AppConstants.KEY_USER_DATA, JSON.stringify(info));
}
getInstructor(body:any): Observable<ApiResponse> {
  const apiUrl = `${this.defaultUrl}auth/instructorList/`;
  return this.http
    .post<ApiResponse>(apiUrl,body)
    .pipe(
      map((response:any) => {
        return response.data;
      })
    );
}
deleteUser(userId: string): Observable<ApiResponse> {
  const apiUrl = `${this.defaultUrl}auth/instructorDelete/${userId}`;
  return this.http.delete<ApiResponse>(apiUrl);
}
}
