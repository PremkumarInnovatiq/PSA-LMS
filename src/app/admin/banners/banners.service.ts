import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Logger } from '@core/service/logger.service';
import { AddDefaultBanner } from './banner.model';
import { ApiResponse } from '@core/models/response';
import { environment } from 'environments/environment';

const Logging = new Logger('AddDefaultBannerService');

@Injectable({
  providedIn: 'root'
})
export class BannersService {
  private defaultUrl: string = environment['apiUrl'];
  constructor(private http: HttpClient) { }


  getBanners(bannerFor:any): Observable<AddDefaultBanner> {
    const apiUrl = `${this.defaultUrl}admin/bannerImage/${bannerFor}`;
    return this.http.get<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }


  editBanner(id:any, activeStatus:any): Observable<AddDefaultBanner> {
    const apiUrl = `${this.defaultUrl}admin/bannerImage/${id}`;
    return this.http.put<ApiResponse>(apiUrl, {"isActivated": activeStatus}).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  deleteBanner(id:any): Observable<AddDefaultBanner> {
    const apiUrl = `${this.defaultUrl}admin/bannerImage/${id}`;
    return this.http.delete<ApiResponse>(apiUrl).pipe(
      map((response) => {
        Logging.debug(response.data);
        return response.data;
      })
    );
  }

  removeBannerImage(formData:any): Observable<AddDefaultBanner> {
    const apiUrl = this.defaultUrl + 'admin/bannerImage/removeBannerImage';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(map(response => {
      Logging.debug(response);
      return response.data;
    }));
  }
  uploadCourseThumbnail(file:any) {
    const apiUrl = `${this.defaultUrl}admin/video/uploadCourseThumbnail`;
    return this.http.post<any>(apiUrl, file).pipe(
      map((response) => {
        return response
      })
    );
  }


  addBanner(formData:any): Observable<AddDefaultBanner> {
    const apiUrl = this.defaultUrl + 'admin/bannerImage/addBanner';
    return this.http.post<ApiResponse>(apiUrl, formData).pipe(map(response => {
      Logging.debug(response);
      return response.data;
    }));
  }
}
