import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { CategoriesService } from "src/app/shared/services/categories.service";

@Component({
  selector: "app-create-category-page",
  templateUrl: "./create-category-page.component.html",
  styleUrls: ["./create-category-page.component.scss"],
})
export class CreateCategoryPageComponent implements OnInit {
  categoryName = "";
  categoryTypeName = "";
  selectedCategoryId = null;

  categories = [];
  pageSizeCategory: string = "5";
  pageNumCategory: number = 0;
  totalNumOfCategories: number = 0;

  categoriesTypes = [];
  pageSizeCategoryTypes: string = "5";
  pageNumCategoryTypes: number = 0;
  totalNumOfCategoriesTypes: number = 0;

  constructor(
    private _categoriesService: CategoriesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllCategoriesTypes();
  }

  getAllCategories() {
    this._categoriesService
      .getCategoriesByPage(this.pageNumCategory, this.pageSizeCategory)
      .then(({ data }) => {
        console.log(data.content);
        this.totalNumOfCategories = data.totalElements;
        this.categories = data.content;
      });
  }

  getAllCategoriesTypes() {
    this._categoriesService
      .getCategoriesTypesByPage(
        this.pageNumCategoryTypes,
        this.pageSizeCategoryTypes
      )
      .then(({ data }) => {
        console.log(data.content);
        this.totalNumOfCategoriesTypes = data.totalElements;
        this.categoriesTypes = data.content;
      });
  }

  createCategory() {
    this._categoriesService
      .createCategory(this.categoryName)
      .then(({ data }) => {
        this.getAllCategories();
      });
  }

  createCategoryType() {
    this._categoriesService
      .createCategoryType(this.selectedCategoryId, this.categoryTypeName)
      .then(({ data }) => {
        this.getAllCategories();
      });
  }

  selectCategory({ value }) {
    this.selectedCategoryId = value;
  }

  deleteCategory(id) {
    this._categoriesService
      .deleteCategory(id)
      .then(() => {
        this.toastr.success("Category deleted successfully");
        this.getAllCategories();
      })
      .catch((err) => {
        this.toastr.error("Can't delete category since it belongs to offer!");
      });
  }

  onPageSizeSelect(type) {
    if (type === 1) {
      this.pageNumCategory = 0;
      this.getAllCategories();
    } else {
      this.pageNumCategoryTypes = 0;
      this.getAllCategoriesTypes();
    }
  }

  onClickNext(type) {
    if (type === 1) {
      this.pageNumCategory++;
      this.getAllCategories();
    } else {
      this.pageNumCategoryTypes++;
      this.getAllCategoriesTypes();
    }
  }

  onClickPrevious(type) {
    if (type === 1) {
      this.pageNumCategory--;
      this.getAllCategories();
    } else {
      this.pageNumCategoryTypes--;
      this.getAllCategoriesTypes();
    }
  }
}
