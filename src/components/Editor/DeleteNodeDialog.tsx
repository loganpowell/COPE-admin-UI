import React from "react";
import { useHistory } from "react-router";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { node } from "cope-client-utils";

function DeleteNodeDialog({
  open,
  setOpen,
  nodeId,
}: {
  open: boolean;
  setOpen: Function;
  nodeId?: string;
}) {
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

  const deleteNode = (nodeId?: string) => {
    let data = {
      id: nodeId,
    };

    node
      .delete(data)
      .then((result: any) => {
        console.log(result);
      })
      .catch((error: any) => {
        console.error(error);
      });

    handleClose();
    history.push("/collections");
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete this Node?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting this node will remove this node from the database. As a
            result will be unable to edit this node in the future.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => deleteNode(nodeId)} color="primary" autoFocus>
            Delete Node
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteNodeDialog;
