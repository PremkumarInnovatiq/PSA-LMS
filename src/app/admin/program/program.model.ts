/* eslint-disable @typescript-eslint/no-explicit-any */
// import { formatDate } from '@angular/common';
export interface ProgramCourse {
	courseId: any;
	courseType: string;
}

export interface Program {
	_id: string;
	title?: string;
	shortDescription: string;
	description: string;
	status:string;
	coreCourseCount: number;
	electiveCourseCount: number;
	programCourse: ProgramCourse[];
	image_link:string;
	createdAt?: Date;
	updatedAt?: Date;
	courseCode: string;
	coreprogramCourse:string;
	electiveprogramCourse:string;
	courseFee: string;
	deliveryMode: string;
	duration: string;
	compulsaryCourse: string;
	electiveCourse: string;
}

// export class ApiResponse {
//   status!: string;
//   message: string | undefined;
//   data: any;
// docs: any;
// totalDocs: number | undefined;
// limit: number | undefined;
// page: number | undefined;
// }

// export class Programs extends ApiResponse{
//   _id: number;
//   title: string;
//   shortDescription: string;
//   description: string;
//   coreCourseCount: number;
//   electiveCourseCount: number;
//   programCourse!: ProgramCourse[];
//   createdAt?: string;
//   updatedAt?: string;
//   courseCode: string;
// 	coreprogramCourse:string;
// 	electiveprogramCourse:string;
// 	courseFee: string;
// 	deliveryMode: string;
// 	duration: string;
// 	compulsaryCourse: string;
// 	electiveCourse: string;
//   constructor(programs: Programs) {
//   super();
//   console.log("programs",programs)
//     {
//       this._id = programs._id || this.getRandomID();
//       this.title = programs.title || '';
//       this.shortDescription = programs.shortDescription || '';
//       this.description = programs.description || '';
//       // this.image_link = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
//       this.status = programs.status || '';
//       this.coreCourseCount = programs.coreCourseCount || 0;
//       this.electiveCourseCount = programs.electiveCourseCount || 0;
//       this.createdAt =  formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
//       this.updatedAt =  formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
//       this.courseCode = programs.courseCode || '';
//       this.coreprogramCourse = programs.coreprogramCourse || '';
//       this.electiveprogramCourse = programs.electiveprogramCourse || '';
//       this.courseFee = programs.courseFee || '';
//       this.deliveryMode = programs.deliveryMode || '';
//       this.duration = programs.duration || '';
//       this.compulsaryCourse = programs.compulsaryCourse || '';
//       this.electiveCourse = programs.electiveCourse || '';
//       this.data = programs.data.docs;
//     }
//   }
//   public getRandomID(): number {
//     const S4 = () => {
//       return ((1 + Math.random()) * 0x10000) | 0;
//     };
//     return S4() + S4();
//   }
// }
// export interface ProgramCourse {
// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 	courseId: any;
// 	courseType: string;
// }


