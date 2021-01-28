import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { HttpParams } from "@angular/common/http";

const ENDPOINTS = {
  ALL_CATEGORIES: "api/cultural-content-category",
  GET_CATEGORIES_BY_PAGE: "api/cultural-content-category/by-page",
  GET_CATEGORIES_TYPES_BY_PAGE: "api/cultural-content-category/category-types",
  GET_CATEGORY_TYPES: "api/cultural-content-category/id/category-types",
  GET_ALL_CATEGORY_TYPES: "api/cultural-content-category/category-types",
  CREATE_CATEGORY: "api/cultural-content-category",
  CREATE_CATEGORY_TYPE:
    "api/cultural-content-category/categoryId/category-types",
};

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  constructor(private _httpService: HttpService) {}

  public getAllCategories() {
    return this._httpService.get(ENDPOINTS.ALL_CATEGORIES);
  }

  public getCategoriesByPage(pageNum = null, pageSize = null) {
    return this._httpService.get(
      `${ENDPOINTS.GET_CATEGORIES_BY_PAGE}?page=${pageNum}&size=${pageSize}`
    );
  }

  public getCategoriesTypesByPage(pageNum = null, pageSize = null) {
    return this._httpService.get(
      `${
        ENDPOINTS.GET_CATEGORIES_TYPES_BY_PAGE
      }?page=${pageNum}&size=${pageSize}`
    );
  }

  public getCategoryTypes(id) {
    return this._httpService.get(
      ENDPOINTS.GET_CATEGORY_TYPES.replace("id", id)
    );
  }

  public getAllCategoryTypes() {
    return this._httpService.get(ENDPOINTS.GET_ALL_CATEGORY_TYPES);
  }

  public createCategory(name) {
    return this._httpService.post(ENDPOINTS.CREATE_CATEGORY, { name: name });
  }

  public createCategoryType(categoryId, typeName) {
    return this._httpService.post(
      ENDPOINTS.CREATE_CATEGORY_TYPE.replace("categoryId", categoryId),
      { name: typeName }
    );
  }

  public deleteCategory(id) {
    return this._httpService.delete(`${ENDPOINTS.ALL_CATEGORIES}/${id}`);
  }
}
