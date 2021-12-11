import { Paper } from "@mui/material";
import { dataContext } from "../../../App";
import { useContext, useState } from "react";
import { NameSearch } from "./NameSearch";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import useMediaQuery from "@mui/material/useMediaQuery";

export const SearchBar = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const context = useContext(dataContext);
  const [sort, setSort] = useState("random");

  const handleInputChange = (e) => {
    setSort(e.target.value);
    sortList(e.target.value);
  };

  const sortList = (sort) => {
    if (sort == "alphabetical") {
      const sorted = JSON.parse(
        JSON.stringify(context.searched.sort((a, b) => b.name[0] < a.name[0]))
      );
      context.setSearched(sorted);
    } else if (sort == "popularity") {
      const sorted = JSON.parse(
        JSON.stringify(
          context.searched.sort(
            (a, b) => b.willStudy.length - a.willStudy.length
          )
        )
      );
      context.setSearched(sorted);
    } else if (sort == "random") {
      const shuffledArray = JSON.parse(
        JSON.stringify(context.searched.sort((a, b) => 0.5 - Math.random()))
      );
      context.setSearched(shuffledArray);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 1.5,
        borderRadius: 3,
        width: matches ? 0.8 : 1,
        marginBottom: 3,
      }}
    >
      <NameSearch />
      {context.isSearching && (
        <ToggleButtonGroup
          value={sort}
          exclusive
          size="small"
          sx={{ marginTop: 2 }}
          onChange={handleInputChange}
        >
          <ToggleButton value="random">trafność</ToggleButton>
          <ToggleButton value="alphabetical">alfabetycznie</ToggleButton>
          <ToggleButton value="popularity">popularność</ToggleButton>
        </ToggleButtonGroup>
      )}
    </Paper>
  );
};