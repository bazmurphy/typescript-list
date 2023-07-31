import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObject: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  // challenge:
  // a constructor which recieves a list (private)
  // the list will have a getter
  // and then all the different methods above

  // solution:

  // SINGLETON - there will only be instance of this class created
  // and we will keep refering to that, because we will only have one list
  // when it's "static" we need to refer to the Class name
  // and we instantiate it here and we then refer to that as our "instance" of our Class using "FullList.instance"
  static instance: FullList = new FullList();

  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    // go to local storage and retrieve it, if it exists
    const storedList: string | null = localStorage.getItem("myList");
    // type guard
    if (typeof storedList !== "string") {
      return;
    }
    // we provide a custom type here, because the "Item" interface doesn't have the _
    // an array of that type
    //
    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);

    // iterate through the parsedList
    parsedList.forEach((itemObj) => {
      // and we create a new ListItem for each itemObj from localStorage
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );
      // we refer to the instance of our FullList
      // and call the addItem method
      // and pass in the newListItem
      // to populate the FullList
      FullList.instance.addItem(newListItem);
    });
  }

  save(): void {
    // set the localStorage with the list
    localStorage.setItem("myList", JSON.stringify(this._list));
  }

  clearList(): void {
    // clear out the list
    this._list = [];
    // overwrite anything in Local Storage
    this.save();
  }

  addItem(itemObj: ListItem): void {
    // push the itemObj to the list
    this._list.push(itemObj);
    this.save();
  }

  removeItem(id: string): void {
    // filter out the id
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
