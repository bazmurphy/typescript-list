import "./css/style.css";

import FullList from "./model/FullList";
import ListItem from "./model/ListItem";
import ListTemplate from "./templates/ListTemplate";

const initApp = (): void => {
  // get the singleton instance of the Full List
  const fullList = FullList.instance;
  // get the singleton instance of the List Template
  const template = ListTemplate.instance;

  // add a listener to the Form
  const itemEntryForm = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement;
  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();

    const input = document.getElementById("newItem") as HTMLInputElement;
    const newEntryText: string = input.value.trim();
    console.log(newEntryText);
    if (!newEntryText) {
      return;
    }

    // add an incremented id depending on the last entry
    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;

    const newItem = new ListItem(itemId.toString(), newEntryText);
    // the checked value was defaulted to false so we don't have to provide it

    fullList.addItem(newItem);

    template.render(fullList);
  });

  // add a listener and handler to the Clear Items Button
  const clearItems = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;
  clearItems.addEventListener("click", (): void => {
    // clear the data
    fullList.clearList();
    // clear the display
    template.clear();
  });

  // finally load the list and render the list when the app is launched
  fullList.load();
  template.render(fullList);
};

initApp();

// we have used "defer" in the script tag on the HTML, so we don't really need to use this:
// document.addEventListener("DOMContentLoaded", initApp);
