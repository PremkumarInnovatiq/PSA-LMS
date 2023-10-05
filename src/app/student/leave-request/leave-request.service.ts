import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LeaveRequest } from './leave-request.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { environment } from 'environments/environment.development';
@Injectable()
export class LeaveRequestService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/stdLeaveReq.json';
  defaultUrl = environment['apiUrl'];

  isTblLoading = true;
  dataChange: BehaviorSubject<LeaveRequest[]> = new BehaviorSubject<
    LeaveRequest[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: LeaveRequest;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): LeaveRequest[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllLeavesByStudentId(id:any,studentId:any): void {
    const apiUrl = `${this.defaultUrl}admin/leave/${id}/${studentId}`;
    this.subs.sink = this.httpClient
      .get<any>(apiUrl)
      .subscribe({
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

  addLeaveRequest(leaveRequest: any): void {
    // this.dialogData = leaveRequest;
    const apiUrl = `${this.defaultUrl}admin/leave`;
    this.httpClient.post(apiUrl, leaveRequest)
      .subscribe({
        next: (data) => {
          // this.dialogData = leaveRequest;
        },
        error: (error: HttpErrorResponse) => {
           // error code here
        },
      });
  }
  updateLeaveRequest(leaveRequest: LeaveRequest): void {
    this.dialogData = leaveRequest;

    // this.httpClient.put(this.API_URL + leaveRequest.id, leaveRequest)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = leaveRequest;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteLeaveRequest(id: number): void {
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
