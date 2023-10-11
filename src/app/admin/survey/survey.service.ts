import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment';
import { SurveyBuilderModel } from './survey.model';
import { ApiResponse } from '@core/models/response';
import { Logger } from '@core/service/logger.service';

const Logging = new Logger('SurveyService');

@Injectable({
  providedIn: 'root'
})
export class SurveyService extends UnsubscribeOnDestroyAdapter {
  private prefix: string = environment["apiUrl"];
  isTblLoading = true;
  dataChange: BehaviorSubject<SurveyBuilderModel[]> = new BehaviorSubject<SurveyBuilderModel[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: SurveyBuilderModel;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): SurveyBuilderModel[] {
    // console.log(this.dataChange.value)
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }


  getAllSurvey(): void {
    const apiUrl = `${this.prefix}admin/survey-builder`;
    this.subs.sink = this.httpClient.get<SurveyBuilderModel>(apiUrl).subscribe({
      next: (response) => {
        this.isTblLoading = false;
        this.dataChange.next(response.data.docs);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  }
  addSurveyBuilder(formData:any): Observable<any> {
    return this.httpClient.post<ApiResponse>(`${this.prefix}admin/survey-builder`, formData).pipe(map((response) => {
      return response.data;
    }));
  }
  updateSurveyBuilders(data: FormData, sId:any): Observable<any> {
    return this.httpClient.put<ApiResponse>(`${this.prefix}admin/survey-builder/${sId}`, data).pipe(map(response => {
      Logging.debug(response.data);
      return response.data;
    }));
  }

  deleteSurveyBuilders(sId:any): Observable<any> {
    const apiUrl = `${this.prefix}admin/survey-builder/${sId}`;
    return this.httpClient.delete<ApiResponse>(apiUrl);
  }

  getSurveyBuildersById(surveyBuilderId:any): Observable<any> {
    const apiUrl = `${this.prefix}admin/survey-builder/${surveyBuilderId}`;
    return this.httpClient
      .get<ApiResponse>(apiUrl, {
        params: {}
      })
      .pipe(map((response) => response));
  }
  // getSurveyBuilders(filter?: Partial<SurveyBuilderPaginationModel>): Observable<ApiResponse> {
  //   const apiUrl = this.defaultUrl + `admin/survey-builder`;
  //   return this.http
  //     .get<ApiResponse>(apiUrl, {
  //       params: this.buildParams(filter)
  //     })
  // }
}
