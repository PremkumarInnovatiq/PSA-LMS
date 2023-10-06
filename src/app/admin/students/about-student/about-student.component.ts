import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { StudentsService } from '../all-students/students.service';

@Component({
  selector: 'app-about-student',
  templateUrl: './about-student.component.html',
  styleUrls: ['./about-student.component.scss'],
})
export class AboutStudentComponent {
  breadscrums = [
    {
      title: 'Profile',
      items: ['Student'],
      active: 'Profile',
    },
  ];
  aboutDataId:any;
  aboutData:any;
  constructor(private activeRoute:ActivatedRoute, private StudentService:StudentsService,) {
   this.activeRoute.queryParams.subscribe(param =>{
   console.log("params:",param['data'])

   this.aboutDataId = param['data'];
   })
  }

  ngOnInit() {
    this.loadData();
  }


  loadData(){
    this.StudentService.getStudentById( this.aboutDataId).subscribe(res => {
      this.aboutData = res;
      console.log("edit",this.aboutData)

    })
}
}



