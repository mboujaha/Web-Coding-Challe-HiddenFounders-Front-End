export class Shop {
   _id: string;
   picture: string;
   name: string;
   email: string;
   city: string;
   location: {
    type: string,
    coordinates: [number, number]
  };
}
