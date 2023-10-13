import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CourseTitleModel } from '@core/models/class.model';
import { AnnouncementService } from '@core/service/announcement.service';
import { UtilsService } from '@core/service/utils.service';
import { ClassService } from 'app/admin/schedule-class/class.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-creat-announcement',
  templateUrl: './creat-announcement.component.html',
  styleUrls: ['./creat-announcement.component.scss']
})
export class CreatAnnouncementComponent {
  breadscrums = [
    {
      title: 'Create Announcement',
      items: ['Announcement'],
      active: 'Create Announcement',
    },
  ];
  create = true;
  status = true;
  isChecked = false;
  instructors = false;
  id: any;
  editUrl: any;
  inProgress = false;
  announcementForm: FormGroup
  courseList!: CourseTitleModel[];
  isLoading = false;
  announcementData: any[] = [];
  currentId: string;
  collegeReviewList: any;
  announcementList: any;
  isSubmitted = false;
  error: any;
  res: any;
  isEditable = false;
  public Editor: any = ClassicEditor;



  toggleStatus() {
    this.status = !this.status;
  }
  ngOnInit() {
    forkJoin({
      courses: this.classService.getAllCoursesTitle('active'),

    }).subscribe((response: { courses: CourseTitleModel[]; }) => {
      this.courseList = response.courses;
      ////this.instructorList = response.instructors;
      //this.labList = response.labs;
      //this.cd.detectChanges();
    });

  }

  back() {
    this.create = true;
  }
  test(event: any) {
  }


  constructor(private router: Router, public classService: ClassService, public utils: UtilsService, private formBuilder: FormBuilder,
    private announcementService: AnnouncementService,) {
    let urlPath = this.router.url.split('/')
    this.editUrl = urlPath.includes('edit-announcement');
    this.currentId = urlPath[urlPath.length - 1];

    if (this.editUrl === true) {
      this.breadscrums = [
        {
          title: 'Edit Announcement',
          items: ['Announcement'],
          active: 'Edit Announcement',
        },
      ];
    }

    if (this.editUrl) {
      this.getAnnouncementList()
    }

    this.announcementForm = this.formBuilder.group({
      subject: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]/)]),
      details: new FormControl('', [Validators.required, ...this.utils.validators.noLeadingSpace]),
      'forStudents': [true],
      'forTrianers': [true],
      'isActive': [true],
    });
  }
  student1(event: any) {

  }

  saveAnnouncement() {
    this.inProgress = true;
    if (!this.editUrl) {
      if (this.announcementForm.valid) {
        const formData = this.announcementForm.getRawValue()
        formData['forStudents'] = this.isChecked;
        formData['forTrianers'] = this.instructors
        let payload = {
          subject: formData?.subject,
          details: formData?.details.replace(/<\/?span[^>]*>/g, ""),
          forStudents: formData?.forStudents,
          forTrianers: formData?.forTrianers,
          isActive: formData?.isActive,
        }
        this.announcementService.makeAnnouncement(payload).subscribe(
          (res) => {
            Swal.fire({
              title: 'Successful',
              text: "Announcement Created Successfully",
              icon: 'success',
            });
            this.router.navigateByUrl('/admin/announcement/list')
            // this.router.navigateByUrl(['/admin/announcement/list'])
          },
          (err) => {
            Swal.fire(
              'Create Announcement failed',
              'error'
            );
          },
          () => {
          }
        );
      }
      else {
        this.isSubmitted = true;
      }
    } else {
      if (this.announcementForm.valid) {
        this.announcementService.updateAnnouncement(this.announcementForm.value, this.currentId).subscribe(
          (res) => {
            Swal.fire({
              title: 'Successful',
              text: 'Updated Announcement Successfully',
              icon: 'success',
            });
            this.router.navigateByUrl('/admin/announcement/list')

          },
          (err) => {
            Swal.fire(
              'Failed to Update',
              'error'
            );
          },
          () => {
          }
        );
      }
      else {
        this.isSubmitted = true;
      }
    }


  }
  student(event: any) {
    this.isChecked = event.target.checked
  }
  instructor(event: any) {
    this.instructors = event.target.checked
  }


  getAnnouncementList(filter?: any) {
    this.isLoading = true;
    this.announcementService.getAnnouncementList(filter).subscribe(response => {
      this.isLoading = false;
      this.announcementList = response.data.data;
      let data = this.announcementList.find((id: any) => id._id === this.currentId);
      if (data) {
        this.announcementForm.patchValue({
          subject: data?.subject,
          details: data?.details,
          forStudents: data?.forStudents,
          forTrianers: data?.forTrianers,
        });
      }
    }, error => {
      this.isLoading = false;

    });
  }
}
