import { Component } from '@angular/core';
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { InstructorService } from '@core/service/instructor.service';
//import { Users } from ""
import { Users } from '@core/models/user.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss'],
})
export class AddTeacherComponent {
  proForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Instructor',
      items: ['Instructor'],
      active: 'Add Instructor',
    },
  ];
  files: any;
  fileName: any;
  constructor(private fb: UntypedFormBuilder,
    private instructor: InstructorService,
    private router:Router) {
    this.proForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last_name: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
      conformPassword: ['', [Validators.required]],
      qualification: [''],
      department: [''],
      address: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      dob: ['', [Validators.required]],
      joiningDate:['', [Validators.required]],
      education: [''],
      avatar: [''],
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
    console.log('Form Value', this.proForm.value);
    if(!this.proForm.invalid){
    this.instructor.uploadVideo(this.files).subscribe(
      (response: any) => {
        const inputUrl = response.inputUrl;
        
        const userData: Users = this.proForm.value;
        //this.commonService.setVideoId(videoId)

        userData.avatar = inputUrl;
        userData.filename= response.filename
        userData.type = "Trainers";
        userData.role = "Instructor";

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
  
  private createInstructor(userData: Users): void {
    this.instructor.CreateUser(userData).subscribe(
      () => {
        Swal.fire({
          title: "Successful",
          text: "Instructor created successfully",
          icon: "success",
        });
        //this.fileDropEl.nativeElement.value = "";
      this.proForm.reset();
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
  cancel(){
    this.router.navigateByUrl('/admin/teachers/all-teachers');

  }
}
