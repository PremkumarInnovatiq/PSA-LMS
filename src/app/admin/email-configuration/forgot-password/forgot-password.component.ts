import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EmailConfigService } from '@core/service/email-config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  updatePsw:FormGroup ;
  edit = true;
  _id:number | undefined;
  public Editor: any = ClassicEditor;

  assignData :any[] = [];
  breadscrums = [
    {
      title: 'Forgot Mail',
      items: ['Email Configuration'],
      active: 'Forgot Password',
    },
  ];
  constructor(private router: Router,  private emailConfigurationService: EmailConfigService,  private formBuilder: FormBuilder,
    ) {

    this.updatePsw = this.formBuilder.group({
      email_subject: ['',[Validators.required]],
      email_content: ['',[Validators.required]],
      email_template_type:[''],
      bottom_button_text: [''],
    });
  }
  
  toggle(_data: any){
    this.edit =!this.edit;
    this._id = _data._id;
    this.updatePsw.patchValue({
      email_subject: _data.email_subject,
      email_content:_data.email_content,
      email_template_type:_data.email_template_type,
      bottom_button_text: _data.bottom_button_text
    });

  }
  
  back(){
    this.edit =!this.edit;
  }
  ngOnInit(){
    this.getForgetPasswordTemplate();
  }
  

  getForgetPasswordTemplate() {
    this.emailConfigurationService.getForgetPasswordTemplate().subscribe( response =>{
      this.assignData  = response?.data?.docs[0]?.forget_password_template;

      console.log(this.assignData,"dataofEmail")
      // this.ref.detectChanges();
     
    }, error => {
      // this.isLoading = false;
    }); 
  }


 
  update() {
    return new Promise<void>((resolve, reject) => {
          const obj = this.updatePsw.value;
          obj.insertaction = 'forget_password_template';
          this.emailConfigurationService.updateForgetPasswordTemplate(obj, this._id).subscribe(
            (res) => {
              Swal.fire({
                title: 'Successful',
                text: 'Update data Succesfully',
                icon: 'success',
              });
              this.getForgetPasswordTemplate(); 
             this.back();
              resolve();
            },
            (err) => {
              Swal.fire(
                'Failed to Update',
                'error'
              );
              reject();
            },
            () => {
              reject();
            });
        });
      }
}
