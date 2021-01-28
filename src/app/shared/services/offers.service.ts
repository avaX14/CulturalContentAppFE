import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { HttpParams } from "@angular/common/http";
import { AuthService } from "./auth.service";

const ENDPOINTS = {
  OFFERS: "api/offers",
  ALL_OFFERS: "api/offers/public/all",
  SINGLE_OFFER: "api/offers/public/id",
  FILTER_BY_CATEGORY_TYPES: "api/offers/public/filterByCategoryType",
  SEARCH_OFFERS: "api/offers/public/search",
  IMAGE_UPLOAD: "api/images/offers",
  ALL_COMMENTS: "api/comments/id",
  ADD_COMMENT: "api/comments",
};

@Injectable({
  providedIn: "root",
})
export class OffersService {
  constructor(private _httpService: HttpService) {}

  public createOffer(newOffer) {
    return this._httpService.post(ENDPOINTS.OFFERS, newOffer);
  }

  public getAllOffers(pageNum = null, pageSize = null) {
    return this._httpService.get(
      `${ENDPOINTS.ALL_OFFERS}?page=${pageNum}&size=${pageSize}`
    );
  }

  public getSingleOffer(id) {
    return this._httpService.get(`${ENDPOINTS.SINGLE_OFFER.replace("id", id)}`);
  }

  public filterByCategoryType(id) {
    return this._httpService.get(
      `${ENDPOINTS.FILTER_BY_CATEGORY_TYPES}?typeId=${id}`
    );
  }

  public searchOffers(searchParam) {
    return this._httpService.get(
      `${ENDPOINTS.SEARCH_OFFERS}?searchParam=${searchParam}`
    );
  }

  public uploadFile(file) {
    this._httpService.post(`${ENDPOINTS.IMAGE_UPLOAD}/1`, file);
  }

  public deleteOffer(id) {
    return this._httpService.delete(`${ENDPOINTS.OFFERS}/${id}`);
  }

  public getAllComments(id, pageNum = null, pageSize = null) {
    return this._httpService.get(
      `${ENDPOINTS.ALL_COMMENTS.replace(
        "id",
        id
      )}?page=${pageNum}&size=${pageSize}`
    );
  }

  public addComment(offerId, text, user) {
    console.log(user);
    this._httpService.post(`${ENDPOINTS.ADD_COMMENT}`, {
      text,
      offerId: offerId,
      author: user,
    });
  }
}
