import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { HttpParams } from "@angular/common/http";

const ENDPOINTS = {
  OFFERS: "api/offers",
  ALL_OFFERS: "api/offers/public/all",
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
}
