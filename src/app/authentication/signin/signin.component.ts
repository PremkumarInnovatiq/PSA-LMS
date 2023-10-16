import { Component, OnInit, Input,OnChanges } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService, Role } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AuthenService } from '@core/service/authen.service';
import { LanguageService } from '@core/service/language.service';
import { UtilsService } from '@core/service/utils.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  // strength: string = '';
  authForm!: UntypedFormGroup;
  langStoreValue?: string;
  submitted = false;
  loading = false;
  isLoading= false;
  error = '';
  hide = true;
  isSubmitted = false;
  email:any;
  password:any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private authenticationService:AuthenService,
    public utils: UtilsService,
    private translate: LanguageService
  ) {
    super();

    this.authForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)] ],
      password: ['', Validators.required],

    });
  }
  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
    { text: 'Chinese', flag: 'assets/images/flags/spain.svg', lang: 'ch' },
    { text: 'Tamil', flag: 'assets/images/flags/germany.svg', lang: 'ts' },
  ];

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
              this.router.navigate(['/instructor/dashboard']);
            } else if (role === Role.Student) {
              this.router.navigate(['/student/dashboard']);
            } else if (role === Role.TrainingAdministrator) {
              this.router.navigate(['/trainingadministrator/dashboard']);
            } else if (role === Role.Supervisor) {
              this.router.navigate(['/supervisor/dashboard']);
            } else if (role === Role.HOD) {
              this.router.navigate(['/hod/dashboard']);
            } else if (role === Role.TrainingCoordinator) {
              this.router.navigate(['/trainingcoordinator/dashboard']);
            } else if (role === Role.CourseManager) {
              this.router.navigate(['/coursemanager/dashboard']);
            }  else {
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
  }
  setLanguage(event: any) {  
    console.log("=======",event)
    // this.countryName = text;
    // this.flagvalue = flag;
    this.langStoreValue = event.target.value;
    this.translate.setLanguage(event.target.value);
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
                  this.router.navigate(['/instructor/dashboard']);
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
  // ngOnChanges() {
  //   this.updateStrengthIndicator();
  // }

  // private calculatePasswordStrength(password: string): string {
  //   let minLength = 8;
  //   let lengthCount = 1;
  //   let upperCaseCount = 1;
  //   let lowerCaseCount = 1;
  //   let numbersCount = 1;
  //   let specialCharsCount = 1;
  
  //   const upperCaseRegex = /[A-Z]/;
  //   const lowerCaseRegex = /[a-z]/;
  //   const numbersRegex = /[0-9]/;
  //   const specialCharsRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
  
  //   for (const char of password) {
  //     lengthCount++;
  //     if (upperCaseRegex.test(char)) {
  //       upperCaseCount++;
  //     } else if (lowerCaseRegex.test(char)) {
  //       lowerCaseCount++;
  //     } else if (numbersRegex.test(char)) {
  //       numbersCount++;
  //     } else if (specialCharsRegex.test(char)) {
  //       specialCharsCount++;
  //     }
  //   }

  //   if (lengthCount < minLength) {
  //     return 'weak';
  //   }
  
  //   const typesCount = [upperCaseCount, lowerCaseCount, numbersCount, specialCharsCount].filter(count => count > 0).length;
  
  //   if (typesCount < 3) {
  //     return 'fair';
  //   }
  
  //   return 'strong';
  // }

  // private updateStrengthIndicator() {
  //   this.strength = this.calculatePasswordStrength(this.password);
  // }
}
