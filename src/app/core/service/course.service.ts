
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, map } from "rxjs";
import { ApiResponse } from "@core/models/response";
import { environment } from "environments/environment";
import { CourseModel, CoursePaginationModel } from "@core/models/course.model";
import { FundingGrant, Instructor, MainCategory, SubCategory, Survey } from "@core/models/course.model";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api/';
  private prefix: string = environment.apiUrl;
  defaultUrl = environment['apiUrl'];
  dataChange: BehaviorSubject<CourseModel[]> = new BehaviorSubject<CourseModel[]>([]);

  constructor(private _Http : HttpClient) {

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
    const apiUrl = this.defaultUrl+'admin/courses-new';
    console.log("==new=",apiUrl)
    return this._Http.get<ApiResponse>(apiUrl, {
      params: this.buildParams(filter),
    });
  }
  getCount(
    filter?: Partial<CoursePaginationModel>
  ): Observable<ApiResponse> {
    const apiUrl = this.defaultUrl+'admin/courses-new/count';
    console.log("==new=",apiUrl)
    return this._Http.get<ApiResponse>(apiUrl);
  }
  getMainCategories(): Observable<MainCategory[]> {
    const apiUrl = `${this.prefix}admin/main-category/`;
    return this._Http.get<any>(apiUrl).pipe(map((response:any) => response.data.docs));

  }
  getSubCategories(): Observable<SubCategory[]> {
    const apiUrl = `${this.prefix}admin/sub-category/`;
    return this._Http.get<any>(apiUrl).pipe(map((response:any) => response.docs));
  }
  getFundingGrant(): Observable<FundingGrant[]> {
    const apiUrl = `${this.prefix}admin/funding-grant/`;
    return this._Http.get<any>(apiUrl).pipe(map((response:any) => response.data));
  }
  getSurvey(): Observable<Survey[]> {
    const apiUrl = `${this.prefix}admin/survey/`;
    return this._Http
      .get<any>(apiUrl)
      .pipe(map((response:any) => response.data?.docs));
  }
  getInstructors(): Observable<Instructor[]> {
    const apiUrl = `${this.prefix}admin/instructor/`;
    return this._Http
      .get<any>(apiUrl)
      .pipe(map((response:any) => response.data?.docs));
  }
  getCourseKit(filter?: Partial<CoursePaginationModel>): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/course-kit/`;
    return this._Http
      .get<ApiResponse>(apiUrl, { params: this.buildParams(filter) })
      .pipe(
        map((response:any) => {
          return response.data;
        })
      );
  }
  saveCourse(course: any) {
    const apiUrl = `${this.prefix}admin/courses-new/`;
    return this._Http
      .post<ApiResponse>(apiUrl, course)
      .pipe(map((response) => { }));
  }
  getCourseById(id: string) {
    const apiUrl = `${this.prefix}admin/courses-new/${id}`;
    return this._Http.get<CourseModel>(apiUrl).pipe(map((response) => response));
  }
  updateCourse(course:any) {
    const apiUrl = `${this.prefix}admin/courses-new/${course.id}`;
    return this._Http
      .put<ApiResponse>(apiUrl, course)
      .pipe(map((response) => { }));
  }
  deleteCourse(id: string) {
    const apiUrl = `${this.prefix}admin/courses-new/${id}`;
    return this._Http
      .delete<CourseModel>(apiUrl)
      .pipe(map((response) => response));
  }
}



