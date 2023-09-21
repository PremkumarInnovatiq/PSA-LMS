import { Pagination } from './pagination.model';


export interface CertificateBuilderModel {

	_id: string;
	title: string;
	name: string;
	course: string;
	passStatus: string;
	image: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
	id: string;
}

export interface CertificateBuilderQuestionsModel {
	_id: string;
	choices: [string];
	createdAt: string;
	updatedAt: string;
	__v: number;
	id: string;
}


// export interface CertificateBuilderEditModel {
// 	status: string;
// 	slug: string;
// 	_id: string;
// 	title: string;
// 	courseCode: string;
// 	course_duration_in_days: number;
// 	training_hours: number;
// 	skill_connect_code: string;
// 	fee: number;
// 	currency_code: number;
// 	main_category: MainCategory;
// 	sub_category: SubCategory;
// 	main_category_text: string;
// 	sub_category_text: string;
// 	pdu_technical: number;
// 	pdu_leadership: number;
// 	pdu_strategic: number;
// 	website_link: string;
// 	image_link: string;
// 	funding_grant: FundingGrant;
// 	Certificate: Certificate;
// 	certificates: number;
// 	course_description: string;
// 	course_kit: CourseKit;
// 	banner_image_link: string;
// 	createdAt: string;
// 	updatedAt: string;
// 	course_instructor: Instructor;
// 	__v: number;
// 	id: string;
// }

export interface CertificateBuilderPaginationModel extends Pagination {
	docs: CertificateBuilderModel[];
	filterText: string;
	sortBy: string;
	sortByDirection: string;
}



// export interface Certificate {
// 	_id: string;
// 	name: string;
// 	createdAt: string;
// 	updatedAt: string;
// 	__v: number;
// 	id: string;
// }


