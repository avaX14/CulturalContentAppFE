import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../shared/services/auth.service";
import { CategoriesService } from "../shared/services/categories.service";
import { OffersService } from "../shared/services/offers.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
  offers = [];
  categoryTypes = [];
  private pageNum: number = 0;
  private pageSize: number = 10;
  private isLastPage: boolean = false;
  searchParam = "";

  constructor(
    private _offersService: OffersService,
    private _categoriesService: CategoriesService,
    private toastr: ToastrService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getOffers();
    this.getAllCategoryTypes();
  }

  private getAllCategoryTypes() {
    this._categoriesService.getAllCategoryTypes().then(({ data }) => {
      this.categoryTypes = data.content;
    });
  }

  filterByCategoryType({ value }) {
    this._offersService.filterByCategoryType(value).then(({ data }) => {
      this.offers = data;
    });
  }

  private getOffers(): void {
    if (this._authService.isAdmin()) {
      this._offersService
        .getAllOffers(this.pageNum, this.pageSize)
        .then(({ data }) => {
          this.offers = [...data.content];
          this.isLastPage = data.last;
        })
        .catch((err) => {
          this.toastr.error(
            "There was an error while getting the data for offers"
          );
        });
    } else {
      this._offersService
        .getAllOffers()
        .then(({ data }) => {
          this.offers.push(...data.content);
          this.isLastPage = data.last;
        })
        .catch((err) => {
          this.toastr.error(
            "There was an error while getting the data for offers"
          );
        });
    }
  }

  search() {
    this._offersService.searchOffers(this.searchParam).then(({ data }) => {
      this.offers = data;
    });
  }
}
