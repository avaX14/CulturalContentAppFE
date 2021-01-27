import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-offer-comments",
  templateUrl: "./offer-comments.component.html",
  styleUrls: ["./offer-comments.component.scss"],
})
export class OfferCommentsComponent implements OnInit {
  @Output()
  addCommentEvent = new EventEmitter();
  @Output()
  loadMoreCommentsEvent = new EventEmitter();
  @Input()
  comments;
  @Input()
  commentText;
  @Input()
  showMore;

  constructor() {}

  ngOnInit() {}

  addComment() {
    this.addCommentEvent.emit();
  }

  loadMoreComments() {
    this.loadMoreCommentsEvent.emit();
  }
}
