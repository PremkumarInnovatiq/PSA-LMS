import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CourseKit, CourseKitModel, CourseModel } from '@core/models/course.model';
import { CommonService } from '@core/service/common.service';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';
import { TableElement } from '@shared/TableElement';
import { TableExportUtil } from '@shared/tableExportUtil';
import { VideoPlayerComponent } from 'app/admin/courses/course-kit/video-player/video-player.component';
import jsPDF from 'jspdf';
import {  BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-program-kit',
  templateUrl: './program-kit.component.html',
  styleUrls: ['./program-kit.component.scss']
})
export class ProgramKitComponent {
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
      // title: 'Programs',
      items: ['Programs'],
      active: 'Programs Kit',
    },
  ];
  list = true;
  files: any[] = [];
  editUrl: any;
  viewUrl: any;
  courseKitForm!: FormGroup;
  isSubmitted = false;
  courseKitModel!: Partial<CourseKitModel>;
  totalItems: any;
  courseKits!: any;
  templates: any[] = [];
  pageSizeArr = this.utils.pageSizeArr;
  selection = new SelectionModel<CourseModel>(true, []);
  dataSource: any;
  isLoading = true;
  currentDate: Date;


  headeritems = ["Program Name", "Short Description", "Long Description",
    "Video Link", "Document Link", "Actions"]
  model = { programname: "", sd: "", ld: "", dl: "", vltitle: "", selectopt: false };
  fileDropRef: any;

  constructor(private router: Router, private formBuilder: FormBuilder,
    public utils: UtilsService, private courseService: CourseService,
    private commonService: CommonService,
    private modalServices: BsModalService,
    private snackBar: MatSnackBar,
  ) {
    this.currentDate = new Date();

    this.courseKitModel = {};
    let urlPath = this.router.url.split('/')
    this.editUrl = urlPath.includes('edit');
    this.viewUrl = urlPath.includes('view');
    this.courseKitForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, ...this.utils.validators.title, ...this.utils.validators.noLeadingSpace]),
      documentLink: new FormControl('', [Validators.required,...this.utils.validators.noLeadingSpace]),
      shortDescription: new FormControl('', [ ...this.utils.validators.descripton, ...this.utils.validators.noLeadingSpace]),
      longDescription: new FormControl('', [...this.utils.validators.longDescription, ...this.utils.validators.noLeadingSpace]),
      videoLink: new FormControl('', []),
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
      // sections: new FormControl('', [ Validators.required,...this.utils.validators.sections]),
    } ,{ validator: this.dateValidator }
      // sections: new FormControl('', [ Validators.required,...this.utils.validators.sections]),
    );
  }
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dateValidator(group: FormGroup) {
    const startDate = group.get('startDate')?.value; 
    const endDate = group.get('endDate')?.value;       

    if (startDate && endDate) {
      if (startDate > endDate) {
        group.get('endDate')?.setErrors({ dateError: true }); 
      } else {
        group.get('endDate')?.setErrors(null); 
      }
    }
  }
  parseDate(dateString: string): Date {
    return new Date(dateString);
  }

  
  fileBrowseHandler(event: any) {
    const files = event.target.files;
    this.onFileDropped(files);
  }

  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }
  ngOnInit(): void {
    this.fetchCourseKits();
    this.getJobTemplates();
  }
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
      this.model.vltitle = item.name;
    }
    //this.fileDropEl.nativeElement.value = "";
  }
  toggleList() {
    this.list = !this.list;
  }
  exportExcel() {
    //k//ey name with space add in brackets
   const exportData: Partial<TableElement>[] =
      this.dataSource.map((x: {
        videoLink: any; name: any; shortDescription: any;  longDescription: any; documentLink: any;  
})=>({
        
  
        "Name": x.name,
        "Short Description": x.shortDescription,
        "Long Description": x.longDescription,
       
        
        
        "Document Link": x.documentLink,
        
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }
  generatePdf() {
    const doc = new jsPDF();
    const headers = [['Name', 'Short Description', 'Long Description','Document Link']];
    const data = this.dataSource.map((user: {
      //formatDate(arg0: Date, arg1: string, arg2: string): unknown;

      name: any; shortDescription: any;  longDescription: any; documentLink: any;
    }, index: any) => [user.name, user.shortDescription, user.longDescription,user.documentLink,
     
      //formatDate(new Date(user.joiningDate), 'yyyy-MM-dd', 'en') || '',


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
    doc.save('program-kit-list.pdf');
    
  }

  submitCourseKit(): void {
    this.isSubmitted = true
    console.log("=========", this.courseKitForm)
    if (this.courseKitForm.valid) {
      const courseKitData: CourseKit = this.courseKitForm.value;
      const loader = Swal.fire({
        title: 'Uploading...',
        text: 'Please wait...',
        allowOutsideClick: false,
        timer: 18000,
        timerProgressBar: true
        // onBeforeOpen: () => {
        // //   Swal.showLoading();
        //  },
      })


      this.courseService.uploadProgramVideo(this.files).subscribe(
        (response: any) => {
          const videoId = response.videoIds;
          this.commonService.setVideoId(videoId)

          courseKitData.videoLink = videoId;
          //this.currentVideoIds = [...this.currentVideoIds, ...videoId]
          // this.currentVideoIds.push(videoId);
          this.createProgramCourseKit(courseKitData);

          Swal.close();
        },
        (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Upload Failed',
            text: 'An error occurred while uploading the video',
          });
          Swal.close();
        }
      );
      // } else {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Invalid File Type',
      //     text: 'Please upload video files',
      //   });
      // }
    }

    else {
      //this.createCourseKit(courseKitData);
      // this.isSubmitted=false
    }
  }

  private createProgramCourseKit(courseKitData: CourseKit): void {
    this.courseService.createProgramCourseKit(courseKitData).subscribe(
      () => {
        Swal.fire({
          title: "Successful",
          text: "Program Kit created successfully",
          icon: "success",
        });
        //this.fileDropEl.nativeElement.value = "";
        this.courseKitForm.reset();
        this.toggleList()
        // this.router.navigateByUrl('/Course/create-template');

      },
      (error) => {
        Swal.fire(
          "Failed to create program kit",
          error.message || error.error,
          "error"
        );
      }
    );
  }
  pageSizeChange($event: any) {
    this.courseKitModel.page = $event?.pageIndex + 1;
    this.courseKitModel.limit = $event?.pageSize;
    this.fetchCourseKits();
  }

  fetchCourseKits() {
    this.courseService.getProgramCourseKit({ ...this.courseKitModel })
      .subscribe(response => {
        this.isLoading = false;
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
  deleteItem(item: any) {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this program kit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteProgramCourseKit(item._id).subscribe(
          () => {
            Swal.fire({
              title: "Deleted",
              text: "Program Kit deleted successfully",
              icon: "success",
            });
            this.fetchCourseKits();
          },
          (error: { message: any; error: any; }) => {
            Swal.fire(
              "Failed to delete program kit",
              error.message || error.error,
              "error"
            );
          }
        );
      }
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
