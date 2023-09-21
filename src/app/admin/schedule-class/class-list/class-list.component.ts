/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ClassService } from '../class.service';
import { CoursePaginationModel } from '@core/models/course.model';
import * as moment from 'moment';
import { SelectionModel } from '@angular/cdk/collections';
import { ClassModel, Session, Student, StudentApproval } from '../class.model';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
// import { fromEvent } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from '@shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss'],
})
export class ClassListComponent extends UnsubscribeOnDestroyAdapter{
  displayedColumns = [
    'select',
    'img',
    'Course Name',
    'Start Date',
    'End Date',
    'actions',
  ];

  breadscrums = [
    {
      title: 'Class List',
      items: ['Schedule Class'],
      active: 'Class List',
    },
  ];
  coursePaginationModel!: Partial<CoursePaginationModel>;
  selection = new SelectionModel<ClassModel>(true, []);
  dataSource: any;
  totalItems: any;
  isLoading = true;
  pageSizeArr = [10, 20, 50, 100]

  constructor(public _classService: ClassService, private snackBar: MatSnackBar) {

    super();
    this.coursePaginationModel = {};
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  ngOnInit(): void {
    this.getClassList();
  }

  getClassList() {
    this._classService
      .getClassListWithPagination({ ...this.coursePaginationModel })
      .subscribe(
        (response) => {
          console.log('classRes', response);
          if (response.data) {
            this.isLoading = false;
            this.dataSource = response.data.docs;
            this.totalItems = response.data.totalDocs;
            this.coursePaginationModel.docs = this.dataSource;
            this.coursePaginationModel.page = response.data.page;
            this.coursePaginationModel.limit = response.data.limit;
            this.mapClassList();
          }
          // this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
          //   () => {
          //     if (!this.dataSource) {
          //       return;
          //     }
          //     this.dataSource.filter = this.filter.nativeElement.value;
          //   }
          // );
        },
        (error) => {
          console.log('error', error);
        }
      );
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

  pageSizeChange($event: any) {
    console.log("event", $event)
    this.coursePaginationModel.page = $event?.pageIndex + 1;
    this.coursePaginationModel.limit = $event?.pageSize;
    this.getClassList();
  }

  mapClassList() {
    this.dataSource.forEach((item: any) => {
      const startDateArr: any = [];
      const endDateArr: any = [];
      item.sessions.forEach(
        (session: {
          sessionStartDate: { toString: () => string | number | Date };
          sessionEndDate: { toString: () => string | number | Date };
        }) => {
          startDateArr.push(new Date(session.sessionStartDate.toString()));
          endDateArr.push(new Date(session.sessionEndDate.toString()));
        }
      );
      const minStartDate = new Date(Math.min.apply(null, startDateArr));
      const maxEndDate = new Date(Math.max.apply(null, endDateArr));
      item.classStartDate = !isNaN(minStartDate.valueOf())
        ? moment(minStartDate).format('YYYY-DD-MM')
        : '';
      item.classEndDate = !isNaN(maxEndDate.valueOf())
        ? moment(maxEndDate).format('YYYY-DD-MM')
        : '';
      item.registeredOn = item.registeredOn
        ? moment(item.registeredOn).format('YYYY-DD-MM')
        : '';
    });
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
        (d: ClassModel) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this._classService?.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<ClassModel>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'top',
      'right'
    );
  }



}
