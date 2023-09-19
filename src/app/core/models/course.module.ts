import { Pagination } from "./pagination.module";

export interface CourseKit {
	_id: string;
	name: string;
	docs: CourseKit[];
	shortDescription: string;
	longDescription: string;
	videoLink:string[];
	documentLink: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
	id: string;
}

export interface CourseModel {
  category_name: string ;
	status: string;
	slug: string;
	_id: string;
	title: string;
	courseCode: string;
	course_duration_in_days: number;
	training_hours: number;
	skill_connect_code: string;
	fee: number;
	currency_code: number;
	main_category: string;
	//   main_category_id: string;
	sub_category: string;
	mainCategory:string;
	main_category_text: string|undefined;
	sub_category_text: string|undefined;
	pdu_technical: number;
	pdu_leadership: number;
	pdu_strategic: number;
	website_link: string;
	image_link: string;
	funding_grant: string;
	survey: string;
	course_kit: CourseKit;
	certificates: number;
	course_description: string;
	course_detailed_description: string;
	banner_image_link: string;
	course_instructor: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
	id: string;
}
export interface CoursePaginationModel extends Pagination {
	docs: CourseModel[];
	main_category: string|undefined;
	sub_category: string|undefined;
	filterText: string;
	sortBy: string;
	sortByDirection: string;
	status: string;
}

