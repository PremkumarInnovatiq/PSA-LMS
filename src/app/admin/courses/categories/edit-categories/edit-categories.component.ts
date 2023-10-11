import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategory } from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
export class EditCategoriesComponent {
  categoryId: any;   
  subscribeParams: any;
  mainCategoryForm!: FormGroup;
  subcategoryId: string = '';
  mainCategoryId: string = '';
  subCategoryForm!:FormGroup;
  isSubmitted: boolean | undefined;
  subCategoryData :SubCategory[]=[];
  fb: any;
  validations: boolean | undefined;
  //mainCategoryForm: any;

  breadscrums = [
    {
      title: 'Edit Categories',
      items: ['Course'],
      active: 'Edit Categories',
    },
  ];

  constructor(private router: Router,
    
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public utils: UtilsService,
    private courseService: CourseService,
  ) {
    

    
    this.subscribeParams = this.activatedRoute.params.subscribe((params:any) => {
      this.categoryId = params.id;
      //console.log("=Id===",params.id)
    });

}
get subcategories(): FormArray {
  return this.subCategoryForm.get('subcategories') as FormArray;
}
ngOnInit(): void {
  //this.setup()
this.getData();
this.initMainCategoryForm();
  this.initSubCategoryForm();
    this.addSubCategoryField();
}

addSubCategoryField(): void {
  this.subcategories.push(
    this.formBuilder.group({
      category_name: ['', Validators.required]
    })
  );
}
initMainCategoryForm(): void {
  this.mainCategoryForm = this.formBuilder.group({
    category_name: new FormControl('', [Validators.required,...this.utils.validators.category_name,...this.utils.validators.noLeadingSpace]),
    
  });
}
initSubCategoryForm(): void {
  this.subCategoryForm = this.formBuilder.group({
    sub_id:[''],
    main_category_id: [''],
    subcategories: this.formBuilder.array([])
  });
}
getData(){
  console.log("=======test")
  
  
  this.courseService.getcategoryById(this.categoryId).subscribe((response: any) => {
    if(response){
      this.mainCategoryId=response?._id
      this.mainCategoryForm.patchValue({
        category_name: response?.category_name,
            });
    console.log("sssssssssssssss",response?.subCategories[0]._id)
      
      const itemControls = response?.subCategories.map((item: {
        _id: any; main_category_id: any; category_name: any; 
} ) => {
  console.log("=====item====",item)
  
        this.subcategoryId =item._id
        return this.formBuilder.group({
         sub_id:[item._id],
          main_category_id: [item.main_category_id],
          category_name: [item.category_name],
        });
      });
     // console.log("itemControls",itemControls)
      this.subCategoryForm = this.formBuilder.group({
        subcategories: this.formBuilder.array(itemControls),
      });
      

    }
   
    
    
    
  });


}
createSubCategory(): void {
  console.log("=====ts===")
  this.isSubmitted=true
  if (this.subCategoryForm.invalid) {
    this.validations=true
    return;
  }

  this.subCategoryData = this.subcategories.value;
  let data ={
    main_category_id:this.subCategoryData[0].main_category_id,
    category_name: this.subCategoryData[0].category_name

  }
  this.subCategoryData.forEach(subcategory => {
    subcategory.main_category_id = this.mainCategoryId;


  });

//console.log("===lllllllllllll===",this.subcategoryId)
//console.log("===this.subCategoryData===",this.subCategoryData)
  this.courseService.updateSubCategory(this.subcategoryId,this.subCategoryData).subscribe(
    (response) => {
      Swal.fire('Success', 'Subcategories created successfully!', 'success');
      this.mainCategoryForm.reset();
      this.subCategoryForm.reset();
      this.initSubCategoryForm();
      this.addSubCategoryField();
      this.router.navigateByUrl("/admin/courses/categories")  
        //this.list = !this.list;
        //this.create = !this.create;
      // this.list = !this.list;
      //this.fetchSubCategories();
    },
    (error) => {
      Swal.fire('Error', 'Failed to create subcategories!', 'error');
    }
  );
  this.isSubmitted=false

}
createMainCategory(): void {
  this.isSubmitted=true
  if (this.mainCategoryForm.invalid) {
    return;
  }

  const mainCategoryData = this.mainCategoryForm.value;
  this.courseService.updateMainCategory(this.mainCategoryId,mainCategoryData).subscribe(
    (response) => {
      Swal.fire('Success', 'Main category created successfully!', 'success');
      //this.mainCategoryId = response.data._id;
    },
    (error) => {
      Swal.fire('Error', 'Failed to create main category!', 'error');
    }
  );
  this.isSubmitted=false
}


}
