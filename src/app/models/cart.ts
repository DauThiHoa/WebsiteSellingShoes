
export class Cart {
  private _id: number ;
  private _name: string ;
  private _image: string ;
  private _category: string  ;
  private _price: number ;
  private _quantitySold: number  ;
  private _total : number;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get quantitySold(): number {
    return this._quantitySold;
  }

  set quantitySold(value: number) {
    this._quantitySold = value;
  }


  get total(): number {
    return this._total;
  }
  get category(): string {
    return this._category;
  }
  set total(value: number) {
    this._total = value;
  }
}
