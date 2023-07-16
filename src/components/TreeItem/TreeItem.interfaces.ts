export interface ITreeItem {
  id: string;
  title: string;
  parentId?: string;
  allParentIds: string[];
}
