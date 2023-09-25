/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { ApiResponse } from "@core/models/response";
import { environment } from "environments/environment";
import { CoursePaginationModel } from "@core/models/course.model";
import { BehaviorSubject, Observable, map } from "rxjs";
import { ClassListingModel, ClassModel, CourseTitleModel, InstructorList, LabListModel, StudentApproval } from "./class.model";
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ApiResponse } from "@core/models/response";

@Injectable({
  providedIn: 'root'
})
export class ClassService extends UnsubscribeOnDestroyAdapter {
  private prefix: string = environment["apiUrl"];
  isTblLoading = true;
  dataChange: BehaviorSubject<ClassModel[]> = new BehaviorSubject<ClassModel[]>([]);
  constructor(private http: HttpClient) {
    super();
  }
  get data(): ClassModel[] {
    return this.dataChange.value;
  }
  private buildParams(filter?: Partial<CoursePaginationModel>): HttpParams {
    let params = new HttpParams();
    if (filter) {
      if (filter.sortBy)
        params = params.set("sortBy", `${filter.sortByDirection == "asc" ? "+" : "-"}${filter.sortBy}`);
      if (filter.limit) params = params.set("limit", filter.limit?.toString());
      if (filter.page) params = params.set("page", filter.page?.toString());
      if (filter.filterText) params = params.set("title", filter.filterText?.toString());
    }
    return params;
  }


  getClassListWithPagination(
    filter?:Partial<CoursePaginationModel>): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/class/`;
    return this.http.get<ApiResponse>(apiUrl, { params: this.buildParams(filter) })
  }

  private buildRegisteredClassesParams(page: number, limit: number, filterText?: string): HttpParams {
    let params = new HttpParams();

    page = page ?? 1;
    limit = limit ?? 10;

    params = params.set("limit", limit.toString());
    params = params.set("page", page.toString());
    params = params.set("status", "registered,withdraw");
    if (filterText) {
      params = params.set("title", filterText);
    }

    return params;
  }

  getRegisteredClasses(page: number, limit: number, filterText? : string): Observable<any> {
    const apiUrl = `${this.prefix}admin/studentClasses`;
    return this.http.get<any>(apiUrl, { params: this.buildRegisteredClassesParams(page, limit, filterText) });
  }
  saveApprovedClasses(id: string, item: StudentApproval): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/studentClasses/${id}`;
    return this.http.put<ApiResponse>(apiUrl, item);
  }
  getClassList(filter?:any): Observable<ClassListingModel> {
    const apiUrl = `${this.prefix}admin/class/`;
    return this.http.get<ApiResponse>(apiUrl, { params: this.buildParams(filter) }).pipe(
      map((response:any) => {
        return response.data;
      })
    );
  }
//getById
  getClassById(id: string) {
    const apiUrl = `${this.prefix}admin/class/${id}`;
    return this.http.get<any>(apiUrl).pipe(map((response) => response.data));
  }
  //delete
  deleteClass(id: any): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${environment.apiUrl}admin/class/${id}`).pipe(
      map((response) => {
        return response.data;
      })
    );
  }
  //update
  updateClass(id: string, formData: any): Observable<ApiResponse> {
    const apiUrl = `${this.prefix}admin/class/${id}`;
    return this.http.put<ApiResponse>(apiUrl, formData).pipe(
      map((response) => {
        return response.data;
      })
    );
  }
//getAllTitle
getAllCoursesTitle(status: string): Observable<CourseTitleModel[]> {
  const apiUrl = `${this.prefix}admin/courses-new/title?status=${status}`;
  return this.http.get<ApiResponse>(apiUrl).pipe(map((response) => response.data));
}
//getAllInstructor
getAllInstructor(): Observable<InstructorList[]> {
  const apiUrl = `${this.prefix}admin/instructor/name/`;
  return this.http.get<ApiResponse>(apiUrl).pipe(map((response) => response.data));
}
//getAllLab
getAllLaboratory(): Observable<LabListModel[]> {
  const apiUrl = `${this.prefix}admin/laboratory`;
  return this.http
    .get<ApiResponse>(apiUrl, { params: this.buildParams() })
    .pipe(map((response) => response.data?.docs));
}
validateLaboratory(
  id?: string,
  startdate?: string,
  enddate?: string,
  starttime?: string,
  endtime?: string
): Observable<ApiResponse> {
  const apiUrl = `${this.prefix}admin/class/lab/${id}/check-available?sessionStartDate=${startdate}&sessionStartTime=${starttime}&sessionEndDate=${enddate}&sessionEndTime=${endtime}`;
  return this.http.get<ApiResponse>(apiUrl).pipe(map((response) => response));
}

validateInstructor(
  id?: string,
  startdate?: string,
  enddate?: string,
  starttime?: string,
  endtime?: string
): Observable<ApiResponse> {
  const apiUrl = `${this.prefix}admin/class/instructor/${id}/check-available?sessionStartDate=${startdate}&sessionStartTime=${starttime}&sessionEndDate=${enddate}&sessionEndTime=${endtime}`;
  return this.http.get<ApiResponse>(apiUrl).pipe(map((response) => response));
}
saveClass(formData: any): Observable<ApiResponse> {
  const apiUrl = `${this.prefix}admin/class/`;
  return this.http.post<ApiResponse>(apiUrl, formData).pipe(
    map((response) => {
      return response.data;
    })
  );
}
}



