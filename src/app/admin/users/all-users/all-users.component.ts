import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModel, CoursePaginationModel } from '@core/models/course.model';
import { Users } from '@core/models/user.model';
import { CourseService } from '@core/service/course.service';
import { UserService } from '@core/service/user.service';
import { UtilsService } from '@core/service/utils.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent {

  displayedColumns: string[] = [
    'select',
    'Name',
    'User Type',
    'Qualification',
    'Email',
    'Status',
    'Actions'
  ];
  breadscrums = [
    {
      title: 'All User',
      items: ['Users'],
      active: 'All User',
    },
  ];
  create = true;
  status = true;
  dataSource: any;
  response: any;
  isLoading = true;
  selection = new SelectionModel<CourseModel>(true, []);
  coursePaginationModel!: Partial<CoursePaginationModel>;
  totalItems: any;
  pageSizeArr = this.utils.pageSizeArr;

  constructor(private router: Router,
    public utils: UtilsService,
    private alluserService: UserService,
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private courseService: CourseService,
    private snackBar: MatSnackBar
    
  ) {
    
    this.coursePaginationModel = {};
}

@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
@ViewChild('filter', { static: true }) filter!: ElementRef;

getBlogsList(filters?:any) {
  this.alluserService.getUserList({...this.coursePaginationModel}).subscribe((response: any) => {
    this.dataSource = response.data.data;
    this.isLoading = false;
    this.ref.detectChanges();
    this.totalItems = response.totalRecords
    this.coursePaginationModel.docs = response.docs;
    this.coursePaginationModel.page = response.page;
    this.coursePaginationModel.limit = response.limit;

  }, error => {
  });
}

ngOnInit(): void {
  this.activatedRoute.queryParams.subscribe((params: any) => {
    this.getBlogsList(params);
  });
  
}

pageSizeChange($event: any) {
  this.coursePaginationModel.page = $event?.pageIndex + 1;
  this.coursePaginationModel.limit = $event?.pageSize;
  this.getBlogsList()
 
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
