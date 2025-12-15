import React from "react";

export const useDialogControl = () => {
  const [open, setOpen] = React.useState(false);
  const onClick = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return {
    open,
    onClose,
    onClick,
  };
};
