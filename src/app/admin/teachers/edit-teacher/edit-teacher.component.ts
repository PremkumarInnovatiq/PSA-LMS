import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { forkJoin } from 'rxjs';
import { TeachersService } from '../all-teachers/teachers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorService } from '@core/service/instructor.service';
import { Users } from '@core/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.scss'],
})
export class EditTeacherComponent {
  @ViewChild('fileInput') fileInput: ElementRef | undefined
  proForm: UntypedFormGroup;
 
  breadscrums = [
    {
      title: 'Edit Instructor',
      items: ['Instructor'],
      active: 'Edit Instructor',
    },
  ];
  userId: any;
  subscribeParams: any;
  user: any;
  fileName: any;
  files: any;
  
  constructor(private fb: UntypedFormBuilder,public teachersService: TeachersService,private activatedRoute: ActivatedRoute,
    
    private instructor: InstructorService,private router:Router) {
    //this.proForm = this.createContactForm();
    this.subscribeParams = this.activatedRoute.params.subscribe((params:any) => {
      this.userId = params.id;
    });
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
      education: [''],
      joiningDate:['', [Validators.required]],
      
      avatar: [''],
    });
  
  }
  onSubmit() {
    console.log('Form Value', this.proForm.value);
    if(this.proForm.valid){
      // this.instructor.uploadVideo(this.files).subscribe(
      //   (response: any) => {
      //     const inputUrl = response.inputUrl;
          
          const userData: Users = this.proForm.value;
          //this.commonService.setVideoId(videoId)
  
          //userData.avatar = inputUrl;
          userData.filename= this.fileName
          userData.type = "Trainers";
          userData.role = "Instructor";
  
          //this.currentVideoIds = [...this.currentVideoIds, ...videoId]
          // this.currentVideoIds.push(videoId);
          this.updateInstructor(userData);
  
          Swal.close();
       // },
        
    }
  }
  private updateInstructor(userData: Users): void {
    this.teachersService.updateUser(this.userId,userData).subscribe(
      () => {
        Swal.fire({
          title: "Successful",
          text: "Instructor update successfully",
          icon: "success",
        });
        //this.fileDropEl.nativeElement.value = "";
      this.proForm.reset();
      //this.toggleList()
      this.router.navigateByUrl('/admin/teachers/all-teachers');
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
ngOnInit(): void {
    //this.setup()
this.getData();
}
getData(){
  forkJoin({
    course: this.teachersService.getUserById(this.userId),
    
  }).subscribe((response: any) => {
    if(response){
      console.log("response?.course?.education",response?.course?.education)
      console.log("====REsponnse===Gopal==",response)
      //this.user = response.course;
      
      console.log("response?.course?.education",response?.course?.education)
      this.fileName =response?.course?.filename

      
     
      // this.fileName=response?.course?.videoLink?response?.course?.videoLink[0].filename:null
      // let startingDate=response?.course?.startDate;
      // let endingDate=response?.course?.endDate;
      // let startTime=response?.course?.startDate.split("T")[1];
      // let startingTime=startTime?.split(".")[0];
      // let endTime=response?.course?.endDate.split("T")[1];
      // let endingTime=endTime?.split(".")[0];

      this.proForm.patchValue({
        education:response?.course?.education,
        name: response?.course?.name,
        last_name: response?.course?.last_name,
        gender: response?.course?.gender,
        mobile: response?.course?.mobile,
        password: response?.course?.password,
        conformPassword: response?.course?.conformPassword,
        email:response?.course?.email,
        qualification:response?.course?.qualification,
        dob:response?.course?.dob,
        address:response?.course?.address,
        department:response?.course?.department,
        joiningDate:response?.course?.joiningDate,
        avatar:response?.course?.avatar,
        
        
        
      });
      

    }
   
    
    
    
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
cancel() {
  
  window.history.back();
}

  
}
