import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramKit } from '@core/models/course.model';
import { CertificateService } from '@core/service/certificate.service';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';
import { ClassService } from 'app/admin/schedule-class/class.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.scss']
})
export class CreateProgramComponent {
  breadscrums = [
    {
      title: 'Create Program',
      items: ['Program'],
      active: 'Create Program',
    },
  ];

  files: any[] = [];

  coreProgramCards: { coreProgramName: string; coreProgramCode: string }[] = [{ coreProgramName: '', coreProgramCode: '' }];
  electiveProgramCards: { electiveProgramName: string; electiveProgramCode: string }[] = [{ electiveProgramName: '', electiveProgramCode: '' }];

  programFormGroup: FormGroup;
  editPermission: any;
  isSubmitted = false;
  image_link: any;
  uploadedImage: any;
  uploaded: any;
  programList: any;
  subscribeParams: any;
  courseId!: string;
  course: any;
  programKits!: ProgramKit[];
  isEditable = false;
  public Editor: any = ClassicEditor;


  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    public utils: UtilsService,
    private courseService: CourseService,
    private certificateService: CertificateService,
    private router: Router,
    private classService: ClassService,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef) {
    let urlPath = this.router.url.split('/')
    this.editPermission = urlPath.includes('edit-program');
    this.subscribeParams = this.activatedRoute.params.subscribe((params: any) => {
      this.courseId = params.id;

    });
    this.programFormGroup = this.fb.group({
      deliveryMode: ["", []],
      electiveCourseCount: ["", []],
      course: ["", [Validators.required]],
      sessionStartDate: ["", []],
      sessionStartTime: ["", []],
      duration: ["", []],
      courseFee: ["", []],
      learningOutcomes: ["", []],
      attendees: ["", []],
      prerequisites: ["", []],
      sessionEndDate: ["", []],
      sessionEndTime: ["", []],
      programCode: ["", [Validators.required]],
      coreCourseCount: ["", []],
      image_link: ["", []],
      programKit: ["", []],
      currency: ["", []],
      corePrograms: this.fb.array([]),
      electivePrograms: this.fb.array([])

    });
    if (this.editPermission === true) {
      this.breadscrums = [
        {
          title: 'Edit Program',
          items: ['Program'],
          active: 'Edit Program',
        },
      ];
    }

  }
  get corePrograms(): FormArray {
    return this.programFormGroup.get('corePrograms') as FormArray;
  }


  ngOnInit() {
    this.getProgramKits();
    if (this.editPermission) {
      this.getData()
    }
    this.addCoreCard();
    this.addElectiveCard();
    this.getProgramList();
  }
  addCoreCard(): void {
    this.corePrograms.push(
      this.fb.group({
        coreProgramName: ["", []],
        coreProgramCode: ["", []],
        coreProgramDescription: ["", []],
      })
    );
  }

  addElectiveCard(): void {
    this.electivePrograms.push(
      this.fb.group({
        electiveProgramName: ["", []],
        electiveProgramCode: ["", []],
        electiveProgramDescription: ["", []],
      })
    );
  }
  get electivePrograms(): FormArray {
    return this.programFormGroup.get('electivePrograms') as FormArray;
  }



  deleteCoreCard(index: number) {
    this.coreProgramCards.splice(index, 1);
  }

  deleteElectiveCard(index: number) {
    this.electiveProgramCards.splice(index, 1);
  }




  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
  }

  fileBrowseHandler(event: any) {
    const files = event.target.files;
    this.onFileDropped(files);
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('files', file);

    this.certificateService.uploadCourseThumbnail(formData).subscribe((response: any) => {
      this.image_link = response.image_link;
      this.uploaded = this.image_link.split('/')
      this.uploadedImage = this.uploaded.pop();
    });
  }

  save() {
    if (this.programFormGroup.valid) {
      if (this.editPermission) {
        let payload = {
          title: this.programFormGroup.value.course,
          courseCode: this.programFormGroup.value.programCode,
          deliveryMode: this.programFormGroup.value.deliveryMode,
          coreCourseCount: this.programFormGroup.value.coreCourseCount,
          electiveCourseCount: this.programFormGroup.value.electiveCourseCount,
          sessionStartDate: this.programFormGroup.value.sessionStartDate == "Invalid date" ? null : this.programFormGroup.value.sessionStartDate,
          sessionEndDate: this.programFormGroup.value.sessionEndDate == "Invalid date" ? null : this.programFormGroup.value.sessionEndDate,
          sessionStartTime: this.programFormGroup.value.sessionStartTime,
          sessionEndTime: this.programFormGroup.value.sessionEndTime,
          duration: this.programFormGroup.value.duration,
          courseFee: this.programFormGroup.value.courseFee,
          currency: this.programFormGroup.value.currency,
          learningOutcomes: this.programFormGroup.value.learningOutcomes,
          attendees: this.programFormGroup.value.attendees,
          prerequisites: this.programFormGroup.value.prerequisites,
          coreprogramCourse: this.corePrograms.value,
          electiveprogramCourse: this.electivePrograms.value,
          image_link: this.image_link,
          id: this.courseId,
          programKit: this.programFormGroup.value.programKit ? this.programFormGroup.value.programKit : null
        }
        this.courseService.updateCourseProgram(this.courseId, payload).subscribe(
          (_res: any) => {
            Swal.fire({
              title: 'Successful',
              text: 'Program updated succesfully',
              icon: 'success',
            });
            this.router.navigate(['/admin/program/program-list'])
          },
          (err: any) => {
            Swal.fire(
              'Failed to update Program',
              'error'
            );
          }
        );
      }
      else {
        let payload = {
          title: this.programFormGroup.value.course,
          courseCode: this.programFormGroup.value.programCode,
          deliveryMode: this.programFormGroup.value.deliveryMode,
          coreCourseCount: this.programFormGroup.value.coreCourseCount,
          electiveCourseCount: this.programFormGroup.value.electiveCourseCount,
          sessionStartDate: this.programFormGroup.value.sessionStartDate ? this.programFormGroup.value.sessionStartDate : null,
          sessionEndDate: this.programFormGroup.value.sessionEndDate ? this.programFormGroup.value.sessionEndDate : null,
          sessionStartTime: this.programFormGroup.value.sessionStartTime,
          sessionEndTime: this.programFormGroup.value.sessionEndTime,
          duration: this.programFormGroup.value.duration,
          courseFee: this.programFormGroup.value.courseFee,
          currency: this.programFormGroup.value.currency,
          learningOutcomes: this.programFormGroup.value.learningOutcomes,
          attendees: this.programFormGroup.value.attendees,
          prerequisites: this.programFormGroup.value.prerequisites,
          coreprogramCourse: this.corePrograms.value,
          electiveprogramCourse: this.electivePrograms.value,
          image_link: this.image_link,
          id: this.courseId,
          programKit: this.programFormGroup.value.programKit ? this.programFormGroup.value.programKit : null
        }
        this.courseService.createCourseProgram(payload).subscribe(
          (res: any) => {
            Swal.fire({
              title: 'Successful',
              text: 'Program created succesfully',
              icon: 'success',
            });
            this.router.navigate(['/admin/program/program-approve-list'])
          },
          (err: any) => {
            Swal.fire(
              'Failed to create Program',
              'error'
            );
          }
        );
      }
    }
    else {
      this.isSubmitted = true;
    }
  }
  getProgramList(filters?: any) {
    this.classService.getAllCoursesTitle('active').subscribe(
      (response: any) => {
        this.programList = response;
      },
      (error) => {
      }
    );
  }
  getProgramKits() {
    this.courseService.getProgramCourseKit().subscribe(
      (response: any) => {
        this.programKits = response.docs;
      },
      (error: any) => {
      }
    );
  }
  getData() {
    this.courseService.getProgramById(this.courseId).subscribe((response: any) => {
      this.course = response.data;
      this.image_link = this.course.image_link;
      this.uploaded = this.image_link?.split('/')
      this.uploadedImage = this.uploaded?.pop();
      this.programFormGroup.patchValue({
        course: this.course?.title,
        programCode: this.course?.courseCode,
        deliveryMode: this.course?.deliveryMode,
        coreCourseCount: this.course?.coreCourseCount,
        electiveCourseCount: this.course?.electiveCourseCount,
        sessionStartDate: `${moment(this.course?.sessionStartDate).format("YYYY-MM-DD")}`,
        sessionEndDate: `${moment(this.course?.sessionEndDate).format("YYYY-MM-DD")}`,
        sessionStartTime: this.course?.sessionStartTime,
        sessionEndTime: this.course?.sessionEndTime,
        duration: this.course?.duration,
        courseFee: this.course?.courseFee,
        currency: this.course?.currency,
        learningOutcomes: this.course?.learningOutcomes,
        attendees: this.course?.attendees,
        prerequisites: this.course?.prerequisites,
        electiveprogramCourse: this.course?.electiveprogramCourse,
        programKit: this.course?.programKit?.[0]?.id,
      });

      const itemControls = response.data.coreprogramCourse.map((item: {
        _id: any; coreProgramName: any; coreProgramDescription: any;
      }) => {
        return this.fb.group({
          coreProgramName: [item?.coreProgramName],
          coreProgramDescription: [item?.coreProgramDescription],
        });
      });
      if (itemControls) {
        this.programFormGroup.setControl('corePrograms', this.fb.array(itemControls));
      }
      const electiveControls = response.data.electiveprogramCourse.map((item: {
        _id: any; electiveProgramName: any; electiveProgramDescription: any;
      }) => {
        return this.fb.group({
          electiveProgramName: [item?.electiveProgramName],
          electiveProgramDescription: [item?.electiveProgramDescription],
        });
      });
      if (electiveControls) {
        this.programFormGroup.setControl('electivePrograms', this.fb.array(electiveControls));
      }

      this.cd.detectChanges();
    });

  }
}
