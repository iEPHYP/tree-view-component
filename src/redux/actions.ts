import { State } from "./index";
import { ITreeItem } from "../components/TreeItem";

type Action<TType extends string = string, TPayload extends object = {}> = {
  type: TType;
} & TPayload;

export type AddRootTreeItemAction = Action<
  "ADD_ROOT_TREE_ITEM",
  Pick<ITreeItem, "id">
>;

export type AddChildTreeItemAction = Action<
  "ADD_CHILD_TREE_ITEM",
  Required<
    Pick<ITreeItem, "id" | "parentId"> & {
      allParentIdsOfParent: ITreeItem["allParentIds"];
    }
  >
>;

export type DeleteTreeItemAction = Action<
  "DELETE_TREE_ITEM",
  Pick<ITreeItem, "id">
>;

export type EditTreeItemAction = Action<
  "EDIT_TREE_ITEM",
  Pick<ITreeItem, "id" | "title">
>;

export const addRootTreeItem = (id: ITreeItem["id"]): AddRootTreeItemAction => {
  return {
    type: "ADD_ROOT_TREE_ITEM",
    id,
  };
};

export const addChildTreeItem = ({
  id,
  parentId,
  allParentIds,
}: Omit<Required<ITreeItem>, "title">): AddChildTreeItemAction => {
  return {
    type: "ADD_CHILD_TREE_ITEM",
    id,
    parentId,
    allParentIdsOfParent: allParentIds,
  };
};

export const deleteTreeItem = (id: ITreeItem["id"]): DeleteTreeItemAction => {
  return {
    type: "DELETE_TREE_ITEM",
    id,
  };
};

export const editTreeItem = ({
  id,
  title,
}: Pick<ITreeItem, "id" | "title">): EditTreeItemAction => {
  return {
    type: "EDIT_TREE_ITEM",
    id,
    title,
  };
};

export type SetTreeItemIdOnEditModeAction = Action<
  "SET_TREE_ITEM_ID_ON_EDIT_MODE",
  Pick<State, "treeItemIdOnEditMode">
>;

export const setTreeItemIdOnEditMode = (
  treeItemIdOnEditMode: State["treeItemIdOnEditMode"]
): SetTreeItemIdOnEditModeAction => {
  return {
    type: "SET_TREE_ITEM_ID_ON_EDIT_MODE",
    treeItemIdOnEditMode,
  };
};
