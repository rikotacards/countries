import { Box, IconButton } from "@mui/material";
import { useAddCity } from "../hooks/mutations/useAddCity";
import { useDeleteCity } from "../hooks/mutations/useDeleteCity";
import { useCitiesVisited } from "../hooks/queries/useCitiesVisited";
import {
  LocationRowLayout,
  type LocationRowLayoutProps,
} from "./LocationRowLayout";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { CheckCircle } from "@mui/icons-material";

interface CityRow extends LocationRowLayoutProps {
  geonameid: string;
  countryCode: string;
}
export const CityRow: React.FC<CityRow> = ({
  geonameid,
  countryCode,
  locationName
}) => {
  const visited = useCitiesVisited();
  const add = useAddCity();
  const remove = useDeleteCity();
  
   const onAdd = (geonameid: string) => {
      add.mutateAsync(geonameid);
    };
    const onRemove = (geonameid: string) => {
      remove.mutateAsync(geonameid);
    };
  const hasVisited = visited(countryCode).data?.find((v) => {
    return v.geonameid == geonameid;
  });
  return (
    <LocationRowLayout
      icon={<LocationCityIcon />}
      key={geonameid}
      onClick={() => {
                  if (hasVisited) {
                    onRemove(geonameid);
                  } else {
                    onAdd(geonameid);
                    // onAdd(countryCode);
                  }
                }}
      locationName={locationName}
      disableMore
      buttons={
            <Box>
              <IconButton
                onClick={() => {
                  if (hasVisited) {
                    onRemove(geonameid);
                  } else {
                    onAdd(geonameid);
                    // onAdd(countryCode);
                  }
                }}
              >
                <CheckCircle color={hasVisited ? "success" : undefined} />
              </IconButton>
            </Box>
          }
    />
  );
};
