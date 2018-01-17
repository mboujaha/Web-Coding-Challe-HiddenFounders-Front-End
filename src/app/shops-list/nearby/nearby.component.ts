import {Component, OnInit} from '@angular/core';
import {ShopService} from '../../services/shop.service';
import {Shop} from '../../models/shop.model';
import {GeoHelper} from '../../Utils/geoHelper';
import {CookieService} from 'ngx-cookie-service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.css']
})
export class NearbyComponent implements OnInit {
  shops: Shop[];
  dataLoading = true; // for the page preload animation;

  /**
   * Inject the shopService and the CookiesService;
   * @param {ShopService} shopService
   * @param {CookieService} cookies
   * @param {AuthenticationService} authService
   */
  constructor(private shopService: ShopService,
              private cookies: CookieService,
              private authService: AuthenticationService) {
  }

  /**
   * First thing to do is load shops;
   */
  ngOnInit() {
    this.loadShops();
  }


  /**
   * Add a shop to the disliked list for 2 hours;
   * @param {Shop} shop
   */
  onDislike(shop: Shop) {
    this.cookies.set(shop._id, shop._id, .08);
    this.ReorderShops();
  }

  /**
   * Load initial list of shops and then filter those which are disliked by the user.
   * if the location services are active, sort the shops by distance from the user's current location;
   */
  loadShops() {
    this.shopService.getAllShops().subscribe(
      (shops: Shop[]) => {
        this.shops = shops;  // load initial shops;
        this.ReorderShops(); // Filter Disliked Shops;
        this.filterPreferredShops(); // Filter preferred Shops;
        this.dataLoading = false; // set page preLoader to false;
        /*
          in case location service is activated,
           this next snipped of code will sort the shops by distance from the user's current location;
         */
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            this.shops = shops.sort(
              (shopA: Shop, shopB: Shop) => {
                return GeoHelper.compareTwoShops(shopA, shopB, position.coords);
              });
            this.ReorderShops(); // Filter Disliked Shops;
            this.filterPreferredShops(); // Filter preferred Shops;
          }
        );
      }
    );
  }

  /**
   * Filter the list of shops by removing disliked and preferred shops;
   * @constructor
   */
  ReorderShops() {
    this.shops.forEach(
      (shop) => {
        if (this.cookies.check(shop._id)) {
          this.shops = this.shops.filter(
            item => item._id !== shop._id
          );
        }
      }
    );
  }

  /**
   * Add a shop to the preferred list.
   * The user must be logged in.
   * @param {Shop} shop
   */
  onLike(shop: Shop) {
    this.shopService.addToPreferredList(shop).subscribe(
      () => {
        this.shops = this.shops.filter(item => item._id !== shop._id);
      }
    );
  }

  /**
   * Filter shops which are liked by the user
   */
  private filterPreferredShops() {
    if (this.authService.isUserLoggedIn()) {
      this.shopService.getPreferredList().subscribe(
        (preferredShops: Shop[]) => {
          preferredShops.forEach(
            (shop) => {
              this.shops = this.shops.filter(
                item => item._id !== shop._id
              );
            }
          );
        }
      );
    }
  }

  /**
   * return if the user is logged in, in order to disable the like button.
   * @returns {boolean}
   */
  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }
}
