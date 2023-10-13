import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { BannersService } from '../banners.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-i-banner-create',
  templateUrl: './i-banner-create.component.html',
  styleUrls: ['./i-banner-create.component.scss']
})
export class IBannerCreateComponent {
  breadscrums = [
    {
      title: 'Blank',
      items: ['Extra'],
      active: 'Blank',
    },
  ];
  public addCusForm!: FormGroup;
  image_link: any;
  uploaded: any;
  uploadedImage: any;
  status = true;
  banner_for!: string;
  bannerList: any;
  constructor(private fb: FormBuilder, public dialog: MatDialog,private bannerService :BannersService,public router:Router) {}
  public ngOnInit(): void {
    this.addCusForm = this.fb.group({
      bannerFor: ['Instructor Banner', [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')] ],
      banner :['',Validators.required]

    });
  }
  closeDialog(): void {
    this.router.navigate(['/admin/banners/instructor-banner-list'])
  }
  onSubmitClick():void {
    this.banner_for = this.addCusForm.value.bannerFor;
    if(this.addCusForm?.valid ){
       const formData = this.addCusForm.getRawValue()
       formData['imagePath']=this.image_link;
       formData['isActivated']= this.status
       this.bannerService.addBanner(formData).subscribe((response:any)=>{
        Swal.fire({
          title: 'Successful',
          text: "Banner created successfully",
          icon: 'success',
        });
        // this. closeDialog();
        this.router.navigate(['/admin/banners/instructor-banner-list'])
      },
      (err) => {
        Swal.fire(
          'Create banner failed',
          'error'
        );
      },
      () => {
      }
       );
   }
    else {
    }

  }



  FileUpload(event:any){
    const file =event.target.files[0]
    const formData = new FormData()
    formData.append('files', file)
    this.bannerService.uploadCourseThumbnail(formData).subscribe((response:any)=>{
    this.image_link = response.image_link;
    this.uploaded=this.image_link.split('/')
    this.uploadedImage = this.uploaded.pop();
    })
  }

}

