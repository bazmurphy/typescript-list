import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  // render expects a Full List
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  // make it a Singleton
  static instance: ListTemplate = new ListTemplate();

  // [4] so we need to add this:
  ul: HTMLUListElement;

  private constructor() {
    // [1] Property 'ul' does not exist on type 'ListTemplate'.ts(2339)
    // [2] we did not pass this in as a parameter
    // [3] we absolutely assigned it here in the constructor
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }

  clear(): void {
    // clear out the list
    this.ul.innerHTML = "";
  }

  render(fullList: FullList): void {
    // clear out the list so we don't duplicate it
    this.clear();

    // fullList in this case is the instance of the Class, and it has a list getter
    fullList.list.forEach((item) => {
      // <li class="item">
      //   <input type="checkbox" id="1" />
      //   <label for="1">eat</label>
      //   <button class="button">X</button>
      // </li>

      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";

      const input = document.createElement("input") as HTMLInputElement;
      input.type = "checkbox";
      // we are using the getters and setters here:
      input.checked = item.checked;
      input.id = item.id;
      li.append(input);
      input.addEventListener("change", () => {
        item.checked = !item.checked;
        fullList.save();
      });

      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;
      li.append(label);

      const button = document.createElement("button") as HTMLButtonElement;
      button.className = "button listItem__button";
      button.textContent = "X";
      li.append(button);
      button.addEventListener("click", () => {
        fullList.removeItem(item.id);
        // we pass the fullList (that was passed in as an argument) to the render method
        this.render(fullList);
      });

      this.ul.append(li);
    });

    console.log("ListTemplate render() fullList.list:", fullList.list);
  }
}
