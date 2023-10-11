import { SelectionModel } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Session, Student, StudentApproval, StudentPaginationModel } from '@core/models/class.model';
import { CourseModel, CoursePaginationModel } from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';
import { TableElement } from '@shared/TableElement';
import { TableExportUtil } from '@shared/tableExportUtil';
import { ClassService } from 'app/admin/schedule-class/class.service';
import jsPDF from 'jspdf';
import * as moment from 'moment';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-approval-list',
  templateUrl: './student-approval-list.component.html',
  styleUrls: ['./student-approval-list.component.scss']
})
export class StudentApprovalListComponent {
  displayedColumns: string[] = [
    'select',
    'Program Name',
    'Student Name',
    'Class Start Date',
    'Class End Date',
    'Registered Date',
    'actions'
  ];
  breadscrums = [
    {
      items: ['Student Approval'],
      active: 'Student Approval list',
    },
  ];

  dataSource: any;
  pageSizeArr =[10, 20, 50, 100];
  totalPages: any;
  studentPaginationModel: StudentPaginationModel;
  selection = new SelectionModel<CourseModel>(true, []);
  isLoading :any;
  coursePaginationModel!: Partial<CoursePaginationModel>;


  upload() {
    document.getElementById('input')?.click();
  }

  constructor(private classService: ClassService,
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    private utils:UtilsService) {
    // this.displayedColumns = ["title", "studentName", "classStartDate", "classEndDate",  "action"];
    this.studentPaginationModel = {} as StudentPaginationModel;
  }
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

    ngOnInit(): void {
      this.getRegisteredClasses();
    }

  getRegisteredClasses() {
    this.classService
      .getProgramRegisteredClasses(this.studentPaginationModel.page, this.studentPaginationModel.limit, this.studentPaginationModel.filterText)
      .subscribe((response: { data: StudentPaginationModel; }) => {
        this.isLoading = false;
        // console.log(response.data.docs)
        this.studentPaginationModel = response.data;
      this.dataSource = response.data.docs;
      this.totalPages = response.data.totalDocs;
      })
  }

  getCurrentUserId(): string {
    return JSON.parse(localStorage.getItem("user_data")!).user.id;
  }
  pageSizeChange($event: any) {
    this.coursePaginationModel.page= $event?.pageIndex + 1;
    this.coursePaginationModel.limit= $event?.pageSize;
    this.getRegisteredClasses();
   }

  changeStatus(element: Student, status:string) {
    debugger
    let item: StudentApproval = {
      approvedBy: this.getCurrentUserId(),
      approvedOn: moment().format("YYYY-MM-DD"),
      classId: element.classId._id,
      status,
      studentId: element.studentId.id,
      session: this.getSessions(element)
    };
    this.classService.saveApprovedProgramClasses(element.id, item).subscribe((response:any) => {
      Swal.fire({
        title: 'Success',
        text: 'Program approved successfully.',
        icon: 'success',
        confirmButtonColor: '#526D82',
      });  
      this.getRegisteredClasses();
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
  Status(element: Student, status:string) {
    let item: StudentApproval = {
      approvedBy: this.getCurrentUserId(),
      approvedOn: moment().format("YYYY-MM-DD"),
      classId: element.classId._id,
      status,
      studentId: element.studentId.id,
      session: this.getSessions(element)
    };
   
    this.classService.saveApprovedProgramClasses(element.id, item).subscribe((response:any) => {
      Swal.fire({
        title: 'Success',
        text: 'Program withdrawn successfully.',
        icon: 'success',
        confirmButtonColor: '#526D82',
      });
      this.getRegisteredClasses();
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
  exportExcel() {
    //k//ey name with space add in brackets
   const exportData: Partial<TableElement>[] =
      this.dataSource.map((x: { program_name: any; student_name: any; classStartDate: string | number | Date; classEndDate: string | number | Date; registeredOn: string | number | Date; })=>({
        "Program Name": x.program_name,
        "Student Name": x.student_name,
        'Class Start Date': formatDate(new Date(x.classStartDate), 'yyyy-MM-dd', 'en') || '',
        'Class End Date': formatDate(new Date(x.classEndDate), 'yyyy-MM-dd', 'en') || '',
        'Registered Date': formatDate(new Date(x.registeredOn), 'yyyy-MM-dd', 'en') || '',
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }
  generatePdf() {
    const doc = new jsPDF();
    const headers = [['Program Name', 'Student Name', 'Class Start Date','Class End Date','Registered Date']];
    const data = this.dataSource.map((user: {
      //formatDate(arg0: Date, arg1: string, arg2: string): unknown;

      program_name: any; student_name: any; classStartDate: any; classEndDate: any; registeredOn: any; 
    }, index: any) => [user.program_name, user.student_name, 
      
      formatDate(new Date(user.classStartDate), 'yyyy-MM-dd', 'en') || '',
      formatDate(new Date(user.classEndDate), 'yyyy-MM-dd', 'en') || '',
      formatDate(new Date(user.registeredOn), 'yyyy-MM-dd', 'en') || '',


    ]);
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
    doc.save('student-approve.pdf');
  }


  getSessions(element: { classId: { sessions: any[]; }; }) {
    let sessions = element.classId?.sessions?.map((_: any, index: number) => {
      let session: Session = {} as Session;
      session.sessionNumber = index + 1;
      return session;
    });
    return sessions;
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
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.forEach((row: CourseModel) =>
          this.selection.select(row)
        );
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
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.findIndex(
        (d: CourseModel) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.courseService?.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<CourseModel>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'top',
      'right'
    );
  }

}
