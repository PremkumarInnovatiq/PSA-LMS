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
}
