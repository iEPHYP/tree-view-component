import { ITreeItem } from "../components/TreeItem";

export interface State {
  treeItems: ITreeItem[];
  treeItemIdOnEditMode: string | null;
}
