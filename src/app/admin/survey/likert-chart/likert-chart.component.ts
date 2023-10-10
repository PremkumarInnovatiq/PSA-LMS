import {
  Component,
  VERSION,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseTitleModel } from '@core/models/class.model';
import { InstructorService } from '@core/service/instructor.service';
import { ClassService } from 'app/admin/schedule-class/class.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-likert-chart',
  templateUrl: './likert-chart.component.html',
  styleUrls: ['./likert-chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LikertChartComponent {
  name = 'Angular ' + VERSION.major;

  starRating = 0;
  currentRate = 3.14;
  breadscrums = [
    {
      title: 'Likert Chart',
      items: ['Survey'],
      active: 'Likert Chart',
    },
  ];
  selected = false;
  instructorList: any = [];
  courseList!: CourseTitleModel[];
  countNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedIndex: number | undefined;
  favoriteSeason?: string;
  course: string[] = [
    'Strongly Disagree',
    'Disagree',
    'Normal',
    'Agree',
    'Strongly Agree',
  ];
  levelofcourse: string[] = [
    'Strongly Disagree',
    'Disagree',
    'Normal',
    'Agree',
    'Strongly Agree',
  ];
  expectations: string[]=[
    'Strongly Disagree',
    'Disagree',
    'Normal',
    'Agree',
    'Strongly Agree',
  ];
  subject : string[]=[
    'Strongly Disagree',
    'Disagree',
    'Normal',
    'Agree',
    'Strongly Agree',
  ];
  constructor(
    private instructorService: InstructorService,
    private _classService: ClassService
  ) {
    // constructor
  }

  ngOnInit() {
    let payload = {
      type: 'Instructor',
    };

    this.instructorService.getInstructor(payload).subscribe((res) => {
      this.instructorList = res;
      console.log('instructor', this.instructorList);
    });

    this._classService.getAllCoursesTitle('active').subscribe((course) => {
      this.courseList = course;
      console.log('course', this.courseList);
    });
  }
  public setRow(_index: number) {
    this.selectedIndex = _index;
  }
}
