import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { LanguageService } from '@core/service/language.service';
import { RegistrationService } from '@core/service/registration.service';
import { Users } from '@core/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  
  userData = { username: '', email: '', password: '', cpassword: '', type:'',role:''};
  message = '';
  loading = false;
  isLoading = false;
  error = '';
  isSubmitted = false;
  email: any;
  authForm!: UntypedFormGroup;
  langStoreValue?: string;
  submitted = false;
  returnUrl!: string;
  hide = true;
  chide = true;
  user: any;
  passwordMatchValidator: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private translate: LanguageService,
    private registration: RegistrationService
  ) { 

    this.authForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)] ],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
      

    });
  }


  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
    { text: 'Chinese', flag: 'assets/images/flags/spain.svg', lang: 'ch' },
    { text: 'Tamil', flag: 'assets/images/flags/germany.svg', lang: 'ts' },
  ];
  ngOnInit() {
    this.startSlideshow()
    this.authForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
    },{ validators: this.passwordMatchValidator
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    
    if (this.authForm.valid) {
      const userData: Users = this.authForm.value;
      userData.type = 'Student';
      userData.role = 'Student';
      this.registration.registerUser(userData).subscribe(
        (response) => {
          Swal.fire({
            title: 'Registration Successful',
            text: 'Student created successfully',
            icon: 'success',
          });
          this.router.navigate(['/authentication/signin']);
        },
        (error) => {
        }
      );
    }
    this.submitted = true;
    if (this.authForm.invalid) {
      return;
    } else {
    }
  }
  

  setLanguage(event: any) {
    console.log("=======", event)
    // this.countryName = text;
    // this.flagvalue = flag;
    this.langStoreValue = event.target.value;
    this.translate.setLanguage(event.target.value);
  }
  images: string[] = ['/assets/images/login/Image 1- PSA.jpg', '/assets/images/login/Image 2- PSA.jpg', '/assets/images/login/register-img.jpg',];
  currentIndex = 0;
  startSlideshow() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 4000);
  }
}
