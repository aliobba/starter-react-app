import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function IconLabelButtons({ children, startIcon, onClick }: { children: any, startIcon: React.ReactNode, onClick: React.MouseEventHandler<HTMLButtonElement> }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" startIcon={startIcon} onClick={onClick}>
        {children}
      </Button>
    </Stack>
  );
}
