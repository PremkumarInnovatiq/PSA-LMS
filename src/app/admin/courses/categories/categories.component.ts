import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  CourseModel,
  CoursePaginationModel,
  SubCategory,
} from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'Main Category',
    'Sub Category',
    'status',
  ];
  breadscrums = [
    {
      title: 'Categories',
      items: ['Course'],
      active: 'Categories',
    },
  ];

  listCat: any;
  subCategoryForm!: FormGroup;
  mainCategoryForm!: FormGroup;
  mainCategoryId: string = '';
  isSubmitted = false;
  validations = false;
  subCategoryData: SubCategory[] = [];
  coursePaginationModel!: Partial<CoursePaginationModel>;
  totalItems: any;
  pageSizeArr = this.utils.pageSizeArr;
  list: boolean = true;
  create: boolean = true;
  dataSource: any;
  isLoading = true;
  selection = new SelectionModel<CourseModel>(true, []);
  // subCategory = [];
  subCategory: string[] = [];
  data: any;

  constructor(
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    public utils: UtilsService,
    private snackBar: MatSnackBar
  ) {
    this.coursePaginationModel = {};
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  ngOnInit(): void {
    this.fetchSubCategories();
    this.initSubCategoryForm();
    this.addSubCategoryField();
    this.initMainCategoryForm();
  }
  fetchSubCategories(): void {
    this.courseService
      .getMainCategoriesWithPagination({ ...this.coursePaginationModel })
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.dataSource = response.data.docs;
          this.totalItems = response.data.totalDocs;
          this.coursePaginationModel.docs = response.data.docs;
          this.coursePaginationModel.page = response.data.page;
          this.coursePaginationModel.limit = response.data.limit;
        },
        (error) => {
          console.error('Failed to fetch categories:', error);
        }
      );
  }
  pageSizeChange($event: any) {
    this.coursePaginationModel.page = $event?.pageIndex + 1;
    this.coursePaginationModel.limit = $event?.pageSize;
    this.fetchSubCategories();
  }
  get subcategories(): FormArray {
    return this.subCategoryForm.get('subcategories') as FormArray;
  }
  addSubCategoryField(): void {
    this.subcategories.push(
      this.formBuilder.group({
        category_name: ['', Validators.required],
      })
    );
  }
  initSubCategoryForm(): void {
    this.subCategoryForm = this.formBuilder.group({
      main_category_id: [''],
      subcategories: this.formBuilder.array([]),
    });
  }
  initMainCategoryForm(): void {
    this.mainCategoryForm = this.formBuilder.group({
      category_name: new FormControl('', [
        Validators.required,
        ...this.utils.validators.category_name,
        ...this.utils.validators.noLeadingSpace,
      ]),
    });
  }
  createSubCategory(): void {
    this.isSubmitted = true;
    if (this.subCategoryForm.invalid) {
      this.validations = true;
      return;
    }

    this.subCategoryData = this.subcategories.value;
    this.subCategoryData.forEach((subcategory) => {
      subcategory.main_category_id = this.mainCategoryId;
    });

    this.courseService.createSubCategory(this.subCategoryData).subscribe(
      (response) => {
        Swal.fire('Success', 'Subcategories created successfully!', 'success');
        this.mainCategoryForm.reset();
        this.subCategoryForm.reset();
        this.initSubCategoryForm();
        this.addSubCategoryField();
        this.list = !this.list;
        this.create = !this.create;
        // this.list = !this.list;
        this.fetchSubCategories();
      },
      (error) => {
        Swal.fire('Error', 'Failed to create subcategories!', 'error');
      }
    );
    this.isSubmitted = false;
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.forEach((row: CourseModel) =>
          this.selection.select(row)
        );
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.findIndex(
        (d: CourseModel) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.courseService?.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<CourseModel>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'top',
      'right'
    );
  }
}
