import { Component } from '@angular/core';
import { BannersService } from '../banners.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-i-banner-list',
  templateUrl: './i-banner-list.component.html',
  styleUrls: ['./i-banner-list.component.scss']
})
export class IBannerListComponent {
  breadscrums = [
    {
      title: 'Blank',
      items: ['Banners'],
      active: 'Instructor Banner',
    },
  ];
  instructorBanner : FormGroup
  bannerList: any;
  bannerFor: string;
  constructor(private bannerService :BannersService,private fb: FormBuilder) {
    // constructor
    this.instructorBanner= this.fb.group({
      bannerFor: new FormControl('', [Validators.required,]),
      //'isActivated': ['true',Validators.required],
      imagePath: new FormControl('', [Validators.required,]),


    })
    this.bannerFor = "Instructor Banner";
  }

  ngOnInit(){
    this.getBanner(this.bannerFor)

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
}
