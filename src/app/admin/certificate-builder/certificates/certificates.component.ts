import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '@core/service/utils.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent {

  breadscrums = [
    {
      title: 'Certificates',
      items: ['Certificate Builder'],
      active: 'Certificates',
    },
  ];
  displayedColumns: string[] = [
    'select',
    'Course Name',
    'Course Code',
    'Main Category',
    'Sub Category',
    'Fees',
    'status'
  ];

  pageSizeArr = this.utils.pageSizeArr;
  totalItems: any;


  imageData = [
    {  imageUrl: "/assets/certificates/Certificate 1.svg"},
    {  imageUrl: "/assets/certificates/Certificate 2.svg"},
    {  imageUrl: "/assets/certificates/Certificate 3.svg"},
    
  ];

  previewImage = false;
  showMask = false;
  showCount = true;
  currentlightBoxImage = this.imageData[0];
  currentIndex = 0;
  controls = true;
  totalImgCount = 0;
  selectedImage = [false, false];

  constructor(private router: Router, public utils: UtilsService) {}

  ngOnInit(): void {
    this.totalImgCount = this.imageData.length;
  }

  onPreview(index: number): void {
    console.log(index)
    this.selectedImage[index] = ! this.selectedImage[index];
    this.currentIndex = index;
    this.currentlightBoxImage = this.imageData[index];
  
  }
  upload() {
      document.getElementById('input')?.click();
  
    }
  close(){
    this.showMask = false;
    this.selectedImage = [false];

  }

  openPreview(){
    this.showMask = true;
    this.previewImage = true;
  }

}

