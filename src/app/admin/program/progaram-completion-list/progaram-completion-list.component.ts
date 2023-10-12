import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Student, StudentApproval, StudentPaginationModel } from '@core/models/class.model';
import { UtilsService } from '@core/service/utils.service';
import { TableElement } from '@shared/TableElement';
import { TableExportUtil } from '@shared/tableExportUtil';
import { ClassService } from 'app/admin/schedule-class/class.service';
import jsPDF from 'jspdf';
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

  changeStatus(element: Student) {
    let item: StudentApproval = {
      approvedBy: this.getCurrentUserId(),
      approvedOn: moment().format("YYYY-MM-DD"),
      classId: element.classId._id,
      status: "completed",
      studentId: element.studentId.id,
      session: [] 
    };
  

    this.classService.saveApprovedProgramClasses(element.id, item).subscribe((response:any) => {
      Swal.fire({
        title: 'Success',
        text: 'Program approved successfully.',
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
    doc.save('student-completion.pdf');
  }

}
