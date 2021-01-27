import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";
import { OffersService } from "src/app/shared/services/offers.service";

@Component({
  selector: "app-single-offer-page",
  templateUrl: "./single-offer-page.component.html",
  styleUrls: ["./single-offer-page.component.scss"],
})
export class SingleOfferPageComponent implements OnInit {
  offer;
  commentText = "";
  comments: any = [];
  private pageNum: number = -1;
  private pageSize: number = 5;
  showMore: boolean;

  constructor(
    private _offersService: OffersService,
    private route: ActivatedRoute,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");
    this._offersService.getSingleOffer(id).then(({ data }) => {
      this.offer = data;
      this.getComments();
    });
  }

  addComment() {
    this._offersService.addComment(
      this.offer.id,
      this.commentText,
      this._authService.getUser()
    );
  }

  getComments() {
    this.pageNum++;
    this._offersService
      .getAllComments(this.offer.id, this.pageNum, this.pageSize)
      .then(({ data }) => {
        this.showMore =
          this.pageNum * this.pageSize < data.totalElements - this.pageSize;
        this.comments = [...this.comments, ...data.content];
      });
  }
}
