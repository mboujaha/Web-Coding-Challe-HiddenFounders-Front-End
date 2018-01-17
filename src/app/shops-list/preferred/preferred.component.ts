import {Component, OnInit} from '@angular/core';
import {Shop} from '../../models/shop.model';
import {ShopService} from '../../services/shop.service';

@Component({
  selector: 'app-preferred',
  templateUrl: './preferred.component.html',
  styleUrls: ['./preferred.component.css']
})
export class PreferredComponent implements OnInit {

  preferredShops: Shop[]; // the preferred shops list of the currently logged user.

  /**
   * Inject ShopService  service;
   * @param {ShopService} shopService
   */
  constructor(private shopService: ShopService) {
  }

  /**
   * Load the list of the preferred shops  of the currently logged user.
   */
  ngOnInit() {
    this.shopService.getPreferredList().subscribe(
      (shops: Shop[]) => {
        this.preferredShops = shops;
      }
    );
  }


  /**
   * Calls the removeShopFromPreferredList of the ShopService to remove a shop from the preferred list;
   * @param {Shop} shop
   */
  onRemoveShop(shop: Shop) {
    if (window.confirm('remove ' + shop.name + ' from the preferred list')) {
      this.shopService.removeShopFromPreferredList(shop).subscribe(
        () => {
          this.preferredShops = this.preferredShops.filter(item => item._id !== shop._id);
        }
      );
    }
  }
}
