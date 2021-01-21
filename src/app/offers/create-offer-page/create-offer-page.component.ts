import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { OffersService } from "src/app/shared/services/offers.service";

@Component({
  selector: "app-create-offer-page",
  templateUrl: "./create-offer-page.component.html",
  styleUrls: ["./create-offer-page.component.scss"],
})
export class CreateOfferPageComponent implements OnInit {
  offerForm: FormGroup;
  newOffer: {};

  constructor(
    private _formBuilder: FormBuilder,
    private _offersService: OffersService,
    private toastr: ToastrService
  ) {
    this.offerForm = this.createFormGroup();
  }

  ngOnInit(): void {}

  createFormGroup() {
    return this._formBuilder.group({
      name: [
        "",
        {
          validators: [Validators.required, Validators.maxLength(50)],
          updateOn: "blur",
        },
      ],
      latitude: [
        "",
        {
          validators: [Validators.required, Validators.maxLength(30)],
        },
      ],
      longitude: [
        "",
        {
          validators: [Validators.required, Validators.maxLength(30)],
        },
      ],
      streetName: [
        "",
        {
          validators: [Validators.required, Validators.maxLength(30)],
        },
      ],
      streetNumber: [
        "",
        {
          validators: [Validators.required, Validators.maxLength(30)],
        },
      ],
      cityName: [
        "",
        {
          validators: [Validators.required, Validators.maxLength(30)],
        },
      ],
      countryName: [
        "",
        {
          validators: [Validators.required, Validators.maxLength(30)],
        },
      ],
      description: [
        "",
        {
          validators: [Validators.required, Validators.maxLength(300)],
        },
      ],
    });
  }

  setOfferCoordinates(e) {
    this.offerForm.patchValue({
      latitude: e.lat,
      longitude: e.lng,
    });
  }

  onSubmit() {
    this.newOffer = {
      address: {
        latitude: this.offerForm.get("latitude").value,
        longitude: this.offerForm.get("longitude").value,
        streetName: this.offerForm.get("streetName").value,
        streetNumber: this.offerForm.get("streetNumber").value,
        city: this.offerForm.get("cityName").value,
        country: this.offerForm.get("countryName").value,
      },
      name: this.offerForm.get("name").value,
      description: this.offerForm.get("description").value,
    };

    this._offersService
      .createOffer(this.newOffer)
      .then(({ data }) => {
        this.toastr.success(`Offer '${data.name}' succesfully created!`);
      })
      .catch((err) => {
        this.toastr.error("There was an error while creating new offer");
      });
  }

  get name() {
    return this.offerForm.get("name");
  }

  get latitude() {
    return this.offerForm.get("latitude");
  }

  get longitude() {
    return this.offerForm.get("longitude");
  }

  get streetName() {
    return this.offerForm.get("streetName");
  }

  get streetNumber() {
    return this.offerForm.get("streetNumber");
  }

  get cityName() {
    return this.offerForm.get("cityName");
  }

  get countryName() {
    return this.offerForm.get("countryName");
  }

  get description() {
    return this.offerForm.get("description");
  }
}
