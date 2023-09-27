import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CourseKitModel, CourseModel, CoursePaginationModel } from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';
import Swal from 'sweetalert2';
import {  BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import { VideoPlayerComponent } from './video-player/video-player.component';

@Component({
  selector: 'app-course-kit',
  templateUrl: './course-kit.component.html',
  styleUrls: ['./course-kit.component.scss']
})
export class CourseKitComponent implements OnInit{
  displayedColumns: string[] = [
    'select',
    'Course Name',
    'Short Description',
    'Long Description',
    'Video Link',
    'Document Link',
    'status',
  ];

  breadscrums = [
    {
      title: 'Course Kit',
      items: ['Course'],
      active: 'Course Kit',
    },
  ];

  coursePaginationModel!: Partial<CoursePaginationModel>;
  totalItems: any;
  pageSizeArr = this.utils.pageSizeArr;
  selection = new SelectionModel<CourseModel>(true, []);
  dataSource: any;
  isLoading = true;
  courseKitModel!: Partial<CourseKitModel>;
  templates: any[] = [];
  currentDate: Date;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public utils: UtilsService,
    private snackBar: MatSnackBar,
    private courseService: CourseService,
    private modalServices: BsModalService,
  ) {
    this.currentDate = new Date();
    this.courseKitModel = {};
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  ngOnInit(){
    this.fetchCourseKits();
    this.getJobTemplates();
  }

  fetchCourseKits() {
    this.courseService.getCourseKit({ ...this.courseKitModel })
      .subscribe(response => {
        this.isLoading = false;
        console.log("===response==",response)
        this.totalItems = response.totalDocs
        
        this.dataSource = response.docs;
        this.courseKitModel.docs = response.docs;
        this.courseKitModel.page = response.page;
        this.courseKitModel.limit = response.limit;
        this.courseKitModel.totalDocs = response.totalDocs;

        this.getJobTemplates();

      }, (error) => {

      });

  }

  getJobTemplates() {
    this.courseService.getJobTempletes().subscribe(
      (data: any) => {
        this.templates = data.templates;
      },
      (error) => {
        console.error('Error fetching job templates:', error);
      }
    );
  }

  playVideo(video: { url: any; }): void {
    if (video?.url) {
      this.openVidePlayer(video);
    } else {
      console.error("Invalid video URL");
    }
  }

  openVidePlayer(videoLink: { url?: any; id?: any; }): void {
    // const { videoLink } = videoLink;
    if (videoLink?.id) {
      const videoId = videoLink.id;
      this.courseService.getVideoById(videoId).subscribe((res) => {
        const videoURL = res.data.videoUrl;
        if (!videoURL) {
          Swal.fire({
            icon: "error",
            title: "Video Convert is Pending",
            text: "Please start convert this video",
          });
          return
          
        }
        const videoType = "application/x-mpegURL";
        if (videoURL) {
          const initialState: ModalOptions = {
            initialState: {
              videoURL,
              videoType,
            },
            class: "videoPlayer-modal",
          };
          this.modalServices.show(VideoPlayerComponent, initialState);
        }
      });
    }
  }
  
  parseDate(dateString: string): Date {
    return new Date(dateString);
  }

  deleteItem(item: any) {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this course kit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteCourseKit(item._id).subscribe(
          () => {
            Swal.fire({
              title: "Deleted",
              text: "Course Kit deleted successfully",
              icon: "success",
            });
            this.fetchCourseKits();
          },
          (error: { message: any; error: any; }) => {
            Swal.fire(
              "Failed to delete course kit",
              error.message || error.error,
              "error"
            );
          }
        );
      }
    });
  }

  pageSizeChange($event: any) {
    this.coursePaginationModel.page = $event?.pageIndex + 1;
    this.coursePaginationModel.limit = $event?.pageSize;
   
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
