import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Staff } from './staff.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment';
import { ApiResponse } from '@core/models/response';
@Injectable()
export class StaffService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/staff.json';
  private apiUrl = 'http://localhost:3000/api/';
  private prefix: string = environment.apiUrl;
  isTblLoading = true;
  dataChange: BehaviorSubject<Staff[]> = new BehaviorSubject<Staff[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Staff;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Staff[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllStaffs(): void {
    this.subs.sink = this.httpClient.get<Staff[]>(this.API_URL).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  }

  saveStaff(course: any) {
    const apiUrl = `${this.prefix}admin/staff/`;
    return this.httpClient
      .post<ApiResponse>(apiUrl, course)
      .pipe(map((response) => { }));
  }

  addStaff(staff: Staff): void {
    this.dialogData = staff;

    // this.httpClient.post(this.API_URL, staff)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = staff;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }
  updateStaff(staff: Staff): void {
    this.dialogData = staff;

    // this.httpClient.put(this.API_URL + staff.id, staff)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = staff;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteStaff(id: number): void {
    console.log(id);

    // this.httpClient.delete(this.API_URL + id)
    //     .subscribe({
    //       next: (data) => {
    //         console.log(id);
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
}
