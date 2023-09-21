import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService, Role } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AuthenService } from '@core/service/authen.service';
import { UtilsService } from '@core/service/utils.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  isLoading= false;
  error = '';
  hide = true;
  isSubmitted = false;
  email:any;
  password:any;
  emailError: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private authenticationService:AuthenService,
    public utils: UtilsService,
    private toaster: ToastrService
  ) {
    super();

    this.authForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)] ],
      password: ['', Validators.required],

    });
  }

  ngOnInit() {
    this.startSlideshow();
   
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get('email')?.setValue('admin1@tms.com');
    this.authForm.get('password')?.setValue('12345678');
  }
  studentSet() {
    this.authForm.get('email')?.setValue('teo.su@yahooo.com');
    this.authForm.get('password')?.setValue('12345678');
  }
  teacherSet() {
    this.authForm.get('email')?.setValue('timothy.chow@yahooo.com');
    this.authForm.get('password')?.setValue('12345678');
  }
  loginUser(){
    // if(this.authForm.valid){
  let formData =this.authForm.getRawValue()
  console.log(formData)
  this.isLoading = true;

  this.authenticationService.loginUser(formData.email.trim(), formData.password.trim())
        .subscribe(user => {
          setTimeout(() => {
            const role = this.authenticationService.currentUserValue.user.role;
            if (role === Role.All || role === Role.Admin) {
              this.router.navigate(['/admin/dashboard/main']);
            } else if (role === Role.Instructor) {
              this.router.navigate(['/teacher/dashboard']);
            } else if (role === Role.Student) {
              this.router.navigate(['/student/dashboard']);
            } else {
              this.router.navigate(['/authentication/signin']);
            }
            this.loading = false;
          }, 100);            this.authenticationService.saveUserInfo(user);
        }, (error) => {
          this.isLoading = false;
          this.email = error;
            this.isSubmitted=true;
          setTimeout(()=>{
            this.email=''
          },2500)


          }

          )
        // } else {
        //   this.isSubmitted= true;
        // }
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {
      this.subs.sink = this.authService
        .login(this.f['username'].value, this.f['password'].value)
        .subscribe({
          next: (res) => {
            if (res) {
              setTimeout(() => {
                const role = this.authService.currentUserValue.role;
                if (role === Role.All || role === Role.Admin) {
                  this.router.navigate(['/admin/dashboard/main']);
                } else if (role === Role.Instructor) {
                  this.router.navigate(['/teacher/dashboard']);
                } else if (role === Role.Student) {
                  this.router.navigate(['/student/dashboard']);
                } else {
                  this.router.navigate(['/authentication/signin']);
                }
                this.loading = false;
              }, 1000);
            } else {
              this.error = 'Invalid Login';
            }
          },
          error: (error) => {
            this.error = error;
            this.submitted = false;
            this.loading = false;
          },
        });
    }
  }
  images: string[] = ['/assets/images/login/Image 1- PSA.jpg', '/assets/images/login/Image 2- PSA.jpg', '/assets/images/login/Image 3.jpg',];
    currentIndex = 0;

  startSlideshow() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 4000);
  }
}
