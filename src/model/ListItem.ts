export interface Item {
  id: string;
  item: string;
  checked: boolean;
}

export default class ListItem implements Item {
  // my attempt:
  // constructor(
  //   private _id: string,
  //   private _item: string,
  //   private _checked: boolean // declare them as regular class properties without default values.
  // ) {
  //   this._id = _id;
  //   this._item = _item;
  //   this._checked = _checked;
  //   // Then in the constructor body, you manually assign them values passed in as parameters.
  //   // Manually assing them values passed in as parameters
  // }

  // solution:
  constructor(
    private _id: string = "",
    private _item: string = "",
    private _checked: boolean = false // the properties _id, _item, and _checked are declared as parameters to the constructor with default values
  ) {
    // By declaring them as parameters with defaults, you get the assignment for free without needing explicit assignment statements in the constructor body.
    // The assignments happen automatically on creation
    // This approach is cleaner and more concise by handling it at time of declaration
  }

  get id(): string {
    return this._id;
  }

  set id(value) {
    this.id = value;
  }

  get item(): string {
    return this._item;
  }

  set item(value) {
    this.item = value;
  }

  get checked(): boolean {
    return this._checked;
  }

  set checked(value) {
    this.checked = value;
  }
}
