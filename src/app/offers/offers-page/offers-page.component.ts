import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { OffersService } from "src/app/shared/services/offers.service";

@Component({
  selector: "app-offers-page",
  templateUrl: "./offers-page.component.html",
  styleUrls: ["./offers-page.component.scss"],
})
export class OffersPageComponent implements OnInit {
  offers: any[] = [];
  pageSize: string = "5";
  pageNum: number = 0;
  totalNumOfOffers: number = 0;

  constructor(
    private _offersService: OffersService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getOffers();
  }

  private getOffers(): void {
    this._offersService.getAllOffers(this.pageNum, this.pageSize).then(
      ({ data }) => {
        this.totalNumOfOffers = data.totalElements;
        this.offers = data.content;
      },
      (error) => {
        this.toastr.error(
          "There was an error while getting the data about offers."
        );
      }
    );
  }

  onClickEdit(eventId: number): void {
    // this.router.navigate([EDIT_EVENT, eventId]);
  }

  onClickDelete(offerId) {
    this._offersService
      .deleteOffer(offerId)
      .then(() => {
        this.toastr.success("Offer deleted successfully");
        this.getOffers();
      })
      .catch((err) => {
        this.toastr.error("Error while deleting offer!");
      });
  }

  onPageSizeSelect() {
    this.pageNum = 0;
    this.getOffers();
  }

  onClickNext() {
    this.pageNum++;
    this.getOffers();
  }

  onClickPrevious() {
    this.pageNum--;
    this.getOffers();
  }
}
