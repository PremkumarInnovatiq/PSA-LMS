import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CertificateService } from '@core/service/certificate.service';
import { UtilsService } from '@core/service/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent {

  breadscrums = [
    {
      title: 'Design',
      items: ['Certificate Builder'],
      active: 'Design',
    },
  ];

  next = true;
  totalImgCount = 0;
  selectedImage = [false, false];
  previewImage = false;
  showMask = false;
  showCount = true;
  images: any=[];
  currentlightBoxImage = this.images[0];
  currentIndex = 0;
  isPreview = false;
  certificateForm!:FormGroup
    selectedFile: File | null = null;
    uploadedFile = '';
  
    cards = [
      { title: 'Drag & Drop Template, or',label: 'Browse', imageUrl: '/assets/upload.svg' },
      
    ];
  
    card = [
      { imageUrl: 'assets/Certificate 1.svg' },
      { imageUrl: 'assets/Certificate 2.svg' },
      { imageUrl: 'assets/Certificate 3.svg' },
      { imageUrl: 'assets/Certificate 4.svg' },
      { imageUrl: 'assets/Certificate 5.svg' },
      { imageUrl: 'assets/Certificate 6.svg' },
      { imageUrl: 'assets/Certificate 7.svg' },
      { imageUrl: 'assets/Certificate 8.svg' },
      
    ];
    onPreview(id: number): void {
      const index = this.images.findIndex((image:any) => image.id === id);
        if (index !== -1) {
        this.currentIndex = index;
        this.currentlightBoxImage = this.images[index];
      } else {
        console.log(`Image with id ${id} not found in the images array.`);
      }
    }
    
    close(){
      this.showMask = false;
      this.selectedImage = [false];
      this.isPreview = false;
    }
  
    openPreview(){
      this.showMask = true;
      this.previewImage = true;
      
      this.isPreview = true;
    }
  
  toggle(){
    this.next = !this.next;
  }
  
  cancel(){
    this.next = true;
  }
  upload() {
    document.getElementById('input')?.click();
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event?.target?.files?.[0];
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('files', this.selectedFile);
      this.certificateService.uploadImage(formData).subscribe((response) => {
        console.log(response);
        Swal.fire('Successful', 'certificate design created succesfully', 'success')
        this.getCertificateDesigns();
        this.uploadedFile = response;
        this.certificateForm.patchValue({
          image: response,
        });
      });
    } else {
      console.error("No file selected");
    }
  }
  
  
  constructor(private fb:FormBuilder,public utils:UtilsService,private certificateService:CertificateService,
    private router: Router){
    this.certificateForm = this.fb.group({
      organizationName: ['',[ Validators.required,...this.utils.validators.noLeadingSpace]],
      firstName: ['', [Validators.required,...this.utils.validators.noLeadingSpace]],
      lastName: ['', [Validators.required,...this.utils.validators.noLeadingSpace]],
      title: ['',[ Validators.required,...this.utils.validators.noLeadingSpace]],
      courseCode: ['', [Validators.required,...this.utils.validators.noLeadingSpace]],
      issuedDate: ['', [Validators.required,...this.utils.validators.noLeadingSpace]],
      signature: ['', [Validators.required,...this.utils.validators.noLeadingSpace]]
  
    });
  
  }
  ngOnInit(){
    this.getCertificateDesigns()
  
  }
  create(){
    this.certificateService.addcertificateBuilder(this.certificateForm.value).subscribe(response => {
      Swal.fire('Successful', 'certificate created succesfully', 'success').then(r => {
        this.router.navigateByUrl('/admin/certificate/certificates');
      });
    }, (err) => {
      console.log(err);
    });
  
  }
  getCertificateDesigns(): void {
    this.certificateService.getcertificateDesigns().subscribe(
      (response:any) => {
        this.images=response.data.docs;
  },
      (error) => {
        console.error('Failed to fetch categories:', error);
      }
    );
  }
}
