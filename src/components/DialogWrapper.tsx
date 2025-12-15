// DialogWrapper.js
import { useNavigate } from "react-router";
import { DialogOrDrawer } from "./DialogOrDrawer";
import type { PropsWithChildren } from "react";
interface DialogWrapperProps {
  open: boolean
}
export const DialogWrapper: React.FC<DialogWrapperProps & PropsWithChildren> = ({open, children}) => {
  const navigate = useNavigate();
  // 1. Check if the current path matches our dialog pattern (/countries/:id)

  const closeModal = () => {
    // 2. To close the modal, navigate back to the home page (the route beneath the dialog)
    navigate("/");
  };

  return (
    <DialogOrDrawer onClose={closeModal} open={open}>
      {/* These routes are only rendered when the URL matches a dialog path */}
    {children}
    </DialogOrDrawer>
  );
};

