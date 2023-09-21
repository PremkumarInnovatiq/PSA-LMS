/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { CourseService } from '@core/service/course.service';
import {  CoursePaginationModel } from '@core/models/course.model';
@Component({
  selector: 'app-all-course',
  templateUrl: './all-course.component.html',
  styleUrls: ['./all-course.component.scss'],
})
export class AllCourseComponent {
  breadscrums = [
    {
      title: 'All Course',
      items: ['Course'],
      active: 'All Course',
    },
  ];

  coursePaginationModel: Partial<CoursePaginationModel>;
  courseData: any;
  pagination :any;
  totalItems: any;
  pageSizeArr = [10, 25, 50, 100];
  constructor(public _courseService:CourseService) {
    // constructor
    this.coursePaginationModel = {};
  }

  ngOnInit(){
    this.getAllCourse();
  }
getAllCourse(){
  this._courseService.getAllCourses({ ...this.coursePaginationModel, status: 'active' }).subscribe(response =>{
    console.log("res",response)
   this.courseData = response.data.docs;
   this.totalItems = response.data.totalDocs
   this.coursePaginationModel.docs = response.data.docs;
   this.coursePaginationModel.page = response.data.page;
   this.coursePaginationModel.limit = response.data.limit;
   this.coursePaginationModel.totalDocs = response.data.totalDocs;
  })
}
pageSizeChange($event: any) {
  this.coursePaginationModel.page = $event?.pageIndex + 1;
  this.coursePaginationModel.limit = $event?.pageSize;
  this.getAllCourse();
}
}
