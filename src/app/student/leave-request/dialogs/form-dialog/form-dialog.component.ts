import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { LeaveRequestService } from "../../leave-request.service";
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from "@angular/forms";
import { LeaveRequest } from "../../leave-request.model";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { ClassService } from "app/admin/schedule-class/class.service";

export interface DialogData {
  id: number;
  action: string;
  leaveRequest: LeaveRequest;
}

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.scss"],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "en-GB" }],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  leaveRequestForm: UntypedFormGroup;
  leaveRequest: LeaveRequest;
  studentApprovedClasses: any;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public leaveRequestService: LeaveRequestService,
    private fb: UntypedFormBuilder,
    private classService: ClassService
  ) {
    this.getApprovedCourse();
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = "Edit Leave Request";
      this.leaveRequest = data.leaveRequest;
    } else {
      this.dialogTitle = "New Leave Request";
      const blankObject = {} as LeaveRequest;
      this.leaveRequest = new LeaveRequest(blankObject);
    }
    this.leaveRequestForm = this.createContactForm();
  }
  formControl = new UntypedFormControl("", [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }
  getApprovedCourse(){
    let studentId=localStorage.getItem('id')
    const payload = { studentId: studentId, status: 'approved' };
    this.classService.getStudentRegisteredClasses(payload).subscribe(response =>{
     this.studentApprovedClasses = response.data.docs;
    })
  }
  
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.leaveRequest.id],
      className: [this.leaveRequest.className, [Validators.required]],
      applyDate: [this.leaveRequest.applyDate, [Validators.required]],
      fromDate: [this.leaveRequest.fromDate, [Validators.required]],
      toDate: [this.leaveRequest.toDate, [Validators.required]],
      reason: [this.leaveRequest.reason, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    let payload={
      className:this.leaveRequestForm.value.className.classId.courseId.title,
      applyDate:this.leaveRequestForm.value.applyDate,
      fromDate:this.leaveRequestForm.value.fromDate,
      toDate:this.leaveRequestForm.value.toDate,
      reason:this.leaveRequestForm.value.reason,
      instructorId:this.leaveRequestForm.value.class.classId.sessions[0].instructorId,
      classId:this.leaveRequestForm.value.class.classId.id,
      studentId:this.leaveRequestForm.value.class.studentId.id

    }
    this.leaveRequestService.addLeaveRequest(payload);
  }
}
