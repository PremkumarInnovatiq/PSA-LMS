import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseKitModel } from '@core/models/course.model';
import { CommonService } from '@core/service/common.service';
import { CourseService } from '@core/service/course.service';
import { VideoPlayerComponent } from 'app/admin/courses/course-kit/video-player/video-player.component';
import { ClassService } from 'app/admin/schedule-class/class.service';
import {  BsModalService, ModalOptions} from "ngx-bootstrap/modal";

import Swal from 'sweetalert2';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
 
];
@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent {
  displayedColumns: string[] = ['position', ' Class Start Date ', ' Class End Date ', 'action'];
  displayedColumns1: string[] = [
    'Course Name',
    'Short Description',
    'Long Description',
    'Video Link',
    'Document Link'
    ];
  dataSource:any;
  courseKitModel!: Partial<CourseKitModel>;
  templates: any[] = [];
  currentDate!: Date;
  breadscrums = [
    {
      title: 'Courses',
      items: ['Course'],
      active: 'View Details',
    },
  ];
  isRegistered = false;
  subscribeParams: any;
  classId: any;
  classDetails: any;
  courseId: any;
  courseKitDetails:any;
  studentClassDetails: any;
  isStatus = false
  constructor(private classService: ClassService,private activatedRoute:ActivatedRoute,private modalServices:BsModalService, private courseService:CourseService){
    this.subscribeParams = this.activatedRoute.params.subscribe((params) => {
      this.classId = params["id"];
    });
    this.getRegisteredClassDetails();
    this.getClassDetails();
  

  }
  getClassDetails(){
    this.classService.getClassById(this.classId).subscribe((response)=>{
      this.classDetails =response;
      this.courseId=this.classDetails.courseId.id
      this.dataSource=this.classDetails.sessions;
      this.getCourseKitDetails();
    })
  }
  registerClass(classId: string) {
    let studentId=localStorage.getItem('id')
    this.courseService.saveRegisterClass(studentId, this.classId).subscribe((response) => {
      let studentId=localStorage.getItem('user_data');
        Swal.fire({
          title: 'Thank you',
          text: 'We will approve once verified',
          icon: 'success',
        });
      this.isRegistered = true;
      this.getClassDetails();
    });
  }
  getCourseKitDetails(){
    this.courseService.getCourseById(this.courseId).subscribe((response) => {
      this.courseKitDetails=response?.course_kit;
    });
  }
  getRegisteredClassDetails(){
    let studentId=localStorage.getItem('id')
    this.courseService.getStudentClass(studentId,this.classId).subscribe((response) => {
      this.studentClassDetails=response.data;
      if(this.studentClassDetails.status =='registered'){
        console.log('hi',this.studentClassDetails.status)
        this.isRegistered == true;
        this.isStatus=true;
      }
    });
  }
  // getCourseKitDetails(){
  //   this.courseService.getClassList(this.courseId).subscribe((response) => {
  //     this.courseKitDetails=response?.course_kit;
  //   });
  // }
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
}
