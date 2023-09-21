import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment";
import {  map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/general.response';
import { Logger } from './logger.service';
import { CertificateBuilderPaginationModel } from '@core/models/certificatebuilder.model';


const Logging = new Logger('certificateService');

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private defaultUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {

  }
  addcertificateBuilder(formData:any): Observable<any> {
    return this.http.post<ApiResponse>(`${environment.apiUrl}admin/certificate-builder`, formData).pipe(map((response) => {
      return response.data;
    }));
  }

 
  uploadImage(file:any) {
    const apiUrl = `${this.defaultUrl}admin/video/uploadImage`;
    return this.http.post<any>(apiUrl, file).pipe(
      map((response) => {
        return response
      })
    );
  }
  uploadCourseThumbnail(file:any) {
    const apiUrl = `${this.defaultUrl}admin/video/uploadCourseThumbnail`;
    return this.http.post<any>(apiUrl, file).pipe(
      map((response) => {
        return response
      })
    );
  }

  getcertificateDesigns(): Observable<any> {
    const apiUrl = this.defaultUrl + `admin/certificate-builder/certificatesList`;
    return this.http
      .get<ApiResponse>(apiUrl, {
        params: {}
      })
      .pipe(map((response) => response));
  }
  getcertificateBuilders(filter?: Partial<CertificateBuilderPaginationModel>): Observable<any> {
    const apiUrl = this.defaultUrl + `admin/certificate-builder`;
    return this.http
      .get<ApiResponse>(apiUrl, {
        params: {}
      })
      .pipe(map((response) => response));
  }


}
