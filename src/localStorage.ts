import { ITreeItem } from "./components/TreeItem";

export const loadTreeItems = (): ITreeItem[] => {
  try {
    const stateFromLocalStorage = localStorage.getItem("treeItems");

    if (!stateFromLocalStorage) {
      return [];
    }

    const treeItems: ITreeItem[] = JSON.parse(stateFromLocalStorage);

    return treeItems.filter((treeItem) => treeItem.title);
  } catch (err) {
    console.error(err);

    return [];
  }
};

export const saveTreeItems = (treeItems: ITreeItem[]) => {
  try {
    localStorage.setItem("treeItems", JSON.stringify(treeItems));
  } catch (err) {
    console.error(err);
  }
};
