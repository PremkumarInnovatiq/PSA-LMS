/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { CourseService } from '@core/service/course.service';
import {  CoursePaginationModel, MainCategory, SubCategory } from '@core/models/course.model';
import Swal from 'sweetalert2';
import { ClassService } from 'app/admin/schedule-class/class.service';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {
  breadscrums = [
    {
      title: 'Courses',
      items: ['Course'],
      active: 'All Courses',
    },
  ];

  coursePaginationModel: Partial<CoursePaginationModel>;
  classesData: any;
  pagination :any;
  totalItems: any;
  pageSizeArr = [10, 25, 50, 100];
  mainCategories!: MainCategory[];
  subCategories!: SubCategory[];
  allSubCategories!: SubCategory[];
  dataSource: any;

  constructor(public _courseService:CourseService,  private classService: ClassService) {
    this.coursePaginationModel = {};
  }

  ngOnInit(){
    this.getAllCourse();
  }
getAllCourse(){
  this.classService.getClassListWithPagination({ ...this.coursePaginationModel, status: 'active' }).subscribe(response =>{
    console.log("res",response)
   this.classesData = response.data.docs;
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
private mapCategories(): void {
  this.coursePaginationModel.docs?.forEach((item) => {
    item.main_category_text = this.mainCategories.find((x) => x.id === item.main_category)?.category_name;
  });

  this.coursePaginationModel.docs?.forEach((item) => {
    item.sub_category_text = this.allSubCategories.find((x) => x.id === item.sub_category)?.category_name;
  });

}
getCoursesList() {
  this._courseService.getAllCourses({ ...this.coursePaginationModel, status: 'active' })
    .subscribe(response => {
      this.dataSource = response.data.docs;
      this.totalItems = response.data.totalDocs
      this.coursePaginationModel.docs = response.data.docs;
      this.coursePaginationModel.page = response.data.page;
      this.coursePaginationModel.limit = response.data.limit;
      this.coursePaginationModel.totalDocs = response.data.totalDocs;
      this.mapCategories();
    }, (error) => {
    }
    )
}
delete(id: string) {
  this.classService.getClassList({ courseId: id }).subscribe((classList: any) => {
    const matchingClasses = classList.docs.filter((classItem: any) => {
      return classItem.courseId && classItem.courseId.id === id;
    });
    if (matchingClasses.length > 0) {
      Swal.fire({
        title: 'Error',
        text: 'Classes have been registered with this course. Cannot delete.',
        icon: 'error',
      });
      return;
    }
    this._courseService.deleteCourse(id).subscribe(() => {
      this.getCoursesList();
      Swal.fire({
        title: 'Success',
        text: 'Course deleted successfully.',
        icon: 'success',
      });
    });
  });
}

}
