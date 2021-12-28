import { List } from "./components/List";
import { SearchBar } from "../../views/Search/components/SearchBar";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { HomeList } from "./components/HomeList";
import { PageTopBar } from "../../components/PageTopBar";
import { useSearchContext } from "../../context/searchContext";

export const Home = () => {
  const { searched } = useSearchContext();
  return (
    <Container
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column",
        padding: 0,
        width: "100vw",
      }}
    >
      <PageTopBar
        content={
          <>
            <Typography
              sx={{ marginBottom: 1, width: 1, color: "white" }}
              variant="h4"
            >
              Wyszukaj kierunek
            </Typography>
            <SearchBar />
          </>
        }
      />

      {/* {searched !== [] ? <HomeList /> : <List />} */}
      <HomeList />
    </Container>
  );
};
