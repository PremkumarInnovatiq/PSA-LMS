/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '@core/models/user.model';
import { StudentService } from '@core/service/student.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent {
  stdForm: UntypedFormGroup;
  files: any;
  fileName: any;
  breadscrums = [
    {
      title: 'Add Student',
      items: ['Student'],
      active: 'Add Student',
    },
  ];
  constructor(private fb: UntypedFormBuilder, private StudentService:StudentService, private router: Router) {
    // this.stdForm = this.fb.group({
    //   name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    //   last_name: [''],
    //   rollNo: ['', [Validators.required]],
    //   gender: ['', [Validators.required]],
    //   email: [
    //     '',
    //     [Validators.required, Validators.email, Validators.minLength(5)],
    //   ],
    //   mobile: ['', [Validators.required]],
    //   rDate: ['', [Validators.required]],
    //   department: [''],
    //   parentName: ['', [Validators.required]],
    //   parentNo: [''],
    //   dob: ['', [Validators.required]],
    //   bGroup: [''],
    //   address: [''],
    //   uploadFile: [''],
    // });



    this.stdForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last_name: [''],
      rollNo: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      password: ['', ],
      conformPassword: ['',],
      qualification: [''],
      department: [''],
      address: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      parentsName: ['', [Validators.required]],
      parentsPhnoe: [''],
      dob: ['', [Validators.required]],
      joiningDate:['', [Validators.required]],
      education: [''],
      avatar: [''],
      blood_group: [''],
    });
  }

  onFileUpload(event:any) {
    this.fileName = event.target.files[0].name;
    this.files=event.target.files[0]
    // this.authenticationService.uploadVideo(event.target.files[0]).subscribe(
    //   (response: any) => {
    //             //Swal.close();
    //             console.log("--------",response)
    //   },
    //   (error:any) => {

    //   }
    // );


  }
  onSubmit() {
    console.log('Form Value', this.stdForm.value);
    if(!this.stdForm.invalid){
    this.StudentService.uploadVideo(this.files).subscribe(
      (response: any) => {
        const inputUrl = response.inputUrl;

        const userData: Student = this.stdForm.value;
        //this.commonService.setVideoId(videoId)

        userData.avatar = inputUrl;
        userData.filename= response.filename
        userData.type = "Student";
        userData.role = "Student";

        //this.currentVideoIds = [...this.currentVideoIds, ...videoId]
        // this.currentVideoIds.push(videoId);
        this.createInstructor(userData);

        Swal.close();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: 'An error occurred while uploading the video',
        });
        Swal.close();
      }
    );
    }
  }

  private createInstructor(userData: Student): void {
    this.StudentService.CreateStudent(userData).subscribe(
      () => {
        Swal.fire({
          title: "Successful",
          text: "Student created successfully",
          icon: "success",
        });
        //this.fileDropEl.nativeElement.value = "";
      this.stdForm.reset();
      //this.toggleList()
      this.router.navigateByUrl('/admin/teachers/all-teachers');
      },
      (error) => {
        Swal.fire(
          "Failed to create course kit",
          error.message || error.error,
          "error"
        );
      }
    );
  }
}


