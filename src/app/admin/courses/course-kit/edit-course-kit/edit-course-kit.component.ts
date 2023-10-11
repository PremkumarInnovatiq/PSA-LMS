import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseKit, CourseKitModel } from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-course-kit',
  templateUrl: './edit-course-kit.component.html',
  styleUrls: ['./edit-course-kit.component.scss']
})
export class EditCourseKitComponent {

  breadscrums = [
    {
      title: 'Edit Course Kit',
      items: ['Course'],
      active: 'Edit Course Kit',
    },
  ];
  @ViewChild("fileDropRef", { static: false })
  fileDropEl!: ElementRef;
  
  files: any[] = [];
  //mode: string = 'editUrl';
  course:any
 
  courseKitModel!: Partial<CourseKitModel>
  //files: any[] = [];
  templates: any[] = [];
  list = true;
  isSubmitted = false;
  edit = false;
  courseKits!: any;
  viewUrl=false
  courseKitForm!: FormGroup;
  pageSizeArr = this.utils.pageSizeArr;
  courseId!: string;
  fileName:any;
  subscribeParams: any;

  editUrl=false
  //activatedRoute: any;
  constructor(private router: Router,
    
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public utils: UtilsService,
    private courseService: CourseService,
  ) {
    this.courseKitModel = {};
    let urlPath = this.router.url.split('/')
    this.editUrl = urlPath.includes('edit-course-kit');
    this.viewUrl = urlPath.includes('view-course-kit');
    

    if(this.viewUrl===true){
      this.breadscrums = [
        {
          title:'View Course Kit',
          items: ['Course'],
          active: 'View Course Kit',
        },
      ];
    }
    this.courseKitForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required,Validators.required, ...this.utils.validators.name, ...this.utils.validators.noLeadingSpace ]),
      documentLink: new FormControl('', [Validators.required, ]),
      shortDescription: new FormControl('', [ ]),
      longDescription: new FormControl('', []),
      videoLink:new FormControl('',[]),
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
      // sections: new FormControl('', [ Validators.required,...this.utils.validators.sections]),
    } ,{ validator: this.dateValidator });

    
    this.subscribeParams = this.activatedRoute.params.subscribe((params:any) => {
      this.courseId = params.id;
    });
    // if(this.editUrl || this.viewUrl){
    //   this.getData();
    //   }

  }
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
  ngOnInit(): void {
        //this.setup()
    this.getData();
  }

  // submitCourseKit(): void {

  // }
  submitCourseKit(): void {
    const courseKitData: CourseKit = this.courseKitForm.value;
      
    if (this.courseKitForm.valid) {
    
      const updatedCourseKit: CourseKit = {
        id: this.courseId,
        ...this.courseKitForm.value,

      };
      this.courseService
        .editCourseKit(this.courseId, updatedCourseKit)
        .subscribe(
          () => {
            Swal.fire({
              title: "Updated",
              text: "Course Kit updated successfully",
              icon: "success",
            });
            //this.modalRef.close();
            this.router.navigateByUrl("/admin/courses/course-kit")
          },
          (error: { message: any; error: any; }) => {
            Swal.fire(
              "Failed to update course kit",
              error.message || error.error,
              "error"
            );
          }
        );
    } else {
      this.isSubmitted=true;    }
  }
  toggleList() {
    this.router.navigateByUrl("Course/Course Kit")

  }
  
 
  getData(){
    forkJoin({
      course: this.courseService.getCourseKitById(this.courseId),
      
    }).subscribe((response: any) => {
      if(response){
        this.course = response.course;
        this.fileName=response?.course?.videoLink?response?.course?.videoLink[0].filename:null
        let startingDate=response?.course?.startDate;
        let endingDate=response?.course?.endDate;
        let startTime=response?.course?.startDate.split("T")[1];
        let startingTime=startTime?.split(".")[0];
        let endTime=response?.course?.endDate.split("T")[1];
        let endingTime=endTime?.split(".")[0];

        this.courseKitForm.patchValue({
          name: response?.course?.name,
          documentLink: response?.course?.documentLink,
          shortDescription: response?.course?.shortDescription,
          longDescription: response?.course?.longDescription,
          videoLink: response?.course?.videoLink?response?.course?.videoLink[0]._id:null,
          startDate:this.courseKitForm.get('startDate')?.patchValue(startingDate),
            // moment(startingDate).format("MM/DD/YYYY,h:mm A"),
            endDate:this.courseKitForm.get('endDate')?.patchValue(endingDate),
          
        });

      }
     
      
      
      
    });
  

  }
 




  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    this.prepareFilesList($event);
    this.fileName=""
  }

  /**
   * handle file from browsing
   */
  // fileBrowseHandler(f: any) {
  //   this.prepareFilesList(f.files);
  // }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
      this.fileName=""
      //this.model.vltitle = item.name;
    }
    //this.fileDropEl.nativeElement.value = "";
  }
  fileBrowseHandler(event: any) {
    const files = event.target.files;
    this.onFileDropped(files);
    this.fileName=""
  }


}
