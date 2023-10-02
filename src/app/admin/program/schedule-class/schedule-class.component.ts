/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { CoursePaginationModel } from '@core/models/course.model';
import { ProgramService } from '../program.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ClassService } from 'app/admin/schedule-class/class.service';
import { forkJoin } from 'rxjs';
import { DataSourceModel } from 'app/admin/schedule-class/class.model';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-class',
  templateUrl: './schedule-class.component.html',
  styleUrls: ['./schedule-class.component.scss'],
})
export class ScheduleClassComponent {
  status: boolean = false;
  sessions: any;
  @HostListener('document:keypress', ['$event'])
  keyPressNumbers(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
  isLoading: boolean = false;
  edit: boolean = false;
  next: boolean = false;
  classForm!: FormGroup;
  courseNameControl!: FormControl;
  classTypeControl!: FormControl;
  classDeliveryControl!: FormControl;
  roomTypeControl!: FormControl;
  guaranteeControl!: FormControl;
  instructorControl!: FormControl;
  classId!: string;
  instructorList: any = [];
  programList!: any;
  labList: any = [];
  isInstructorFailed: number = 0;
  isLabFailed: number = 0;
  isStartDateFailed: number = 0;
  isEndDateFailed: number = 0;
  selectedPosition: number = 0;
  selectedLabPosition: number = 0;
  dataSourceArray: DataSourceModel[] = [];
  coursePaginationModel!: Partial<CoursePaginationModel>;

  displayedColumns = ['img', 'courseName', 'startDate', 'endDate', 'Options'];

  breadscrums = [
    {
      title: 'Class List',
      items: ['Schedule Class'],
      active: 'Class List',
    },
  ];
  dataSource: any;
  totalItems: any;
  constructor(
    public courseService: ProgramService,
    private classService: ClassService,
    private cd: ChangeDetectorRef,
    public router: Router
  ) {
    this.coursePaginationModel = {};
  }

  ngOnInit(): void {
    this.getClassList();
    this.courseNameControl = this.classForm.get('courseId') as FormControl;
    this.classTypeControl = this.classForm.get(
      'classAccessType'
    ) as FormControl;
    this.classDeliveryControl = this.classForm.get(
      'classDeliveryType'
    ) as FormControl;
    this.guaranteeControl = this.classForm.get(
      'isGuaranteedToRun'
    ) as FormControl;
    this.roomTypeControl = this.classForm.get('externalRoom') as FormControl;

    forkJoin({
      courses: this.courseService.getCourseProgram({
        ...this.coursePaginationModel,
        status: 'active',
      }),
      instructors: this.classService.getAllInstructor(),
      labs: this.classService.getAllLaboratory(),
    }).subscribe((response) => {
      this.programList = response.courses.docs;
      this.instructorList = response.instructors;
      this.labList = response.labs;
      this.cd.detectChanges();
    });
    this.dataSource = this.dataSourceArray;
  }

  pageSizeChange($event: any) {
    this.coursePaginationModel.page = $event?.pageIndex + 1;
    this.coursePaginationModel.limit = $event?.pageSize;
    this.getClassList();
  }

  getClassList() {
    this.courseService
      .getProgramClassListWithPagination({ ...this.coursePaginationModel })
      .subscribe(
        (response) => {
          this.dataSource = response.data.docs;
          console.log('data', this.dataSource);
          this.totalItems = response.data.totalDocs;
          this.coursePaginationModel.docs = response.data.docs;
          this.coursePaginationModel.page = response.data.page;
          this.coursePaginationModel.limit = response.data.limit;
        },
        () => {}
      );
  }

  toggleStatus() {
    this.status = !this.status;
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

  addNewRow() {
    if (this.isInstructorFailed != 1 && this.isLabFailed != 1) {
      this.isInstructorFailed = 0;
      this.isLabFailed = 0;
      this.dataSourceArray.push({
        start: moment().set({ hour: 8, minute: 0 }).format('YYYY-MM-DD HH:mm'),
        end: moment().set({ hour: 8, minute: 0 }).format('YYYY-MM-DD HH:mm'),
        instructor: '0',
        lab: '0',
      });
      this.dataSource = this.dataSourceArray;
    }
  }
  editRow(_id:string){
     console.log("id",_id)
  }
  delete(id: string) {
    this.courseService
      .getProgramClassList({ courseId: id })
      .subscribe((classList: any) => {
        const matchingClasses = classList.docs.filter((classItem: any) => {
          return classItem.courseId && classItem.courseId.id === id;
        });
        if (matchingClasses.length > 0) {
          Swal.fire({
            title: 'Error',
            text: 'Classes have been registered with program`. Cannot delete.',
            icon: 'error',
          });
          return;
        }
        this.courseService.deleteProgramClass(id).subscribe(() => {
          Swal.fire({
            title: 'Success',
            text: 'Class deleted successfully.',
            icon: 'success',
          });
          this.getClassList();
        });
      });
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
    this.classService
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
    this.classService
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
        });
      } else {
        // this.toaster.error("Please choose Instructor and Lab")
        sessions = null;
      }
    });
    return sessions;
  }
  submit() {
    // if(!this.viewUrl&&!this.editUrl){
    const sessions = this.getSession();

    // }
    if (this.classId) {
      this.sessions = this.getSession();
      if (this.sessions) {
        this.classForm.value.sessions = sessions;
        this.courseService
          .updateProgramClass(this.classId, this.classForm.value)
          .subscribe((response) => {
            if (response) {
              Swal.fire({
                title: 'Success',
                text: 'Program Class updated successfully.',
                icon: 'success',
                confirmButtonColor: '#526D82',
              });
              this.router.navigateByUrl(`/admin/program/schedule-class`);
            }

            // this.router.navigateByUrl(`Schedule Class/List`);
          });
      }
    } else {
      if (sessions) {
        this.classForm.value.sessions = sessions;
        // this.inProgress = false;
        // this.isSubmitted = true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.courseService
          .saveProgramClass(this.classForm.value)
          .subscribe((response) => {
            if (response) {
              Swal.fire({
                title: 'Success',
                text: 'Program Class Created successfully.',
                icon: 'success',
                confirmButtonColor: '#526D82',
              });
            }
            this.router.navigateByUrl(`/admin/program/schedule-class`);
          });
      }
    }
  }
}
