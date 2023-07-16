import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import Input from "@material-ui/core/Input";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  addChildTreeItem,
  editTreeItem,
  deleteTreeItem,
  setTreeItemIdOnEditMode,
  State,
} from "../../redux";
import { ITreeItem } from "./TreeItem.interfaces";

interface TreeItemProps {
  treeItem: ITreeItem;
}

export const TreeItem: React.FC<TreeItemProps> = ({
  treeItem: { id, title, allParentIds },
}) => {
  const dispatch = useDispatch();
  const childTreeItems = useSelector<State, State["treeItems"]>((state) =>
    state.treeItems.filter((child) => child.parentId === id)
  );

  const treeItemIdOnEditMode = useSelector<
    State,
    State["treeItemIdOnEditMode"]
  >((state) => state.treeItemIdOnEditMode);
  const onEditMode = useMemo(
    () => treeItemIdOnEditMode === id,
    [id, treeItemIdOnEditMode]
  );
  const [collapsed, setCollapsed] = useState(true);
  const [editingTitle, setEditingTitle] = useState(title);

  const handleChildTreeItemAdding = () => {
    const newChildTreeItemId = uuid();
    dispatch(
      addChildTreeItem({ id: newChildTreeItemId, parentId: id, allParentIds })
    );
    dispatch(setTreeItemIdOnEditMode(newChildTreeItemId));
    setCollapsed(false);
  };

  const handleTreeItemEdition = () => {
    setEditingTitle(title);
    dispatch(setTreeItemIdOnEditMode(id));
  };

  const handleTreeItemDeletion = () => {
    dispatch(deleteTreeItem(id));
  };

  const handleSaveTreeItemTitle = (value: string) => {
    if (!value && !title) {
      handleTreeItemDeletion();
    } else {
      dispatch(editTreeItem({ id, title: value || title }));
      setEditingTitle(value || title);
    }
    dispatch(setTreeItemIdOnEditMode(null));
  };

  const arrowVisibilityProps = useMemo(
    () => ({
      style: {
        visibility: childTreeItems.length ? "visible" : "hidden",
      } as React.CSSProperties,
    }),
    [childTreeItems.length]
  );

  return (
    <>
      <ListItem
        divider={true}
        onClick={() => !onEditMode && setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <KeyboardArrowRightIcon {...arrowVisibilityProps} />
        ) : (
          <KeyboardArrowDownIcon {...arrowVisibilityProps} />
        )}
        {onEditMode ? (
          <Input
            style={{ marginRight: "20%" }}
            onKeyDown={({ currentTarget: { value }, key }) => {
              if (key === "Enter") {
                handleSaveTreeItemTitle(value);
              }
            }}
            onChange={(event) => setEditingTitle(event.currentTarget.value)}
            onBlur={(event) => {
              handleSaveTreeItemTitle(event.currentTarget.value);
            }}
            value={editingTitle}
            placeholder="Enter node name"
            disableUnderline={true}
            fullWidth={true}
            autoFocus={true}
          />
        ) : (
          <ListItemText primary={title} />
        )}
        <ListItemSecondaryAction>
          <IconButton onClick={handleChildTreeItemAdding} edge="end">
            <AddIcon />
          </IconButton>
          <IconButton onClick={handleTreeItemEdition} edge="end">
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleTreeItemDeletion} edge="end">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      {!collapsed && (
        <div style={{ paddingLeft: 10 }}>
          {childTreeItems.map((child) => (
            <TreeItem key={child.id} treeItem={child} />
          ))}
        </div>
      )}
    </>
  );
};
