import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { Observable,throwError} from 'rxjs';
import { ApiResponse } from '../models/general.response';
import { Logger } from './logger.service';
import { catchError } from 'rxjs/operators';
import {UserType} from "../models/user.model"
import { Mentor } from '../models/mentor';
import { environment } from 'environments/environment';

const Logging = new Logger('UserService');

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private defaultUrl: string = environment['apiUrl'];
    prefix: any;
  constructor(private http: HttpClient) {}
  
  getUserList(filter?:any): Observable<any> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing';
    return this.http
      .get<ApiResponse>(apiUrl, {
        params: filter
      })
      .pipe(map((response) => response));
  }
  getAllUserList(filter?:any): Observable<any> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing/instructors    ';
    return this.http
      .get<ApiResponse>(apiUrl)
      .pipe(map((response) => response));
  }
  
  
  getUserRewards = (filters:any,userID?:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/mentor/fetchUserRewards/'+userID;
    return this.http.get(endpoint,{params: filters}).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getRewardRedeemSetting = (filter:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/mentor/fetchRewardRedeemSetting';
    return this.http.get(endpoint,{params: filter}).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  createRedeemSettingData = (data:any): Observable<any> => {
    const endpoint = environment.apiUrl+'admin/mentor/addRedeemSettingData';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ); 
  };

  updateRedeemSettingData = (data:any,Id:any): Observable<any> => {
    let endpoint = environment.apiUrl+'admin/mentor/updateRedeemSettingData';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getUsersByName(data: any): Observable<any> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing/getUsersByName';
    return this.http.post<ApiResponse>(apiUrl, data).pipe(map((response) => {
      Logging.debug(response);
      return response;
    }));
  }
  
  getUsersByName1(data: any): Observable<any> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing/getUsersByName3';
    return this.http.post<ApiResponse>(apiUrl, data).pipe(map((response) => {
      Logging.debug(response);
      return response;
    }));
  }

  saveUsers(formData:any): Observable<Mentor> {
    const apiUrl = this.defaultUrl + 'admin/adminUserListing';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  updateUsers(formData:any, id:any): Observable<Mentor> {
    const apiUrl = `${this.defaultUrl}admin/adminUserListing/${id}`;
    return this.http.put<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }
  updateUserType(dataDetails: UserType) {
    const apiUrl = `${this.defaultUrl}userType/${dataDetails._id}`;
    return this.http.put<ApiResponse>(apiUrl, dataDetails).pipe(
      map((response) => {
        return response.data
      })
    );
  }
}
