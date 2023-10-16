import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { StaffService } from '../all-staff/staff.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss'],
})
export class AddStaffComponent {
  staffForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Staff',
      items: ['Staff'],
      active: 'Add Staff',
    },
  ];
  constructor(private fb: UntypedFormBuilder, public staffService:StaffService) {
    this.staffForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last_name: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
      conformPassword: ['', [Validators.required]],
      designation: [''],
      department: [''],
      address: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      dob: ['', [Validators.required]],
      education: [''],
    });
  }
  onSubmit() {
    console.log('Form Value', this.staffForm.value);

    this.staffService.saveStaff(this.staffForm.value).subscribe((response: any) => {
      console.log("res",response);
      Swal.fire({
        title: 'Successful',
        text: 'Department created successfully',
        icon: 'success',
      });
      // this.router.navigate(['/admin/departments/all-departments'])
    });
  }
}
