import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { BannersService } from '../banners.service';
import { Router } from '@angular/router';
import { SimpleDialogComponent } from 'app/ui/modal/simpleDialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-s-banner-create-list',
  templateUrl: './s-banner-create-list.component.html',
  styleUrls: ['./s-banner-create-list.component.scss']
})
export class SBannerCreateListComponent {
  simpleDialog?: MatDialogRef<SimpleDialogComponent>;
  breadscrums = [
    {
      title: 'Create Banner',
      items: ['Banners'],
      active: 'Student Banner',
    },
  ];
  instructorBanner : FormGroup
  bannerList: any;
  bannerFor: string;
  constructor(private bannerService :BannersService,private fb: FormBuilder, private router: Router,) {
    // constructor
    this.instructorBanner= this.fb.group({
      bannerFor: new FormControl('', [Validators.required,]),
      //'isActivated': ['true',Validators.required],
      imagePath: new FormControl('', [Validators.required,]),


    })
    this.bannerFor = "Student Banner";
  }

  ngOnInit(){
    this.getBanner(this.bannerFor);
  }
  getBanner(bannerFor: string) {
    this.bannerService.getBanners(bannerFor).subscribe(
      (response) => {
        this.bannerList = response;
      },
      (err) => {

      },
    );
  }

  addBanner(){
    this.router.navigate(['/admin/banners/create-student-banner'])
  }

  onChange(id: any, activeStatus: any){
    console.log("=======",id+"sssssss",activeStatus)

    this.bannerService.editBanner(id, activeStatus).subscribe(
      (response) => {
        Swal.fire({
          title: 'Successful',
          text: 'Update succesfully',
          icon: 'success',
        });
        this.getBanner(this.bannerFor)
      },
      (err) => {
        return err;
      },
    );
  }

  removeBannerImage(id:any){
    let obj = {id:id};
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this banner!',
      icon: 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed){
        this.bannerService.removeBannerImage(obj).subscribe(response => {
          console.log(response);
          if (response){
            Swal.fire(
              'Deleted!',
              'Banner remove successfully.',
              'success'
            );

          }
          this.getBanner(this.bannerFor)
        });
      }
    });
}

}
