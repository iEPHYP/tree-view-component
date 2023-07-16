import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import List from "@material-ui/core/List";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import { addRootTreeItem, setTreeItemIdOnEditMode, State } from "../redux";
import { TreeItem } from "./TreeItem";

export const TreeView: React.FC = () => {
  const dispatch = useDispatch();
  const rootTreeItems = useSelector<State, State["treeItems"]>((state) =>
    state.treeItems.filter((treeItem) => !treeItem.parentId)
  );

  return (
    <>
      <Tooltip title="Add root tree item" placement="right">
        <IconButton
          onClick={() => {
            const newId = uuid();
            dispatch(addRootTreeItem(newId));
            dispatch(setTreeItemIdOnEditMode(newId));
          }}
        >
          <CreateNewFolderIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <List>
        {rootTreeItems.map((treeItem) => (
          <TreeItem key={treeItem.id} treeItem={treeItem} />
        ))}
      </List>
    </>
  );
};
