
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Shop} from '../models/shop.model';

export class GeoHelper {
  // This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
  static calcCrow(latitude1, lon1, latitude2, lon2) {
    const R = 6371; // km
    const dLat = GeoHelper.toRad(latitude2 - latitude1);
    const dLon = GeoHelper.toRad(lon2 - lon1);
    const lat1 = GeoHelper.toRad(latitude1);
    const lat2 = GeoHelper.toRad(latitude2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Converts numeric degrees to radians
  static toRad(Value) {
    return Value * Math.PI / 180;
  }

  /**
   * Compare two shops by their distance to the user's current location.
   * @param {Shop} shopA
   * @param {Shop} shopB
   * @param {Coordinates} userCords
   * @returns {number}
   */
  static compareTwoShops(shopA: Shop, shopB: Shop, userCords: Coordinates): number {
      const userLat = userCords.latitude;
      const userLang = userCords.longitude;

      const shopALat = shopA.location.coordinates[0];
      const shopALang = shopA.location.coordinates[1];

      const shopBLat = shopB.location.coordinates[0];
      const shopBLang = shopB.location.coordinates[1];

      const shopADistance = GeoHelper.calcCrow(userLat, userLang, shopALat, shopALang);
      const shopBDistance = GeoHelper.calcCrow(userLat, userLang, shopBLat, shopBLang);

      return shopADistance - shopBDistance;
  }

}


