import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeachersService } from '../all-teachers/teachers.service';

@Component({
  selector: 'app-about-teacher',
  templateUrl: './about-teacher.component.html',
  styleUrls: ['./about-teacher.component.scss'],
})
export class AboutTeacherComponent {
  breadscrums = [
    {
      title: 'Profile',
      items: ['Instructor'],
      active: 'Profile',
    },
  ];
  aboutDataId: any;
  aboutData:any
  constructor(private activeRoute:ActivatedRoute, private StudentService:TeachersService,) {
    this.activeRoute.queryParams.subscribe(param =>{
    console.log("params:",param['data'])
 
    this.aboutDataId = param['data'];
    })
   }
 
   ngOnInit() {
     this.loadData();
   }
 
 
   loadData(){
     this.StudentService.getUserById( this.aboutDataId).subscribe(res => {
       this.aboutData = res;
       console.log("edit",this.aboutData)
 
     })
 }
 }

