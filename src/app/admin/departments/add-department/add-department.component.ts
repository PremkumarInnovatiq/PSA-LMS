import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeptService } from '@core/service/dept.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss'],
})
export class AddDepartmentComponent {
  departmentForm: UntypedFormGroup;
  breadscrums = [
    {
      title: ' Add Department',
      items: ['Department'],
      active: 'Add',
    },
  ];
  editUrl: boolean;
  subscribeParams: any;
  departmentId: any;
  constructor(private fb: UntypedFormBuilder,private deptService: DeptService,private router:Router,
    private activatedRoute:ActivatedRoute) {
    let urlPath = this.router.url.split('/')
    this.editUrl = urlPath.includes('edit-department'); 
    if(this.editUrl===true){
      this.breadscrums = [
        {
          title:'Edit Department',
          items: ['Department'],
          active: 'Edit',
        },
      ];
    }

    this.departmentForm = this.fb.group({
      department: ['', [Validators.required]],
      hod: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      departmentStartDate: [''],
      studentCapacity: ['', [Validators.required]],
      details: [''],
    });
    this.subscribeParams = this.activatedRoute.params.subscribe((params:any) => {
      this.departmentId = params.id;
    });
    if(this.editUrl){
      this.getDepartmentById();
    }
  }
  getDepartmentById(){
    this.deptService.getDepartmentById(this.departmentId).subscribe((response:any)=>{
      let details = response;
      console.log('res',response)
      this.departmentForm.patchValue({
        department:response?.department,
        hod:response?.hod,
        mobile:response?.mobile,
        email:response?.email,
        departmentStartDate:response?.departmentStartDate,
        studentCapacity:response?.studentCapacity,
        details:response?.details
      })

    })
  }

  onSubmit() {
    if(this.editUrl){
      this.deptService.updateDepartment(this.departmentForm.value,this.departmentId).subscribe((response:any) => {
        Swal.fire({
          title: 'Successful',
          text: 'Department updated successfully',
          icon: 'success',
        });
        this.router.navigate(['/admin/departments/all-departments'])
      });
  
    } else {
      this.deptService.saveDepartment(this.departmentForm.value).subscribe((response: any) => {
        Swal.fire({
          title: 'Successful',
          text: 'Department created successfully',
          icon: 'success',
        });
        this.router.navigate(['/admin/departments/all-departments'])
      });
    }
 
  }
}
