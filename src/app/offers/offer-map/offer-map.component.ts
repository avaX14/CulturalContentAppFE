import {
  Component,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
} from "@angular/core";
import * as Leaflet from "leaflet";
import "leaflet/dist/images/marker-shadow.png";

const belgrade = {
  coords: new Leaflet.LatLng(44.787197, 20.457273),
  zoom: 7,
};

@Component({
  selector: "app-offer-map",
  templateUrl: "./offer-map.component.html",
  styleUrls: ["./offer-map.component.scss"],
})
export class OfferMapComponent implements OnInit, AfterViewInit {
  @Output() offerCoordinates = new EventEmitter<any>();
  @Input() createOffer;
  @Input() offers;

  map: Leaflet.Map;
  private marker;
  allOffers = [];
  layerGroup;

  constructor() {}

  ngOnInit(): void {
    this.allOffers = this.offers;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["offers"]) {
      this.offers = changes["offers"].currentValue;
      this.layerGroup && this.map.removeLayer(this.layerGroup);

      this.createMarkers();
    }
    // changes.prop contains the old and the new value...
  }

  ngAfterViewInit(): void {
    if (this.map != undefined) {
      this.map.off();
      this.map.remove();
    }

    this.map = Leaflet.map("map");

    Leaflet.tileLayer(
      "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ).addTo(this.map);

    this.map.setView(belgrade.coords, belgrade.zoom);
    this.map.on("click", (e) => this.onMapClick(e));

    if (this.offers) {
      this.createMarkers();
    }
  }

  createMarkers() {
    this.layerGroup = Leaflet.layerGroup().addTo(this.map);

    this.offers.forEach((element) => {
      Leaflet.marker([element.address.latitude, element.address.longitude])
        .bindPopup(
          `
          <a href="/offer/${element.id}">
            <h5>${element.name}</h5>
            <p>${element.address.streetName} ${element.address.streetNumber}</p>
            <p>${element.address.city}</p>
          </a>
        `
        )
        .addTo(this.layerGroup);
    });
  }

  onMapClick(e) {
    if (!this.createOffer) {
      return;
    }
    const { latlng } = e;

    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = Leaflet.marker([latlng.lat, latlng.lng]).addTo(this.map);
    this.offerCoordinates.emit(latlng);
  }
}
