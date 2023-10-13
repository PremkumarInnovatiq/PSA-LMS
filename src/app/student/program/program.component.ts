/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { CourseService } from '@core/service/course.service';
import {  CoursePaginationModel, MainCategory, SubCategory } from '@core/models/course.model';
import Swal from 'sweetalert2';
import { ClassService } from 'app/admin/schedule-class/class.service';
@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
})
export class ProgramComponent {
  breadscrums = [
    {
      title: 'Programs',
      items: ['Program'],
      active: 'All Programs',
    },
  ];

  coursePaginationModel: Partial<CoursePaginationModel>;
  studentRegisteredModel!: Partial<CoursePaginationModel>;
  studentApprovedModel!: Partial<CoursePaginationModel>;


  classesData: any;
  pagination :any;
  totalItems: any;
  pageSizeArr = [10, 25, 50, 100];
  mainCategories!: MainCategory[];
  subCategories!: SubCategory[];
  allSubCategories!: SubCategory[];
  dataSource: any;
  studentRegisteredClasses: any;
  totalRegisteredItems: any;
  studentApprovedClasses: any;
  totalApprovedItems: any;



  constructor(public _courseService:CourseService,  private classService: ClassService) {
    this.coursePaginationModel = {};
    this.studentRegisteredModel = {};
    this.studentApprovedModel = {};


  }

  ngOnInit(){
    this.getClassList();
    this.getRegisteredCourse();
    this.getApprovedCourse();

  }

getClassList() {
  this.classService.getProgramClassListWithPagination({ ...this.coursePaginationModel,status:'active' }).subscribe(
    (response) => {
      this.dataSource = response.data.docs;
      this.totalItems = response.data.totalDocs
      this.coursePaginationModel.docs = response.data.docs;
      this.coursePaginationModel.page = response.data.page;
      this.coursePaginationModel.limit = response.data.limit;
    },
    (error) => {
    }
  );
}
getRegisteredCourse(){
  let studentId=localStorage.getItem('id')
  const payload = { studentId: studentId, status: 'registered' };
  this.classService.getStudentRegisteredProgramClasses(payload).subscribe(response =>{
   this.studentRegisteredClasses = response.data.docs;
   this.totalRegisteredItems = response.data.totalDocs
   this.studentRegisteredModel.docs = response.data.docs;
   this.studentRegisteredModel.page = response.data.page;
   this.studentRegisteredModel.limit = response.data.limit;
   this.studentRegisteredModel.totalDocs = response.data.totalDocs;
  })
}
getApprovedCourse(){
  let studentId=localStorage.getItem('id')
  const payload = { studentId: studentId, status: 'approved' };
  this.classService.getStudentRegisteredProgramClasses(payload).subscribe(response =>{
   this.studentApprovedClasses = response.data.docs;
   this.totalApprovedItems = response.data.totalDocs
   this.studentApprovedModel.docs = response.data.docs;
   this.studentApprovedModel.page = response.data.page;
   this.studentApprovedModel.limit = response.data.limit;
   this.studentApprovedModel.totalDocs = response.data.totalDocs;
  })
}


pageSizeChange($event: any) {
  this.coursePaginationModel.page = $event?.pageIndex + 1;
  this.coursePaginationModel.limit = $event?.pageSize;
  this.getClassList();
}
pageStudentRegisteredSizeChange($event: any) {
  this.studentRegisteredModel.page = $event?.pageIndex + 1;
  this.studentRegisteredModel.limit = $event?.pageSize;
  this.getRegisteredCourse();
}
pageStudentApprovedSizeChange($event: any) {
  this.studentApprovedModel.page = $event?.pageIndex + 1;
  this.studentApprovedModel.limit = $event?.pageSize;
  this.getApprovedCourse();
}


}
