import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursePaginationModel, SubCategory } from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss']
})
export class CreateCategoriesComponent implements OnInit{

  listCat: any;
  subCategoryForm!: FormGroup;
  mainCategoryForm!: FormGroup;
  mainCategoryId: string = '';
  isSubmitted=false;
  validations=false;
  subCategoryData :SubCategory[]=[];
  coursePaginationModel!: Partial<CoursePaginationModel>;
  totalItems: any;
  pageSizeArr =this.utils.pageSizeArr;
  list :boolean = true;
  create :boolean = true;
  dataSource: any;
  editUrl: any;
  subcategoryId: string = '';
  subscribeParams: any;
  categoryId: any;   

  breadscrums = [
    {
      title: 'Create Categories',
      items: ['Course'],
      active: 'Create Categories',
    },
  ];

  constructor(
    private router: Router,
    private courseService:CourseService,
    private formBuilder: FormBuilder,
    public utils:UtilsService,
    private activatedRoute: ActivatedRoute, 
  ){
    let urlPath = this.router.url.split('/')

    this.editUrl = urlPath.includes('edit-categories');



    if(this.editUrl===true){
      this.breadscrums = [
        {
          title:'Edit Categories',
          items: ['Course'],
          active: 'Edit Categories',
        },
      ];
    }

    this.coursePaginationModel = {};
    this.coursePaginationModel.main_category = '0';
    this.coursePaginationModel.sub_category = '0';

     
    this.subscribeParams = this.activatedRoute.params.subscribe((params:any) => {
      this.categoryId = params.id;
  });
}
  get subcategories(): FormArray {
    return this.subCategoryForm.get('subcategories') as FormArray;
  }
  ngOnInit(): void {
    if(this.editUrl){
          this.getData();
          }
    // this.fetchSubCategories();
    this.initMainCategoryForm();
    this.initSubCategoryForm();
    this.addSubCategoryField();
  }
  pageSizeChange($event: any) {
    this.coursePaginationModel.page= $event?.pageIndex + 1;
    this.coursePaginationModel.limit= $event?.pageSize;
    // this.fetchSubCategories();
   }

  addSubCategoryField(): void {
    this.subcategories.push(
      this.formBuilder.group({
        category_name: ['', Validators.required]
      })
    );
  }
  initSubCategoryForm(): void {
    this.subCategoryForm = this.formBuilder.group({
      category_name: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]/)]),
      main_category_id: [''],
      subcategories: this.formBuilder.array([])
    });
  }


  createMainCategory(): void {
    this.isSubmitted=true
    if (this.mainCategoryForm.invalid) {
      return;
    }

    const mainCategoryData = this.mainCategoryForm.value;
    this.courseService.createMainCategory(mainCategoryData).subscribe(
      (response) => {
        Swal.fire('Success', 'Main category created successfully!', 'success');
        this.mainCategoryId = response.data._id;
      },
      (error) => {
        Swal.fire('Error', 'Failed to create main category!', 'error');
      }
    );
    this.isSubmitted=false
  }
  
  createSubCategory(): void {
    this.isSubmitted=true
    if (this.subCategoryForm.invalid) {
      this.validations=true
      return;
    }

    this.subCategoryData = this.subcategories.value;
    this.subCategoryData.forEach(subcategory => {
      subcategory.main_category_id = this.mainCategoryId;
    });

    this.courseService.createSubCategory(this.subCategoryData).subscribe(
      (response) => {
        Swal.fire('Success', 'Subcategories created successfully!', 'success');
        this.mainCategoryForm.reset();
        this.subCategoryForm.reset();
        this.initSubCategoryForm();
        this.addSubCategoryField();
        // this.fetchSubCategories();
      },
      (error) => {
        Swal.fire('Error', 'Failed to create subcategories!', 'error');
      }
    );
    this.isSubmitted=false
  }

  initMainCategoryForm(): void {
    this.mainCategoryForm = this.formBuilder.group({
      category_name: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]/)]),
      
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


 
}
