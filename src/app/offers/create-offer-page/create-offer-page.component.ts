import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CategoriesService } from "src/app/shared/services/categories.service";
import { OffersService } from "src/app/shared/services/offers.service";

@Component({
  selector: "app-create-offer-page",
  templateUrl: "./create-offer-page.component.html",
  styleUrls: ["./create-offer-page.component.scss"],
})
export class CreateOfferPageComponent implements OnInit {
  offerForm: FormGroup;
  newOffer: {};
  categories: [];
  categoryTypes: [];
  selectedFile: any;
  imageSrc: any;
  uploadData = new FormData();
  uploadedFileName: any = "";

  constructor(
    private _formBuilder: FormBuilder,
    private _offersService: OffersService,
    private _categoriesService: CategoriesService,
    private toastr: ToastrService
  ) {
    this.offerForm = this.createFormGroup();
    this._categoriesService.getAllCategories().then(({ data }) => {
      this.categories = data;
    });
  }

  ngOnInit(): void {}

  getCategoryTypes({ value }) {
    this._categoriesService.getCategoryTypes(value).then(({ data }) => {
      this.categoryTypes = data;
    });
  }

  selectCategoryType({ value }) {
    this.offerForm.patchValue({
      typeId: value,
    });
  }

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
      city: [
        "",
        {
          validators: [Validators.required, Validators.maxLength(30)],
        },
      ],
      country: [
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
      typeId: [
        "",
        {
          validators: [Validators.required],
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
        city: this.offerForm.get("city").value,
        country: this.offerForm.get("country").value,
      },
      name: this.offerForm.get("name").value,
      description: this.offerForm.get("description").value,
      typeId: this.offerForm.get("typeId").value,
    };

    this._offersService
      .createOffer(this.newOffer)
      .then(({ data }) => {
        this.toastr.success(`Offer '${data.name}' succesfully created!`);
        this.offerForm.reset();
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

  get city() {
    return this.offerForm.get("city");
  }

  get country() {
    return this.offerForm.get("country");
  }

  get description() {
    return this.offerForm.get("description");
  }

  get typeId() {
    return this.offerForm.get("typeId");
  }
}
