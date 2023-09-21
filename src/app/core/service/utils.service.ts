import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() {
  }
  pageSizeArr = [10, 25, 50, 100];

  validationMessages: any = {
    'title': [
      { type: 'required', message: 'Enter Course Name' },
      { type: 'minlength', message: 'Enter minimum 2 characters' },
      { type: 'maxlength', message: 'Enter maximum 255 characters' },
    ],
    'name': [
      { type: 'required', message: 'Enter Name' },
      { type: 'minlength', message: 'Enter minimum 2 characters' },
      { type: 'maxlength', message: 'Enter maximum 255 characters' },
    ],
    'documentLink': [
      { type: 'required', message: 'Enter Document link' },
      { type: 'maxlength', message: 'Enter maximum 255 characters' },

    ],
    'bannerFor': [
      { type: 'required', message: 'Select bannerFor' },
    ],
    'imagePath': [
      { type: 'required', message: 'Please Upload Banner' }
    ],
    'courseCode': [
      { type: 'required', message: 'Enter Course Code' },
      { type: 'minlength', message: 'Enter minimum 2 characters' },
      { type: 'maxlength', message: 'Enter maximum 255 characters' },
    ],
    'programCode': [
      { type: 'required', message: 'Enter Program Code' },
      { type: 'minlength', message: 'Enter minimum 2 characters' },
      { type: 'maxlength', message: 'Enter maximum 255 characters' },
    ],
    'main_category': [
      { type: 'required', message: 'Select Main Category' },
    ],
    'sub_category': [
      { type: 'required', message: 'Select Sub Category' },
    ],
    'course_duration_in_days': [
      { type: 'required', message: 'Enter Days ' },
      { type: 'min', message: 'Enter minimum 1 Day' },
      { type: 'pattern', message: 'Enter Digits' },

    ],
    'training_hours': [
      { type: 'required', message: 'Enter Training ' },
      { type: 'min', message: 'Enter minimum 0.5' },
      { type: 'pattern', message: 'Enter Digits' },
    ],
    'fee': [
      { type: 'required', message: 'Enter Fees ' },
      { type: 'min', message: 'Enter Fees between 0-999999' },
      { type: 'max', message: 'Enter Fees between 0-999999' },
      { type: 'pattern', message: 'Enter Digits' },
    ],
    'currency_code': [
      { type: 'required', message: 'Select Currency ' },
    ],
    'skill_connect_code': [
      { type: 'required', message: 'Enter Skill Connect Code' },
      { type: 'maxlength', message: 'Enter maximum 255 characters' },
    ],
    'course_description': [
      { type: 'required', message: 'Enter Description' },
      { type: 'maxlength', message: 'Enter maximum 100 characters' },
    ],
    'course_detailed_description': [
      { type: 'required', message: 'Enter Course Detailed Description' },
      { type: 'maxlength', message: 'Enter maximum 255 characters' },
    ],
    'pdu_technical': [
      { type: 'required', message: 'Enter PDU Technical' },
      { type: 'min', message: 'Enter minimum 0' },
      { type: 'max', message: 'Enter maximum 999' },
      { type: 'pattern', message: 'Enter Digits' },
    ],
    'pdu_leadership': [
      { type: 'required', message: 'Enter PDU Leadership' },
      { type: 'min', message: 'Enter minimum 0' },
      { type: 'max', message: 'Enter maximum 999' },
      { type: 'pattern', message: 'Enter Digits' },
    ],
    'pdu_strategic': [
      { type: 'required', message: 'Enter PDU Strategic' },
      { type: 'min', message: 'Enter minimum 0' },
      { type: 'max', message: 'Enter maximum 999' },
      { type: 'pattern', message: 'Enter Digits' },
    ],
    'funding_grant': [
      { type: 'required', message: 'Select Funding/Grant' }
    ],
    'survey': [
      { type: 'required', message: 'Select Survey' }
    ],
    'course_instructor': [
      { type: 'required', message: 'Select Instructor' }
    ],
    'assign_exam': [
      { type: 'required', message: 'Select Exam' }
    ],
    'course_kit': [
      { type: 'required', message: 'Select Course Kit' }
    ],
    'category_name': [
      { type: 'required', message: 'Enter Main Category' },
      ],

    'certificates': [
      { type: 'required', message: 'Select Certificate' }
    ],
    'website_link': [
      { type: 'required', message: 'Enter Website' },
      { type: 'maxlength', message: 'Enter maximum 255 characters' },
      { type: 'pattern', message: 'Enter a valid Website' },
    ],
    'shortDescription': [
      { type: 'required', message: 'Enter Short Description' },
      { type: 'maxlength', message: 'Enter maximum 100 characters' },

    ],
    'longDescription': [
      { type: 'required', message: 'Enter Long Description' },
      { type: 'maxlength', message: 'Enter maximum 255 characters' },
    ],
    'courseId': [
      {type: 'required', message: 'Enter Course Name'},
    ],
    'classDeliveryType': [
      {type: 'required', message: 'Enter Class Delivery Type'}
    ],
    'instructorCost': [
      {type: 'required', message: 'Enter Instructor Cost'}
    ],
    'minimumEnrollment': [
      {type: 'required', message: 'Enter Minimum Enrollment'}
    ],
    'maximumEnrollment': [
      {type: 'required', message: 'Enter Maximum Enrollment'}
    ],
    'sections': [
      { type: 'required', message: 'Select section under which video needs to display' },
    ],
    'typeName': [
      {type: 'required', message: 'Enter User Type'}
    ],
    'qualification': [
      {type: 'required', message: 'Enter Qualification'}
    ],
    'country': [
      {type: 'required', message: 'Enter Country'},
      {type: 'minlength', message: 'Enter minimum 2 characters'}

    ],
    'text': [
      {type: 'required', message: 'Enter Review'},
      {type: 'maxlength', message: 'Enter maximum 150 characters'}

    ],
    'position': [
      {type: 'required', message: 'Enter Position'}
    ],

    'email':[
      {type:'required', message: 'Email is required'},
      {type:'pattern', message: 'Enter a Valid email'}
    ],
    'password':[
      {type:'required', message: 'Enter Valid Password'}
    ],
    'type':[
      {type: 'required', message: 'Select User Type'}
    ],
    'courseName':[
      {type: 'required', message: 'Select Course Name'}
    ],
    'subject':[
      {type:'required',message:'Enter Title'}
    ],
    'details':[
      {type:'required', message:'Enter Description'}
    ],
    'shortdescription':[
      {type:'required', message:'Enter Description'}
    ],
    'description':[
      {type:'required',message:'Enter Description'}
    ],
    'electiveCourseCount':[
      {type: 'required',message:'Enter Elective Count'}
    ],
    'coreCourseCount':[
      {type: 'required',message:'Enter Compulsary Count'},
      {type:'required',message:'Enter Course Count'}
    ],
    'deliveryMode':[ 
    {type: 'required',message:'Select Mode'}
    ],
    'course':[
      {type: 'required',message:'Enter Program Name'}
    ],
    'program_name':[
      {type: 'required', message:'Enter Program Name'}
    ],
    'document_Link':[
      {type: 'required', message:'Enter Document Link'}
    ],
  };


  validators: any = {
    title: [ Validators.required,Validators.minLength(2), Validators.maxLength(255)],
    bannerFor: [Validators.required],
    imagePath: [Validators.required],
    sections: [ Validators.required],
    email: [Validators.pattern(/^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/),
    (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return {
          required: true
        }
      }
      else {
        return null;
      }
    }],
    name: [Validators.required, Validators.minLength(2), Validators.maxLength(150)],
    documentLink: [Validators.required, Validators.minLength(2), Validators.maxLength(255)],
    course_duration_in_days: [ Validators.min(1), Validators.pattern(/^\d+(\.\d+)?$/)],
    training_hours: [  Validators.min(0.5), Validators.pattern(/^\d+(\.\d+)?$/)],
    fee: [ Validators.min(0), Validators.max(99999999), Validators.pattern(/^\d+(\.\d+)?$/)],
    course: [Validators.maxLength(20)],
    longDescription: [ Validators.maxLength(255)],
    descripton: [ Validators.maxLength(100)],
    website: [ Validators.maxLength(255), Validators.pattern(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/)],
    pdu: [ Validators.min(0), Validators.max(999), Validators.pattern(/^\d+(\.\d+)?$/)],
    category_name:[Validators.minLength(2),Validators.maxLength(255)],
    onlyAlphabets: [Validators.pattern(/^[a-zA-Z\s]+$/)],
    noLeadingSpace: [Validators.pattern(/^\S/), (control: AbstractControl) => {
      if (Array.isArray(control.value)) {
        if (control && control.value && !control.value[0]?.trim().length) {
          control.setValue('');
        }
      }
      else {
        if (control && control.value && !control.value?.trim().length) {
          control.setValue('');
        }
      }
      return null;
    }],
  };
  getErrorMessage(userForm: FormGroup, key: string) {
    let err = this.validationMessages[key].find((val: any) => {
      return userForm?.get(key)?.hasError(val.type);
    });
    return err;
  }
}
