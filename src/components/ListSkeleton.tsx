import { Skeleton, Stack } from "@mui/material";

export const ListSkeleton: React.FC = () => {
  const rows = Array(10)
    .fill("")
    .map((_, i) => <Skeleton key={i} height={"40px"} variant="text" />);
  return <Stack>{rows}</Stack>;
};
