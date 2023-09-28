/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { Session, Student, StudentApproval, StudentPaginationModel } from '../class.model';
import { ClassService } from '../class.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-completion-list',
  templateUrl: './completion-list.component.html',
  styleUrls: ['./completion-list.component.scss']
})
export class CompletionListComponent {
  displayedColumns = [
    'select',
    'Course Name',
    'Student Name',
    'Start Date',
    'End Date',
    'actions',
  ];

  breadscrums = [
    {
      title: 'Class List',
      items: ['Schedule Class'],
      active: 'Class List',
    },
  ];



  dataSource: any;
  pageSizeArr =[10,20];
  totalItems: any;
  studentPaginationModel: StudentPaginationModel;
  isLoading: boolean = true;

  upload() {
    document.getElementById('input')?.click();
  }

  constructor(private classService: ClassService) {

    this.studentPaginationModel = {} as StudentPaginationModel;
  }

    ngOnInit(): void {
      this.getCompletedClasses();
    }

    pageSizeChange($event: any) {
      this.studentPaginationModel.page= $event?.pageIndex + 1;
      this.studentPaginationModel.limit= $event?.pageSize;
      this.getCompletedClasses();
     }

    getCompletedClasses() {
      this.classService
        .getSessionCompletedStudent(this.studentPaginationModel.page, this.studentPaginationModel.limit)
        .subscribe((response: { docs: any; page: any; limit: any; totalDocs: any; }) => {
          console.log("data",response)
          this.isLoading = false;
        this.studentPaginationModel.docs = response.docs;
        this.studentPaginationModel.page = response.page;
        this.studentPaginationModel.limit = response.limit;
        this.totalItems=response.totalDocs;

        this.dataSource = response.docs;
        console.log("data",this.dataSource)
        this.mapClassList();
        })
    }

    mapClassList() {
      this.studentPaginationModel.docs.forEach((item: Student) => {
        const startDateArr: any = [];
        const endDateArr: any = [];
        item.classId.sessions.forEach((session: { sessionStartDate: { toString: () => string | number | Date; }; sessionEndDate: { toString: () => string | number | Date; }; }) => {
          startDateArr.push(new Date(session.sessionStartDate.toString()));
          endDateArr.push(new Date(session.sessionEndDate.toString()));
        });
        const minStartDate = new Date(Math.min.apply(null, startDateArr));
        const maxEndDate = new Date(Math.max.apply(null, endDateArr));
        item.classStartDate = !isNaN(minStartDate.valueOf()) ? moment(minStartDate).format("YYYY-DD-MM") : "";
        item.classEndDate = !isNaN(maxEndDate.valueOf()) ? moment(maxEndDate).format("YYYY-DD-MM") : "";
        item.registeredOn = item.registeredOn ? moment(item.registeredOn).format("YYYY-DD-MM") : "";
        item.studentId.name = `${item.studentId?.name} ${item.studentId?.last_name}`;
      });
    }

    getCurrentUserId(): string {
      return JSON.parse(localStorage.getItem("user_data")!).user.id;
    }

    complete(element: Student) {
      const item: StudentApproval = {
        approvedBy: this.getCurrentUserId(),
        approvedOn: moment().format("YYYY-MM-DD"),
        classId: element.classId._id,
        status: "completed",
        studentId: element.studentId.id,
        session: []
      };
      this.classService.saveApprovedClasses(element.id, item).subscribe((response:any) => {
        Swal.fire({
          title: 'Success',
          text: 'Course approved successfully.',
          icon: 'success',
          confirmButtonColor: '#526D82',
        });

        this.getCompletedClasses();
      });
      () => {
            Swal.fire({
              title: 'Error',
              text: 'Failed to approve course. Please try again.',
              icon: 'error',
              confirmButtonColor: '#526D82',
            });
          };

    }

    getSessions(element: { classId: { sessions: any[]; }; }) {
      const sessions = element.classId?.sessions?.map((_: any, index: number) => {
        const session: Session = {} as Session;
        session.sessionNumber = index + 1;
        return session;
      });
      return sessions;
    }

}
