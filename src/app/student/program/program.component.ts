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
    this.getClassList();
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
pageSizeChange($event: any) {
  this.coursePaginationModel.page = $event?.pageIndex + 1;
  this.coursePaginationModel.limit = $event?.pageSize;
  this.getClassList();
}
private mapCategories(): void {
  this.coursePaginationModel.docs?.forEach((item) => {
    item.main_category_text = this.mainCategories.find((x) => x.id === item.main_category)?.category_name;
  });

  this.coursePaginationModel.docs?.forEach((item) => {
    item.sub_category_text = this.allSubCategories.find((x) => x.id === item.sub_category)?.category_name;
  });

}


}
