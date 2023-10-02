import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { StudentsService } from '../../students.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Students } from '../../students.model';
import { formatDate } from '@angular/common';
import { Student } from '@core/models/user.model';
import Swal from 'sweetalert2';

export interface DialogData {
  id: number;
  action: string;
  students: Students;
}

@Component({
  selector: 'app-form-dialog:not(f)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  stdForm: UntypedFormGroup;
  students: Students;
  userId:any ;
  fileName:any;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public studentsService: StudentsService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.students.name;
      this.students = data.students;
      this.userId = data.id
    } else {
      this.dialogTitle = 'New Students';
      const blankObject = {} as Students;
      this.students = new Students(blankObject);
    }
    this.stdForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.students.id],
      img: [this.students.img],
      name: [this.students.name],
      email: [
        this.students.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      date: [
        formatDate(this.students?.joiningDate || '2023-09-30', 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      gender: [this.students.gender],
      mobile: [this.students.mobile],
      department: [this.students.department],
      rollNo: [this.students.rollNo],
    });
  }
  submit() {

    console.log('Form Value', this.createContactForm().value);
    if(this.createContactForm().valid){
      // this.instructor.uploadVideo(this.files).subscribe(
      //   (response: any) => {
      //     const inputUrl = response.inputUrl;

          const userData: Student = this.createContactForm().value;
          //this.commonService.setVideoId(videoId)

          //userData.avatar = inputUrl;
          userData.filename= this.fileName
          userData.type = "Student";
          userData.role = "Student";

          //this.currentVideoIds = [...this.currentVideoIds, ...videoId]
          // this.currentVideoIds.push(videoId);
          this.updateInstructor(userData);

          Swal.close();
       // },

    }

  }
  private updateInstructor(userData: Student): void {
    this.studentsService.updateStudent(this.userId,userData).subscribe(
      () => {
        Swal.fire({
          title: "Successful",
          text: "Instructor update successfully",
          icon: "success",
        });
        //this.fileDropEl.nativeElement.value = "";
      this.createContactForm().reset();
      //this.toggleList()
      // this.router.navigateByUrl('/admin/teachers/all-teachers');
      },
      (error: { message: any; error: any; }) => {
        Swal.fire(
          "Failed to create course kit",
          error.message || error.error,
          "error"
        );
      }
    );
  }





  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.studentsService.addStudents(this.stdForm.getRawValue());
  }
}
