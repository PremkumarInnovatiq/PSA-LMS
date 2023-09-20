import { Component } from '@angular/core';

@Component({
  selector: 'app-all-course',
  templateUrl: './all-course.component.html',
  styleUrls: ['./all-course.component.scss'],
})
export class AllCourseComponent {
  breadscrums = [
    {
      title: 'All Course',
      items: ['Course'],
      active: 'All Course',
    },
  ];

   dataSource = [
    {
    src:'assets/images/banner/course1.png',
    circleSrc:'assets/images/user/user1.jpg',
    courseName:'PHP Development Course',
    hours:'25 mins',
    description:`'In this course, you'll explore the basic structure of a web
    application, and
    how a web
    browser interacts with a web server,as well as the basic syntax and data
    structures of the
    PHP language'`,

   },
   {
    src:'assets/images/banner/course1.png',
    circleSrc:'assets/images/user/user1.jpg',
    courseName:'PHP Development Course',
    hours:'25 mins',
    description:`'In this course, you'll explore the basic structure of a web
    application, and
    how a web
    browser interacts with a web server,as well as the basic syntax and data
    structures of the
    PHP language'`,

   },
   {
    src:'assets/images/banner/course1.png',
    circleSrc:'assets/images/user/user1.jpg',
    courseName:'PHP Development Course',
    hours:'25 mins',
    description:`'In this course, you'll explore the basic structure of a web
    application, and
    how a web
    browser interacts with a web server,as well as the basic syntax and data
    structures of the
    PHP language'`,

   },
   {
    src:'assets/images/banner/course1.png',
    circleSrc:'assets/images/user/user1.jpg',
    courseName:'PHP Development Course',
    hours:'25 mins',
    description:`'In this course, you'll explore the basic structure of a web
    application, and
    how a web
    browser interacts with a web server,as well as the basic syntax and data
    structures of the
    PHP language'`,

   },
   {
    src:'assets/images/banner/course1.png',
    circleSrc:'assets/images/user/user1.jpg',
    courseName:'PHP Development Course',
    hours:'25 mins',
    description:`'In this course, you'll explore the basic structure of a web
    application, and
    how a web
    browser interacts with a web server,as well as the basic syntax and data
    structures of the
    PHP language'`,

   },
   {
    src:'assets/images/banner/course1.png',
    circleSrc:'assets/images/user/user1.jpg',
    courseName:'PHP Development Course',
    hours:'25 mins',
    description:`'In this course, you'll explore the basic structure of a web
    application, and
    how a web
    browser interacts with a web server,as well as the basic syntax and data
    structures of the
    PHP language'`,

   },{
    src:'assets/images/banner/course1.png',
    circleSrc:'assets/images/user/user1.jpg',
    courseName:'PHP Development Course',
    hours:'25 mins',
    description:`'In this course, you'll explore the basic structure of a web
    application, and
    how a web
    browser interacts with a web server,as well as the basic syntax and data
    structures of the
    PHP language'`,

   },
  ]
  constructor() {
    // constructor
  }
}
