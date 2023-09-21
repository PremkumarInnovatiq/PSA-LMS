import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormControl,
  FormGroup
} from '@angular/forms';
import { Certificate, CourseKit, CourseUploadData, FundingGrant, Instructor, MainCategory, SubCategory, Survey } from '@core/models/course.model';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { CourseService } from '@core/service/course.service';
import { forkJoin } from 'rxjs';
import { CertificateService } from '@core/service/certificate.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent implements OnInit {
  mainCategories!: MainCategory[];
  subCategories!: SubCategory[];
  allSubCategories!: SubCategory[];
  // courseForm: UntypedFormGroup;
  mainCategoryControl!: FormControl;
  bulkUploadData: CourseUploadData[] = [];
  subCategoryControl!: FormControl;
  course_duration_in_days!:number;
  training_hours!:number;
  fee!:number;
  currencyControl!: FormControl;
  // secondFormGroup!: FormGroup;
  pdu_technical!:number;
  pdu_leadership!:number;
  image_link: any;
  uploadedImage: any;
  uploaded: any;
  fundingGrant!: FormControl;
  fundingGrants!: FundingGrant[];
  survey!: Survey[];
  surveyCategoryControl!: FormControl;
  instuctorCategoryControl!: FormControl;
  courseKitCategoryControl!: FormControl;
  certificatesCategoryControl!: FormControl;
  instructors!: Instructor[];
  courseKits!: CourseKit[];
  certificates!:Certificate[];
  next = true;
  isSubmitted=false;
  isWbsSubmitted=false;
  courseAdded=false;
  disableNextBtn: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  editUrl: any;
  viewUrl: any;

  breadscrums = [
    {
      title: 'Create Course',
      items: ['Course'],
      active: 'Create Course',
    },
  ];
  
  constructor(private router: Router,private fb: FormBuilder, private _formBuilder: FormBuilder,
    private courseService: CourseService,
    private certificateService:CertificateService,
    ) {
      let urlPath = this.router.url.split('/')
    this.editUrl = urlPath.includes('edit'); 
    // this.viewUrl = urlPath.includes('view'); 
      this.firstFormGroup = this._formBuilder.group({
        title: ['', [Validators.required]],
        courseCode: ['', [Validators.required]],
        main_category: ['', [Validators.required]],
        sub_category: ['', [Validators.required]],
        fee: new FormControl(''),
        currency_code: new FormControl('', []),
        course_duration_in_days: new FormControl(this.course_duration_in_days),
        training_hours: new FormControl(this.training_hours),        
        skill_connect_code: new FormControl(''),
        course_description: new FormControl(''),
        course_detailed_description: new FormControl(''),
      });
      this.secondFormGroup = this._formBuilder.group({
        pdu_technical: new FormControl(this.pdu_technical),
      pdu_leadership: new FormControl(this.pdu_leadership),
      pdu_strategic: new FormControl(''),
      image_link: new FormControl('', [Validators.maxLength(255)]),
      website_link: new FormControl('', []),
      funding_grant: new FormControl('',[Validators.required]),
      survey: new FormControl('',[Validators.required]),
      id: new FormControl(''),
      course_instructor: new FormControl('', [Validators.required]),
      // assign_exam: new FormControl('', []),
      course_kit: new FormControl('', [Validators.required]),
      certificates: new FormControl('',[Validators.required]),
      });
      
  
  }


  ngOnInit(): void {
    this.mainCategoryControl = this.firstFormGroup.get('main_category') as FormControl;
    this.subCategoryControl = this.firstFormGroup.get('sub_category') as FormControl;
    this.currencyControl = this.firstFormGroup.get('currency_code') as FormControl;
    this.fundingGrant = this.secondFormGroup.get('funding_grant') as FormControl;
    this.surveyCategoryControl = this.secondFormGroup.get('survey') as FormControl;
    this.instuctorCategoryControl = this.secondFormGroup.get('course_instructor') as FormControl;
    this.courseKitCategoryControl = this.secondFormGroup.get('course_kit') as FormControl;
    this.certificatesCategoryControl = this.secondFormGroup.get('certificates') as FormControl;
    this.setup();
  }
 
  mainCategoryChange(): void {
    this.subCategories = this.allSubCategories.filter(
      (item) => item.main_category_id === this.firstFormGroup.controls['main_category'].value
    );
  }

  onFileUpload(event:any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('files', file);
  
    this.certificateService.uploadCourseThumbnail(formData).subscribe((response:any) => {
      this.image_link = response.image_link;
      this.uploaded=this.image_link.split('/')
      this.uploadedImage = this.uploaded.pop();
      this.firstFormGroup.patchValue({
        // image_link: response,
      });
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      try {
        const data = new Uint8Array(e?.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        if (jsonData.length > 1) {
          this.bulkUploadData = jsonData.slice(1).map((row: any) => {

            const [
              title,
              courseCode,
              mainCategory,
              subCategory,
              duration,
              hours,
              fee,
              currency_code,
              skillConnectCode,
              courseDescription,
              courseDetailedDescription,
              pdu_technical,
              pdu_leadership,
              pdu_strategic,
              funding_grant,
              surveyDetail,
              assignInstructors,
              assignCourseKit,
            ] = row as string[];

            const mainCategoryObj = this.mainCategories.find((i) => {
              return mainCategory === i.category_name
              
            })

            if (mainCategoryObj === undefined) {
              Swal.fire({
                title: 'Error',
                text: 'Cannot find Main category ',
                icon: 'error',
              });
            }

            const subCategoryObj = this.subCategories.find((i) => {
              return subCategory === i.category_name
            })

            if (subCategoryObj === undefined) {
              Swal.fire({
                title: 'Error',
                text: 'Cannot find Sub category',
                icon: 'error',
              });
            }

            const fundingGrantObj = this.fundingGrants.find((i) => {
              return funding_grant === i.grant_type

            })

            if (fundingGrantObj === undefined) {
              Swal.fire({
                title: 'Error',
                text: 'Cannot find Funding grant',
                icon: 'error',
              });
            }

            const instructorObj = this.instructors.find((i) => {
              return assignInstructors === i.user_id?.name + ' ' + i.user_id?.last_name;
            });

            if (instructorObj === undefined) {
              Swal.fire({
                title: 'Error',
                text: 'Cannot find Instructor',
                icon: 'error',
              });
            }
           
            const courseKitObj = this.courseKits.find((i) => {
              return assignCourseKit === i.name
            })

            if (courseKitObj === undefined) {
              Swal.fire({
                title: 'Error',
                text: 'Cannot find Coursekit',
                icon: 'error',
              });
            }
            const uploadData: CourseUploadData = {
              title,
              courseCode,
              main_category: mainCategoryObj?.id,
              sub_category: subCategoryObj?.id,
              course_duration_in_days: parseInt(duration),
              training_hours: parseInt(hours),
              fee: parseInt(fee),
              currency_code: parseInt(currency_code),
              skill_connect_code: skillConnectCode,
              course_description: courseDescription,
              course_detailed_description: courseDetailedDescription,
              pdu_technical: parseInt(pdu_technical),
              pdu_leadership: parseInt(pdu_leadership),
              pdu_strategic: parseInt(pdu_strategic),
              funding_grant: [fundingGrantObj!.id],
              course_instructor: [instructorObj!.id],
              course_kit: [courseKitObj!.id],
              
            };
            return uploadData;
          });
        }
      } catch (error) {
        // console.error('Error reading file:', error);
      }
    };

    fileReader.readAsArrayBuffer(file);
  }


  setup() {
    forkJoin({
      mainCategory: this.courseService.getMainCategories(),
      subCategory: this.courseService.getSubCategories(),
      fundingGrant: this.courseService.getFundingGrant(),
      survey: this.courseService.getSurvey(),
      instructor: this.courseService.getInstructors(),
      courseKit: this.courseService.getCourseKit(),
      certificates: this.certificateService.getcertificateBuilders(),
      
    }).subscribe((response: { mainCategory: any; subCategory: any; fundingGrant: any; survey: any;instructor: any; courseKit: { docs: any; }; certificates: { data: { docs: any; }; }}) => {
      this.mainCategories = response.mainCategory;
      this.allSubCategories = response.subCategory;
      this.fundingGrants = response.fundingGrant;
      this.survey = response.survey;
      this.instructors = response.instructor;
      this.courseKits = response.courseKit?.docs; 
      this.certificates = response.certificates.data.docs;
    });
  }

  onSubmit() {
    console.log('Form Value', this.firstFormGroup.value);
  }

 
  submit() {
    if(this.secondFormGroup.valid){
      const courseData = this.firstFormGroup.value;
      const wbsData = this.secondFormGroup.value;
      let payload = {
        title: courseData.title,
        courseCode: courseData?.courseCode,
        main_category: courseData?.main_category,
        sub_category: courseData?.sub_category,
        course_duration_in_days: courseData?.course_duration_in_days,
        training_hours:courseData?.training_hours,
        fee:courseData?.fee,
        currency_code:courseData?.currency_code,
        skill_connect_code:courseData?.skill_connect_code,
        course_description:courseData?.course_description,
        course_detailed_description:courseData?.course_detailed_description,
        pdu_technical:wbsData?.pdu_technical,
        pdu_leadership:wbsData?.pdu_leadership,
        pdu_strategic:wbsData?.pdu_strategic,
        funding_grant:wbsData?.funding_grant,
        survey:wbsData?.survey,
        course_instructor:wbsData?.course_instructor,
        // assign_exam:wbsData.assign_exam,
        course_kit:wbsData?.course_kit,
        certificates:wbsData?.certificates,
        image_link:this.image_link,
        website_link:wbsData?.website_link
      }
      this.courseService.saveCourse(payload).subscribe((response: any) => {
        Swal.fire({
          title: 'Successful',
          text: 'Course created successfully',
          icon: 'success',
        });
        this.courseAdded=true;  
        this.router.navigate(['/admin/courses/all-courses'])
      });

  } else {
    this.isWbsSubmitted = true;
  }
  }

  
}
