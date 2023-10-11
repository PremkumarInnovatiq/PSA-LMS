import { map } from 'rxjs';

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '@core/service/course.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { InstructorService } from '@core/service/instructor.service';
import Swal from 'sweetalert2';
import { CourseTitleModel, DataSourceModel, InstructorList, LabListModel } from 'app/admin/schedule-class/class.model';
import { ClassService } from 'app/admin/schedule-class/class.service';
import { CoursePaginationModel } from '@core/models/course.model';
// import * as moment from 'moment';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.scss'],
})
export class CreateClassComponent {
  item: any;
  editUrl!: boolean;
  subscribeParams: any;
  @HostListener('document:keypress', ['$event'])
  keyPressNumbers(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
  isSubmitted = false;

  classForm!: FormGroup;
  InstructorForm!: FormGroup;
  isInstructorFailed: number = 0;
  isLabFailed: number = 0;
  isStartDateFailed: number = 0;
  isEndDateFailed: number = 0;
  dataSourceArray: DataSourceModel[] = [];
  dataSource: any;
  courseTitle: any;
  user_id: any;
  courseCode: any;
  classId!: string;
  title: boolean = false;

  breadscrums :any[];
  startDate = new Date(1990, 0, 1);
  date = new UntypedFormControl(new Date());
  serializedDate = new UntypedFormControl(new Date().toISOString());
  minDate: Date | undefined;
  maxDate!: Date;
  status = true;
  programList!: any
  instructorList: any = [];
  labList: any = [];
  selectedPosition: number = 0;
  selectedLabPosition: number = 0;
  courseNameControl!: FormControl;
  classTypeControl!: FormControl;
  classDeliveryControl!: FormControl;
  roomTypeControl!: FormControl;
  guaranteeControl!: FormControl;
  instructorControl!: FormControl;
  mode!: string;
  sessions: any = [];
  instForm!: FormArray<any>;
  next: boolean = false;
  coursePaginationModel!: Partial<CoursePaginationModel>;


  addNewRow() {
    if (this.isInstructorFailed != 1 && this.isLabFailed != 1) {
      this.isInstructorFailed = 0;
      this.isLabFailed = 0;
      const currentYear = new Date().getFullYear();
      this.dataSourceArray.push({
        start: moment().set({ hour: 8, minute: 0 }).format('YYYY-MM-DD HH:mm'),
        end: moment().set({ hour: 8, minute: 0 }).format('YYYY-MM-DD HH:mm'),
        instructor: '0',
        lab: '0',
      });
      this.dataSource = this.dataSourceArray;
    }
  }
  constructor(
    public _fb: FormBuilder,
    private _classService: ClassService,
    private router: Router,
    private _activeRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private courseService: CourseService,
    private instructorService: InstructorService
  ) {
    this._activeRoute.queryParams.subscribe((params) => {
      this.classId = params['id'];
      if (this.classId) {
        this.title = true;
      }
    });
    let urlPath = this.router.url.split('/')
    this.editUrl = urlPath.includes('edit-class'); 

    if(this.editUrl){
    this.breadscrums = [
      {
        title: 'Edit Class',
        items: ['Schedule Class'],
        active: 'Edit Class',
      },
    ];
  } else {
    this.breadscrums = [
      {
        title: 'Create Class',
        items: ['Schedule Class'],
        active: 'Create Class',
      },
    ];

  }
  
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 5, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.coursePaginationModel = {};

  }

  toggleStatus() {
    this.status = !this.status;
  }

  ngOnInit(): void {
    this.subscribeParams = this._activeRoute.params.subscribe((params:any) => {
      this.classId = params.id;
    });

    this.loadForm();
    if(!this.editUrl){
      forkJoin({
        courses: this.courseService.getPrograms({...this.coursePaginationModel,status:'active'}),
        instructors: this.instructorService.getInstructor( {
          type: 'Instructor',
        }),
        labs: this._classService.getAllLaboratory(),
  
      }).subscribe((response) => {
        this.programList = response.courses;
        this.instructorList = response.instructors;
        this.labList = response.labs;
  
        this.cd.detectChanges();
      });
        this.dataSource = this.dataSourceArray;
    }
    
  if(this.editUrl ){
    forkJoin({
      courses: this.courseService.getCourseProgram({...this.coursePaginationModel,status:'active'}),
      instructors: this.instructorService.getInstructor( {
        type: 'Instructor',
      }),
      labs: this._classService.getAllLaboratory(),
    class: this._classService.getProgramClassById(this.classId),
    }).subscribe((response) => {
      this.programList = response.courses.docs;
      this.instructorList = response.instructors;
      this.labList = response.labs;
      let item = response.class;
      this.classForm.patchValue({
        courseId: item.courseId?.id,
        classType: item?.classType,
        classDeliveryType: item?.classDeliveryType,
        instructorCost: item?.instructorCost,
        currency:item?.currency,
        instructorCostCurrency: item?.instructorCostCurrency,
        isGuaranteedToRun:item?.isGuaranteedToRun,
        externalRoom:item?.externalRoom,
        minimumEnrollment: item?.minimumEnrollment,
        maximumEnrollment: item?.maximumEnrollment,
        status: item?.status,
        sessions: item?.sessions
      });
      item.sessions.forEach((item:any) => {
      let sessionStartDate=item.sessionStartDate.split('T')[0]
      let sessionEndDate=item.sessionEndDate.split('T')[0]

        this.dataSourceArray.push({
          start: sessionStartDate,
          end: sessionEndDate,
          instructor: item.instructorId?.id,
          lab: item.laboratoryId?.id,
        });
        
      });
      this.dataSource = this.dataSourceArray;
      this.cd.detectChanges();
    });
  }
  }

  loadForm() {
    this.classForm = this._fb.group({
      courseId: ['', [Validators.required]],
      classType: ['public'],
      classDeliveryType: ['', Validators.required],
      instructorCost: ['', Validators.required],
      instructorCostCurrency: ['USD'],
      currency: [''],
      isGuaranteedToRun: [false, Validators.required],
      externalRoom: [false],
      minimumEnrollment: ['', Validators.required],
      maximumEnrollment: ['', Validators.required],
      status: ['open'],
      classStartDate: ['2023-05-20'],
      classEndDate: ['2023-06-10'],
      sessions: ['', Validators.required],
    });
  }

  nextBtn() {
    if (
      this.classForm.get('classDeliveryType')?.valid &&
      this.classForm.get('courseId')?.valid &&
      this.classForm.get('instructorCost')?.valid &&
      this.classForm.get('minimumEnrollment')?.valid &&
      this.classForm.get('maximumEnrollment')?.valid
    ) {
      this.next = true;
    }
  }
  back() {
    this.next = false;
  }

  deleteRecord(index: number) {
    this.dataSourceArray.splice(index, 1);
    this.dataSource = this.dataSourceArray;
  }
  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 6000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  getSession() {
    let sessions: any = [];
    this.dataSource.forEach((item: any, index: any) => {
      if (
        this.isInstructorFailed == 0 &&
        item.instructor != '0' &&
        item.lab != '0'
      ) {
        sessions.push({
          sessionNumber: index + 1,
          sessionStartDate: moment(item.start).format('YYYY-MM-DD'),
          sessionEndDate: moment(item.end).format('YYYY-MM-DD'),
          sessionStartTime: moment(item.start).format('HH:mm'),
          sessionEndTime: moment(item.end).format('HH:mm'),
          instructorId: item.instructor,
          laboratoryId: item.lab,
          courseName: this.courseTitle,
          courseCode: this.courseCode,
          status: 'Pending',
          user_id: this.user_id,
        });
      } else {
        // this.toaster.error("Please choose Instructor and Lab")
        sessions = null;
      }
    });
    return sessions;
  }
 

  onSelectChange(event: any) {
    const filteredData = this.instructorList.filter(
      (item: { instructor_id: string }) =>
        item.instructor_id === this.InstructorForm.controls['instructor'].value
    );
    this.user_id = filteredData[0].user_id.user_id;
  }

  onSelectChange1(event :any,element:any) {
        const filteredData = this.instructorList.filter((item: { instructor_id: string; }) => item.instructor_id===element.instructor);
   this.user_id=filteredData[0].user_id.user_id

  }

  saveProgramClass() {
    if(!this.editUrl){
      let sessions = this.getSession();
      if (sessions) {
        this.classForm.value.sessions = sessions;
        this.isSubmitted = true;
        this._classService.saveProgramClass(this.classForm.value).subscribe((response:any) => {
          Swal.fire({
            title: 'Success',
            text: 'Class Created successfully.',
            icon: 'success',
            confirmButtonColor: '#526D82',
          }); 
          this.router.navigateByUrl(`admin/program/schedule-class`);
                });
      }
    }
    if(this.editUrl){
      let sessions = this.getSession();
      if (sessions) {
        this.classForm.value.sessions = sessions;
        this._classService.updateProgramClass(this.classId, this.classForm.value).subscribe((response:any) => {
          Swal.fire({
            title: 'Success',
            text: 'Class updated successfully.',
            icon: 'success',
            confirmButtonColor: '#526D82',
          });  
          this.router.navigateByUrl(`admin/program/schedule-class`);
        });
      }
  
  }
  }


  startDateChange(element: { end: any; start: any }) {
    element.end = element.start;
  }
  onChangeInstructor(element: any, i: number) {
    this.selectedPosition = i;
    this.checkAvailabilityOfInstructor(element);
  }

  onChangeLab(element: any, i: number) {
    this.selectedLabPosition = i;
    this.checkAvailabilityOfLaboratory(element);
  }

  checkAvailabilityOfInstructor(element: {
    instructor: any;
    start: any;
    end: any;
  }) {
    this._classService
      .validateInstructor(
        element.instructor,
        new DatePipe('en-US').transform(new Date(element.start), 'yyyy-MM-dd')!,
        new DatePipe('en-US').transform(new Date(element.end), 'yyyy-MM-dd')!,
        new DatePipe('en-US').transform(new Date(element.start), 'HH:MM')!,
        new DatePipe('en-US').transform(new Date(element.end), 'HH:MM')!
      )
      .subscribe((response: any) => {
        if (!response['success']) {
          this.isInstructorFailed = 1;
          // this.cd.detectChanges();
        } else {
          this.isInstructorFailed = 0;
        }
      });
  }
  checkAvailabilityOfLaboratory(element: {
    lab: string | undefined;
    start: string | number | Date;
    end: string | number | Date;
  }) {
    this._classService
      .validateLaboratory(
        element.lab,
        new DatePipe('en-US').transform(new Date(element.start), 'yyyy-MM-dd')!,
        new DatePipe('en-US').transform(new Date(element.end), 'yyyy-MM-dd')!,
        new DatePipe('en-US').transform(new Date(element.start), 'HH:MM')!,
        new DatePipe('en-US').transform(new Date(element.end), 'HH:MM')!
      )
      .subscribe((response) => {
        if (!response.data['success']) {
          this.isLabFailed = 1;
        } else {
          this.isLabFailed = 0;
        }
      });
  }

  setCourseNameControlState(): void {
    if (this.mode === 'viewUrl') {
      this.courseNameControl.disable({ emitEvent: false });
    } else {
      this.courseNameControl.enable({ emitEvent: false });
    }
  }
  setClassTypeControlState(): void {
    if (this.mode === 'viewUrl') {
      this.classTypeControl.disable({ emitEvent: false });
    } else {
      this.classTypeControl.enable({ emitEvent: false });
    }
  }
  setRoomTypeControlState(): void {
    if (this.mode === 'viewUrl') {
      this.roomTypeControl.disable({ emitEvent: false });
    } else {
      this.roomTypeControl.enable({ emitEvent: false });
    }
  }
  setGuaranteeControlState(): void {
    if (this.mode === 'viewUrl') {
      this.guaranteeControl.disable({ emitEvent: false });
    } else {
      this.guaranteeControl.enable({ emitEvent: false });
    }
  }

  setClassDeliveryControlState(): void {
    if (this.mode === 'viewUrl') {
      this.classDeliveryControl.disable({ emitEvent: false });
    } else {
      this.classDeliveryControl.enable({ emitEvent: false });
    }
  }
  isInputReadonly(): boolean {
    return this.mode === 'viewUrl';
  }

  mapPropertiesInstructor(response: any[]) {
    response.forEach((element: InstructorList) => {
      this.instructorList.push(element);
    });
  }

  getLaboratoryList() {
    this.labList = [];
    this._classService.getAllLaboratory().subscribe((response) => {
      this.mapPropertiesLab(response);
    });
  }
  mapPropertiesLab(response: any) {
    response.docs.forEach((element: LabListModel) => {
      this.labList.push(element);
    });
  }
}
