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
export class AuthenService {
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

  loginUser(email: any, password: any): Observable<Users> {
    const body = {
      email,
      password
    };

    const loginUrl =this.defaultUrl + 'auth/login';
    let headers = new HttpHeaders();
    headers = headers.set('no-auth' , 'true');
    return this.http.post<ApiResponse>(loginUrl, body, { headers }).pipe(
      map((response) => {
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        localStorage.setItem('id', response.data.user.id);
        this.currentUserSubject.next(response.data);
      return response.data;
      },
      (error: any) =>{
        console.log('err',error)
      })
    );
  }
  private buildParams(filter?: Partial<CoursePaginationModel>): HttpParams {
    let params = new HttpParams();
    if (filter) {
      if (filter.sortBy) {
        params = params.set(
          "sortBy",
          `${filter.sortByDirection === "asc" ? "+" : "-"}${filter.sortBy}`
        );
      }
      if (filter.limit) {
        params = params.set("limit", filter.limit?.toString());
      }
      if (filter.page) {
        params = params.set("page", filter.page?.toString());
      }
      if (filter.main_category && +filter.main_category !== 0) {
        params = params.set("main_category", filter.main_category);
      }
      if (filter.sub_category && +filter.sub_category !== 0) {
        params = params.set("sub_category", filter.sub_category);
      }
      if (filter.filterText) {
        params = params.set("title", filter.filterText?.toString());
      }
      if (filter.status && filter.status === "active") {
        params = params.set("status", "active");
      } else if (filter.status && filter.status === "inactive") {
        params = params.set("status", "inactive");
      }
    }
    return params;
  }

  getAllCourses(
    filter?: Partial<CoursePaginationModel>
  ): Observable<ApiResponse> {
    const apiUrl =this.defaultUrl+'admin/courses-new';
    console.log("==new=",apiUrl)
    return this.http.get<ApiResponse>(apiUrl, {
      params: this.buildParams(filter),
    });
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
    localStorage.setItem('user_type',info.user.type);

}
}
