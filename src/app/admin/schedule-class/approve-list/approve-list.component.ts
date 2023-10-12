/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import { formatDate } from '@angular/common';
import jsPDF from 'jspdf';
//import 'jspdf-autotable';
import 'jspdf-autotable';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Direction } from '@angular/cdk/bidi';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';

@Component({
  selector: 'app-approve-list',
  templateUrl: './approve-list.component.html',
  styleUrls: ['./approve-list.component.scss'],
})
export class ApproveListComponent  {
  displayedColumns = [
    'select',
    'coursename',
    'studentname',
    'classstartDate',
    'classendDate',
    'registeredDate',
    'actions',
  ];

  breadscrums = [
    {
      title: 'Class List',
      items: ['Schedule Class'],
      active: 'Approve List',
    },
  ];
  searchTerm: string = '';
  studentPaginationModel: StudentPaginationModel;
  selection = new SelectionModel<ClassModel>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;
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
        this.dataSource.sort = this.matSort;
        console.log(this.dataSource)
        this.totalItems = response.data.totalDocs;
        this.mapClassList();

      })
  }
  filterData($event:any){
    console.log($event.target.value)
    this.dataSource.filter = $event.target.value;

  }
  mapClassList() {
    this.studentPaginationModel.docs.forEach((item: Student) => {
      const startDateArr: any = [];
      const endDateArr: any = [];
      item?.classId?.sessions?.forEach((session) => {
        startDateArr.push(new Date(session?.sessionStartDate?.toString()));
        endDateArr.push(new Date(session?.sessionEndDate?.toString()));
      });
      const minStartDate = new Date(Math.min.apply(null, startDateArr));
      const maxEndDate = new Date(Math.max.apply(null, endDateArr));

      item.classStartDate = !isNaN(minStartDate.valueOf()) ? moment(minStartDate).format("YYYY-DD-MM") : "";
      item.classEndDate = !isNaN(maxEndDate.valueOf()) ? moment(maxEndDate).format("YYYY-DD-MM") : "";
      // item.registeredOn = item?.registeredOn ? moment(item.registeredOn).format("YYYY-DD-MM") : "";
      item.studentId.name = `${item?.studentId?.name}`;
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
  performSearch() {
    if(this.searchTerm){
    this.dataSource = this.dataSource?.filter((item: any) =>
    // console.log(item.courseId?.title)

    item.classId.courseId?.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    } else {
      this.getRegisteredClasses();

    }
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

   /** Selects all rows if they are not all selected; otherwise clear selection. */
   masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.forEach((row: any) =>
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

  exportExcel() {
    //k//ey name with space add in brackets
   const exportData: Partial<TableElement>[] =
      this.dataSource.map((user:any) => ({
        CourseName:user.classId?.courseId?.title,
        StudentName:  user.studentId?.name,
        StartDate: user.classStartDate,
        EndDate: user.classEndDate,
        RegisteredOn: user.registeredOn,
      }));
    TableExportUtil.exportToExcel(exportData, 'excel');
  }
  // pdf
  generatePdf() {
    const doc = new jsPDF();
    const headers = [['Course Name', 'Student Name', 'Start Date','End date', 'Registered Date']];
    const data = this.dataSource.map((user:any) =>
      [user.classId?.courseId?.title,
        user.studentId?.name,
        user.classStartDate,
       user.classEndDate,
     user.registeredOn,

    ] );
    //const columnWidths = [60, 80, 40];
    const columnWidths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20];

    // Add a page to the document (optional)
    //doc.addPage();

    // Generate the table using jspdf-autotable
    (doc as any).autoTable({
      head: headers,
      body: data,
      startY: 20,



    });

    // Save or open the PDF
    doc.save('approve-list.pdf');
  }



}
