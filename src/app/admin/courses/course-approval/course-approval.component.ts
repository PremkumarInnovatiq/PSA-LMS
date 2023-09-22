import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CourseModel, CoursePaginationModel, MainCategory, SubCategory } from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { forkJoin, map} from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-approval',
  templateUrl: './course-approval.component.html',
  styleUrls: ['./course-approval.component.scss']
})
export class CourseApprovalComponent {
  displayedColumns: string[] = [
    'select',
    'Course Name',
    'Course Code',
    'Main Category',
    'Sub Category',
    'Fees',
    'status'
  ];
  breadscrums = [
    {
      title: 'Course Approval',
      items: ['Course'],
      active: 'Course Approval',
    },
  ];
  edit :boolean = false;
  dataSource: any;
  mainCategories!: MainCategory[]; 
  subCategories!: SubCategory[];
  allSubCategories!: SubCategory[];
  coursePaginationModel: Partial<CoursePaginationModel>;
  totalItems: any;
  pageSizeArr = [10, 20, 50, 100];
  isLoading = true;
  selection = new SelectionModel<CourseModel>(true, []);

  constructor(private router: Router,
  private courseService: CourseService,private cd: ChangeDetectorRef, private snackBar: MatSnackBar){
    this.coursePaginationModel = {};
    this.coursePaginationModel.main_category = '0';
    this.coursePaginationModel.sub_category = '0';
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  upload() {
    document.getElementById('input')?.click();
  }
  selectopt(item: any) {
    item.optselected = !item.optselected;
  }

  ngOnInit(): void {
    this.setup()
  }
  private setup(): void {
    forkJoin({
      mainCategory: this.courseService.getMainCategories(),
      subCategory: this.courseService.getSubCategories(),
    }).subscribe((response:any) => {
      this.mainCategories = response.mainCategory;
      this.allSubCategories = response.subCategory;
      this.getCoursesList();
      this.cd.detectChanges();
    });
  }
  mainCategoryChange(): void {
    this.coursePaginationModel.sub_category = (0).toString();
    this.subCategories =this.coursePaginationModel.main_category
        ? this.allSubCategories.filter((item) => item.main_category_id === this.coursePaginationModel.main_category):[]
        this.getCoursesList()
  }
  private mapCategories(): void {
    this.coursePaginationModel.docs?.forEach((item) => {
      item.main_category_text = this.mainCategories.find((x) => x.id === item.main_category)?.category_name;
    });

    this.coursePaginationModel.docs?.forEach((item) => {
      item.sub_category_text = this.allSubCategories.find((x) => x.id === item.sub_category)?.category_name;
    });
    
  }
  pageSizeChange($event: any) {
    this.coursePaginationModel.page= $event?.pageIndex + 1;
    this.coursePaginationModel.limit= $event?.pageSize;
    this.getCoursesList();
   }
 
  getCoursesList(){
    this.courseService.getAllCourses({...this.coursePaginationModel, status: 'inactive' })
        .subscribe(response => {
          this.isLoading = false;
          this.coursePaginationModel.docs = response.data.docs;
          this.coursePaginationModel.page = response.data.page;
            this.coursePaginationModel.limit = response.data.limit;
            this.coursePaginationModel.totalDocs = response.data.totalDocs;
            this.dataSource=response.data.docs;
            console.log("submit",this.dataSource);
            this.totalItems=response.data.totalDocs
            this.mapCategories();
                  }, (error) => {    
          }
          )
  }
  approveCourse(course: CourseModel): void {
    course.status = 'active';
    this.courseService.updateCourse(course).subscribe(() => {
      Swal.fire({
        title: 'Success',
        text: 'Course approved successfully.',
        icon: 'success',
        confirmButtonColor: '#526D82',
      });
      this.getCoursesList();
    }, (error) => {
      Swal.fire({
        title: 'Error',
        text: 'Failed to approve course. Please try again.',
        icon: 'error',
        confirmButtonColor: '#526D82',
      });
    });
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
