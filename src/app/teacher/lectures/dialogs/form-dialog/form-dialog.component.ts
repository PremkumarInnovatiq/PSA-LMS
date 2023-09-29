import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { LecturesService } from "../../lectures.service";
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from "@angular/forms";
import { Lectures } from "../../lectures.model";
import { MAT_DATE_LOCALE } from "@angular/material/core";

export interface DialogData {
  id: number;
  action: string;
  lectures: Lectures;
}

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.scss"],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "en-GB" }],
})
export class FormDialogComponent {
  statusOptions: string[] = ['Confirm', 'Cancelled', 'Pending'];
  action: string;
  dialogTitle: string;
  lecturesForm: UntypedFormGroup;
  lectures: Lectures;
  classId:any
  _id:any
  
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public lecturesService: LecturesService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.lectures.sName;
      this.lectures = data.lectures;
      this.classId=data.lectures.classId
      this._id=data.lectures._id
    } else {
      this.dialogTitle = "New Lectures";
      const blankObject = {} as Lectures;
      this.lectures = new Lectures(blankObject);
    }
    this.lecturesForm = this.createContactForm();
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
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      //id: [this.lectures.id],
      courseName: [this.lectures.courseName, [Validators.required]],
      courseCode: [this.lectures.courseCode, [Validators.required]],
      sessionStartDate: [this.lectures.sessionStartDate, [Validators.required]],
      sessionStartTime: [this.lectures.sessionStartTime, [Validators.required]],
      status: [this.lectures.status, [Validators.required]],
    });
  }
  submit() {
    console.log("====gopal====")
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    console.log("====fopa====")
    let data=this.lecturesForm.value
    data['classId']=this.classId
    data['_id']=this._id
    this.lecturesService.updateLectures(data);
    //console.log("==data1=",data1)
    //this.lecturesService.addLectures(this.lecturesForm.getRawValue());
  }
}
