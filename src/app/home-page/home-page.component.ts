import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../shared/services/auth.service";
import { OffersService } from "../shared/services/offers.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
  offers = [];
  private pageNum: number = 0;
  private pageSize: number = 10;
  private isLastPage: boolean = false;

  constructor(
    private _offersService: OffersService,
    private toastr: ToastrService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getOffers();
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
}
