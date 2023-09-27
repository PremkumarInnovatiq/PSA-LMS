
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
import {
  CourseTitleModel,
  DataSourceModel,
  InstructorList,
  LabListModel,
} from '../class.model';
import { ClassService } from '../class.service';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
// import * as moment from 'moment';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.scss'],
})
export class CreateClassComponent {
  @HostListener('document:keypress', ['$event'])
  keyPressNumbers(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  classForm!: FormGroup;
  InstructorForm!: FormGroup;
  isInstructorFailed: number = 0;
  isLabFailed: number = 0;
  isStartDateFailed: number = 0;
  isEndDateFailed: number = 0;
  dataSourceArray: DataSourceModel[] = [];
  dataSource: any;
  classId!: string;
  title: boolean = false;

  breadscrums = [
    {
      title: 'Create Class',
      items: ['Schedule Class'],
      active: 'Create Class',
    },
  ];
  startDate = new Date(1990, 0, 1);
  date = new UntypedFormControl(new Date());
  serializedDate = new UntypedFormControl(new Date().toISOString());
  minDate: Date | undefined;
  maxDate!: Date;
  status = true;
  courseList!: CourseTitleModel[];
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
    private snackBar: MatSnackBar
  ) {
    this._activeRoute.queryParams.subscribe((params) => {
      this.classId = params['id'];
      if (this.classId) {
        this.title = true;
      }
    });





    // Set the minimum to January 1st 5 years in the past and December 31st a year in the future.
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 5, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  toggleStatus() {
    this.status = !this.status;
  }




  ngOnInit(): void {
    this.loadClassList(this.classId);
    this.classForm = this._fb.group({
      courseId: ['', Validators.required],
      classType: [''],
      classDeliveryType: ['', Validators.required],
      instructorCost: ['', Validators.required],
      currency: [''],
      minimumEnrollment: ['', Validators.required],
      maximumEnrollment: ['', Validators.required],
      classStartDate: [''],
      status: ['open'],
      isGuaranteedToRun: ['false', Validators.required],
      externalRoom: ['false', Validators.required],
      sessions:[''] ,
    });
    this.InstructorForm = this._fb.group({
      start_date:[''],
      end_date:[''],
      instructor:[''],
      lab:['']
    })
    // this.loadForm();
    // this.loadClassList(this.classId);
    forkJoin({
      courses: this._classService.getAllCoursesTitle('active'),
      instructors: this._classService.getAllInstructor(),
      labs: this._classService.getAllLaboratory(),
    }).subscribe((response) => {
      this.courseList = response.courses;
      this.instructorList = response.instructors;
      this.labList = response.labs;

      this.cd.detectChanges();
    });



    // this.addInst();
  }

  loadClassList(id:string) {
    this._classService.getClassById(id).subscribe((response) => {
      const item = response;
      this.classForm.patchValue({
        courseId: item?.courseId?.id,
        classType: item?.classType,
        classDeliveryType: item?.classDeliveryType,
        instructorCost: item?.instructorCost,
        currency: item?.currency,
        instructorCostCurrency: item?.instructorCostCurrency,
        isGuaranteedToRun: item?.isGuaranteedToRun,
        externalRoom: item?.externalRoom,
        minimumEnrollment: item?.minimumEnrollment,
        maximumEnrollment: item?.maximumEnrollment,
        status: item?.status,
        sessions: item?.sessions,
      });
      console.log("add",item.sessions)
        item.sessions.forEach((item: any) => {
          this.InstructorForm.patchValue({
            start_date: `${moment(item.sessionStartDate).format(
              'YYYY-MM-DD'
            )}`,
            end_date: `${moment(item.sessionEndDate).format('YYYY-MM-DD')}`,
            instructor: item.instructorId?.id,
            lab: item.laboratoryId?.id,
          });
        });
    });
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
    console.log('inst', this.InstructorForm);

    const index = 0;
    if (
      this.isInstructorFailed == 0 &&
      this.InstructorForm.value.instructor != '0' &&
      this.InstructorForm.value.lab != '0'
    ) {
      this.sessions.push({
        sessionNumber: index + 1,
        sessionStartDate: moment(this.InstructorForm.value.start_date).format(
          'YYYY-MM-DD'
        ),
        sessionEndDate: moment(this.InstructorForm.value.end_date).format(
          'YYYY-MM-DD'
        ),
        sessionStartTime: moment(this.InstructorForm.value.start_date).format(
          'HH:mm'
        ),
        sessionEndTime: moment(this.InstructorForm.value.end_date).format(
          'HH:mm'
        ),
        instructorId: this.InstructorForm.value.instructor,
        laboratoryId: this.InstructorForm.value.lab,
      });
    } else {
      this.showNotification(
        'snackbar-danger',
        'Please choose Instructor and Lab',
        'top',
        'right'
      );
      // this.toaster.error("Please choose Instructor and Lab")
      this.sessions = null;
    }
    return this.sessions;
  }
  submit() {
    // if(!this.viewUrl&&!this.editUrl){
    const sessions = this.getSession();

    // }
    if (this.classId) {
      this.sessions = this.getSession();
      if (this.sessions) {
        this.classForm.value.sessions = sessions;
        this._classService
          .updateClass(this.classId, this.classForm.value)
          .subscribe((response) => {
            if (response) {
              this.showNotification(
                'snackbar-success',
                'Class Updated Successfully...!!!',
                'top',
                'right'
              );
              this.router.navigateByUrl(`/admin/schedule/class-list`);
            }

            // this.router.navigateByUrl(`Schedule Class/List`);
          });
      }
    }else{
      if (sessions) {
        this.classForm.value.sessions = sessions;
        // this.inProgress = false;
        // this.isSubmitted = true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this._classService
          .saveClass(this.classForm.value)
          .subscribe((response) => {
            if (response) {
              this.showNotification(
                'snackbar-success',
                'Class Created Successfully...!!!',
                'top',
                'right'
              );
            }
            this.router.navigateByUrl(`/admin/schedule/class-list`);
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


