import { Dialog, Drawer } from "@mui/material";
import { useIsSmall } from "../hooks/useIsSmall";
import type { PropsWithChildren } from "react";
interface DialogOrDrawerProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
}
export const DialogOrDrawer: React.FC<DialogOrDrawerProps> = ({
  open,
  onClose,
  children,
}) => {
  const isSmall = useIsSmall();
  if (!isSmall) {
    return (
      <Dialog scroll={'paper'} open={open} onClose={onClose}>
        {children}
      </Dialog>
    );
  } else {
    return (
      <Drawer
        slotProps={{
          paper: {
            sx: {
              // Example: Full height minus 100px
              height: "calc(100%)",
              // Example: Start 100px from the top
            },
          },
        }}
        anchor="bottom"
        onClose={onClose}
        open={open}
      >
        {children}
      </Drawer>
    );
  }
};
