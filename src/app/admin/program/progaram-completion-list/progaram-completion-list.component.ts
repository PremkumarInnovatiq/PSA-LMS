import { Component } from '@angular/core';
import { Student, StudentApproval, StudentPaginationModel } from '@core/models/class.model';
import { UtilsService } from '@core/service/utils.service';
import { ClassService } from 'app/admin/schedule-class/class.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-progaram-completion-list',
  templateUrl: './progaram-completion-list.component.html',
  styleUrls: ['./progaram-completion-list.component.scss']
})
export class ProgaramCompletionListComponent {
  displayedColumns = [
    'select',
    'Program Name',
    'Student Name',
    'Class Start Date',
    'Class End Date',
    'actions',
  ];
  breadscrums = [
    {
      items: ['Program'],
      active: 'Program Completion List',
    },
  ];
  dataSource : any;
  completionList: any;
  pageSizeArr =this.utils.pageSizeArr;
  totalItems: any;
  studentPaginationModel: StudentPaginationModel;
  isLoading: any;

  constructor(private classService: ClassService,private utils:UtilsService) {

    
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
  upload() {
    document.getElementById('input')?.click();
  }

  getCompletedClasses() {
    this.classService
      .getProgramCompletedStudent(this.studentPaginationModel.page, this.studentPaginationModel.limit)
      .subscribe((response: { docs: any; page: any; limit: any; totalDocs: any; }) => {
        this.isLoading = false;
      this.studentPaginationModel.docs = response.docs;
      this.studentPaginationModel.page = response.page;
      this.studentPaginationModel.limit = response.limit;
      this.totalItems=response.totalDocs;
      this.dataSource= response.docs;
      })
  }
  getCurrentUserId(): string {
    return JSON.parse(localStorage.getItem("user_data")!).user.id;
  }

  complete(element: Student) {
    let item: StudentApproval = {
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
}
