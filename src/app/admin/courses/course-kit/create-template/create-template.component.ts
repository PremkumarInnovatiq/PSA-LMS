import { Component, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { CommonService } from '@core/service/common.service';
import { CourseService } from '@core/service/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent {
  breadscrums = [
    {
      title: 'Create Template',
      items: ['Course'],
      active: 'Create Template',
    },
  ];

  @ViewChild("videoInput") videoInput: any;
  @ViewChild(MatSelect) videoSelect!: MatSelect;

  currentVideo!: string;
  child: any;
  currentStep = 1;
  currentVideoId!: string;
  templates: any[] = [];
  selectedTemplateName: string = '';
  selectedVideoId!:string;
  currentVideoIds: string[] = [];
  uploadedVideos: any;

  constructor(
    private courseService: CourseService,
    private commonService: CommonService,
    private router: Router
    ){

  }
  ngOnInit(){
    this.getJobTemplates();
    this.getUploadedVideos();
  }
  getJobTemplates(): void {
    this.courseService.getJobTempletes().subscribe(
      (data: any) => {
        this.templates = data.templates;

      },
      (error) => {
        console.error('Error fetching job templates:', error);
      }
    );
  }
  getUploadedVideos(): void {
    this.courseService.getUploadedVideos().subscribe(
      (data: any) => {
        this.uploadedVideos = data.data;
        this.uploadedVideos = data.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

      },
      (error) => {
        console.error("Error fetching job templates:", error);
      }
    );
  }


  convertTemplateOne(): void {
    if (this.selectedTemplateName) {
        const loader = Swal.fire({
          title: "Converting ...",
          text: "Please wait...",
          allowOutsideClick: false,
        });
       let videoId= this.commonService.getVideoId();
        this.courseService
          .convertMediaAws(videoId[0], this.selectedTemplateName)
          .subscribe(
            () => {
              Swal.fire({
                icon: "success",
                title: "Conversion Success",
                text: "Video(s) converted successfully",
              }).then(() => {
                this.router.navigate(['/admin/courses/course-kit'])
              });
              this.currentVideoId = "";
              this.currentStep = 1;
            },
            (error) => {
              console.error(error);
              Swal.fire({
                icon: "error",
                title: "Conversion Failed",
                text: "An error occurred during video conversion",
              });
            }
          )
          .add(() => {
            loader.then((result:any) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                return;
              }
              Swal.close();
            });
          });
    } else {
      console.error("Please select a template first.");
    }
  }
}
