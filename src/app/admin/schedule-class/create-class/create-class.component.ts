
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import {  FormBuilder,  FormControl,  FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { CourseTitleModel, DataSourceModel, InstructorList, LabListModel } from '../class.model';
import { ClassService } from '../class.service';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
// import * as moment from 'moment';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.scss']
})
export class CreateClassComponent {


    classForm! : FormGroup;
    InstructorForm! : FormGroup;
    isInstructorFailed: number = 0;
    isLabFailed: number = 0;
  isStartDateFailed: number = 0;
  isEndDateFailed: number = 0;
  dataSourceArray: DataSourceModel[] = [];
  dataSource: any;

  breadscrums = [
    {
      title: 'Add Class',
      items: ['Schedule Class'],
      active: 'Add Class',
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
  mode: string | undefined;


  addNewRow() {
    if (this.isInstructorFailed != 1 && this.isLabFailed != 1) {
      this.isInstructorFailed = 0;
      this.isLabFailed = 0;
      const currentYear = new Date().getFullYear();
      this.dataSourceArray.push({
        start :new Date(currentYear - 5, 0, 1),
        end : new Date(currentYear + 1, 11, 31),
        instructor: "0",
        lab: "0",
      });
      this.dataSource = this.dataSourceArray;
    }
  }
  constructor(public _fb:FormBuilder, private _classService:ClassService){
    this.classForm = this._fb.group({
      courseId:['',Validators.required],
      classType:[''],
      classDeliveryType:[''],
      instructorCost:[''],
      currency:[''],
      minimumEnrollment:[''],
      maximumEnrollment:[''],
      classStartDate:[''],
      isGuaranteedToRun:[''],
      externalRoom:[''],
      classEndDate:[''],
       sessions: [""],

    })
     // Set the minimum to January 1st 5 years in the past and December 31st a year in the future.
     const currentYear = new Date().getFullYear();
     this.minDate = new Date(currentYear - 5, 0, 1);
     this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  toggleStatus() {
    this.status = !this.status;
  }



  ngOnInit(): void {
  // this.loadForm();
    forkJoin({
      courses: this._classService.getAllCoursesTitle('active'),
      instructors: this._classService.getAllInstructor(),
      labs: this._classService.getAllLaboratory(),
    }).subscribe((response) => {

      console.log("resposes",response.courses)
      this.courseList = response.courses;
      this.instructorList = response.instructors;
      this.labList = response.labs;
      // this.cd.detectChanges();
    });
    this.dataSource = this.dataSourceArray;
  }


  // loadForm() {
  //   this.classForm = this._fb.group({
  //     courseId: ["", [Validators.required]],
  //     classType: ["public"],
  //     classDeliveryType: ["", Validators.required],
  //     instructorCost: ["", Validators.required],
  //     instructorCostCurrency: ["USD"],
  //     currency: [""],
  //     isGuaranteedToRun:[false,Validators.required],
  //     externalRoom:[false,Validators.required],
  //     minimumEnrollment: ["", Validators.required],
  //     maximumEnrollment: ["", Validators.required],
  //     status: ["open"],
  //     classStartDate: ["2023-05-20"],
  //     classEndDate: ["2023-06-10"],
  //     sessions: ["", Validators.required],
  //   });
  // }


  getSession() {
    let sessions: any=[];
    this.dataSource.forEach((item: any, index: any) => {
      if (this.isInstructorFailed == 0 && item.instructor != "0" && item.lab != "0") {
        sessions.push({
          sessionNumber: index + 1,
          sessionStartDate: moment(item.start).format("YYYY-MM-DD"),
          sessionEndDate: moment(item.end).format("YYYY-MM-DD"),
          sessionStartTime: moment(item.start).format("HH:mm"),
          sessionEndTime: moment(item.end).format("HH:mm"),
          instructorId: item.instructor,
          laboratoryId: item.lab,
        });
      } else {
        // this.toaster.error("Please choose Instructor and Lab")
        sessions = null;
      }
    });
    return sessions;
  }
  submit(){
      // if(!this.viewUrl&&!this.editUrl){
      const sessions = this.getSession();
      if (sessions) {
        this.classForm.value.sessions = sessions;
        // this.inProgress = false;
        // this.isSubmitted = true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this._classService.saveClass(this.classForm.value).subscribe((response) => {
          console
          // this.router.navigateByUrl(`Schedule Class/List`);
        });
      }
    // }
    // if(this.editUrl){
    //     let sessions = this.getSession();
    //     if (sessions) {
    //       this.classForm.value.sessions = sessions;
    //       this.classService.updateClass(this.classId, this.classForm.value).subscribe((response) => {
    //         Swal.fire({
    //           title: 'Success',
    //           text: 'Class updated successfully.',
    //           icon: 'success',
    //           confirmButtonColor: '#526D82',
    //         });
    //           // this.router.navigateByUrl(`Schedule Class/List`);
    //       });
    //     }

    // }
    }
    startDateChange(element: { end: any; start: any; }) {
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

    checkAvailabilityOfInstructor(element: { instructor: any; start: any; end: any; }) {
      this._classService
        .validateInstructor(
          element.instructor,
          new DatePipe("en-US").transform(new Date(element.start), "yyyy-MM-dd")!,
          new DatePipe("en-US").transform(new Date(element.end), "yyyy-MM-dd")!,
          new DatePipe("en-US").transform(new Date(element.start), "HH:MM")!,
          new DatePipe("en-US").transform(new Date(element.end), "HH:MM")!
        )
        .subscribe((response: any) => {
          if (!response["success"]) {
            this.isInstructorFailed = 1;
            // this.cd.detectChanges();
          } else {
            this.isInstructorFailed = 0;
          }
        });
    }
    checkAvailabilityOfLaboratory(element: { lab: string | undefined; start: string | number | Date; end: string | number | Date; }) {
      this._classService
        .validateLaboratory(
          element.lab,
          new DatePipe("en-US").transform(new Date(element.start), "yyyy-MM-dd")!,
          new DatePipe("en-US").transform(new Date(element.end), "yyyy-MM-dd")!,
          new DatePipe("en-US").transform(new Date(element.start), "HH:MM")!,
          new DatePipe("en-US").transform(new Date(element.end), "HH:MM")!
        )
        .subscribe((response) => {
          if (!response.data["success"]) {
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

    deleteRecord(index: number) {
      this.dataSourceArray.splice(index, 1);
      this.dataSource = this.dataSourceArray;
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
