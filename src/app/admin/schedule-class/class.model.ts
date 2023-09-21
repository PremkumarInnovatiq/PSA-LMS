/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { CourseModel } from "@core/models/course.model";
import { Pagination } from "@core/models/pagination.model";


export interface SessionClassModel {
  _id: string;
  sessionNumber: string;
  sessionStartDate: string;
  sessionEndDate: string;
  sessionStartTime: string;
  sessionEndTime: string;
  instructorId: string;
  students: StudentRegisteredClass[];
}
export interface ClassModel {
  name: string | number;
  status: String;
  _id: String;
  courseId: any;
  courseName: String;
  classAccessType: String;
  classDeliveryType: String;
  instructorCost: String;
  instructorCostCurrency: String;
  isGuaranteedToRun : boolean;
  externalRoom:boolean;
  minimumEnrollment: String;
  maximumEnrollment: String;
  classStartDate: String;
  classEndDate: String;
  sessions: SessionClassModel[];
}

export interface StudentId {
	_id: string;
	name: string;
	last_name: string;
	email: string;
	id: string;
}

export interface StudentRegisteredClass {
	status: string;
	_id: string;
	studentId: StudentId;
	classId: string;
	courseId: string;
	registeredOn: string;
	session: any[];
	createdAt: string;
	updatedAt: string;
	__v: number;
	id: string;
}


export interface StudentPaginationModel extends Pagination {
  docs: Student[];
  filterText: string;
}


export interface Student extends Pagination {
  __v: number;
  _id: string;
  classId: ClassModel;
  courseId: CourseModel;
  createdAt: string;
  id: string;
  registeredOn: string;
  session: any[];
  status: string;
  studentId: StudentId;
  updatedAt: string;
  classStartDate: string;
  classEndDate: string;
}

export interface Session {
  sessionNumber: number;
  sessionStatus:string;
}

export interface StudentApproval {
  studentId: string;
  classId: String;
  status: string;
  approvedOn: string;
  approvedBy: string;
  session: Session[];
}


export interface Session {
  _id: string;
  instructorId: string;
  laboratoryId: string;
  sessionEndDate: string;
  sessionEndTime: string;
  sessionNumber: number;
  sessionStartDate: string;
  sessionStartTime: string;
}
