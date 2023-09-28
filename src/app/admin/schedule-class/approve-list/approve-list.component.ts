/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ViewChild } from '@angular/core';
import { ClassService } from '../class.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  ClassModel,
  Session,
  Student,
  StudentApproval,
  StudentPaginationModel,
} from '../class.model';
import * as moment from 'moment';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-approve-list',
  templateUrl: './approve-list.component.html',
  styleUrls: ['./approve-list.component.scss'],
})
export class ApproveListComponent {
  displayedColumns = [
    'select',
    'img',
    'course name',
    'student name',
    'class start Date',
    'class end Date',
    'registered Date',
    'actions',
  ];

  breadscrums = [
    {
      title: 'Class List',
      items: ['Schedule Class'],
      active: 'Class List',
    },
  ];
  studentPaginationModel: StudentPaginationModel;
  selection = new SelectionModel<ClassModel>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  totalItems: any;
  approveData: any;
  pageSizeArr = [10, 20, 30, 50, 100];
  isLoading = true;
  dataSource!: any;
  constructor(
    public _classService: ClassService,
    private snackBar: MatSnackBar
  ) {
    this.studentPaginationModel = {} as StudentPaginationModel;
    // super();
  }

  ngOnInit(): void {
    this.getRegisteredClasses();
  }
  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  pageSizeChange($event: any) {
    this.studentPaginationModel.page = $event?.pageIndex + 1;
    this.studentPaginationModel.limit = $event?.pageSize;
    this.getRegisteredClasses();
  }

  getRegisteredClasses() {
    this._classService
      .getRegisteredClasses(this.studentPaginationModel.page, this.studentPaginationModel.limit, this.studentPaginationModel.filterText)
      .subscribe((response: { data: StudentPaginationModel; }) => {
      console.log(response.data.docs)
      this.isLoading = false;
        this.studentPaginationModel = response.data;
        this.dataSource = response.data.docs;
        this.totalItems = response.data.totalDocs;
        this.mapClassList();

      })
  }

  mapClassList() {
    this.studentPaginationModel.docs.forEach((item: Student) => {
      console.log("res",item)
      const startDateArr: any = [];
      const endDateArr: any = [];
      item?.classId?.sessions?.forEach((session) => {
        console.log("session",session)
        startDateArr.push(new Date(session?.sessionStartDate?.toString()));
        endDateArr.push(new Date(session?.sessionEndDate?.toString()));
      });
      const minStartDate = new Date(Math.min.apply(null, startDateArr));
      const maxEndDate = new Date(Math.max.apply(null, endDateArr));

      item.classStartDate = !isNaN(minStartDate.valueOf()) ? moment(minStartDate).format("YYYY-DD-MM") : "";
      item.classEndDate = !isNaN(maxEndDate.valueOf()) ? moment(maxEndDate).format("YYYY-DD-MM") : "";
      item.registeredOn = item?.registeredOn ? moment(item.registeredOn).format("YYYY-DD-MM") : "";
      item.studentId.name = `${item?.studentId?.name} ${item?.studentId?.last_name}`;
    });
  }


  getCurrentUserId(): string {
    return JSON.parse(localStorage.getItem('user_data')!).user.id;
  }

  changeStatus(element: Student, status: string) {
    const item: StudentApproval = {
      approvedBy: this.getCurrentUserId(),
      approvedOn: moment().format('YYYY-MM-DD'),
      classId: element.classId._id,
      status,
      studentId: element.studentId.id,
      session: this.getSessions(element),
    };
    this._classService
      .saveApprovedClasses(element.id, item)
      .subscribe((_response: any) => {
        // Swal.fire({
        //   title: 'Success',
        //   text: 'Course approved successfully.',
        //   icon: 'success',
        //   confirmButtonColor: '#526D82',
        // });

        this.showNotification(
          'snackbar-success',
          ' Course approved successfully...!!!',
          'top',
          'right'
        );
        this.getRegisteredClasses();
      });
    () => {
      this.showNotification(
        'snackbar-danger',
        ' Failed to approve course. Please try again...!!!',
        'top',
        'right'
      );
    };
  }

  Status(element: Student, status: string) {
    const item: StudentApproval = {
      approvedBy: this.getCurrentUserId(),
      approvedOn: moment().format('YYYY-MM-DD'),
      classId: element.classId._id,
      status,
      studentId: element.studentId.id,
      session: this.getSessions(element),
    };

    this._classService
      .saveApprovedClasses(element.id, item)
      .subscribe((response: any) => {
        this.showNotification(
          'snackbar-success',
          ' Course Withdraw successfully...!!!',
          'top',
          'right'
        );
        this.getRegisteredClasses();
      });
    () => {
      this.showNotification(
        'snackbar-success',
        ' Failed to approve course. Please try again.',
        'top',
        'right'
      );
    };
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

   /** Selects all rows if they are not all selected; otherwise clear selection. */
   masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.forEach((row: ClassModel) =>
          this.selection.select(row)
        );
  }

  getSessions(element: { classId: { sessions: any[] } }) {
    const sessions = element.classId?.sessions?.map((_: any, index: number) => {
      const session: Session = {} as Session;
      session.sessionNumber = index + 1;
      return session;
    });
    return sessions;
  }
}
