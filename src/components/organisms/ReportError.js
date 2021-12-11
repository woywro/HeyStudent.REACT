import { Stack, Typography } from "@mui/material";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useContext, useCallback } from "react";
import { dataContext } from "../../App";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Paper } from "@mui/material";

export const ReportError = ({ choosen }) => {
  const context = useContext(dataContext);
  const [inputValue, setInputValue] = useState("");

  const [selectValue, setSelectValue] = useState("błąd");

  const handleChange = useCallback((event) => {
    setSelectValue(event.target.value);
    console.log(selectValue);
  }, []);

  const sendError = useCallback(
    async (e) => {
      e.preventDefault();
      const errorsRef = collection(db, "Errors");
      await addDoc(errorsRef, {
        type: selectValue,
        text: inputValue,
        uid: context.user.uid,
        course: choosen.id,
      });
      setInputValue("");
    },
    [inputValue]
  );

  return (
    <Stack
      component="form"
      justifyContent="space-around"
      direction="row"
      alignItems="center"
      onSubmit={sendError}
    >
      {context.user ? (
        <Stack direction="column">
          <Typography variant="body1" sx={{ margin: 1 }}>
            Jeżeli masz jakieś sugestie lub widzisz błąd, daj nam znać!
          </Typography>
          <Select value={selectValue} size="small" onChange={handleChange}>
            <MenuItem value={"błąd"}>błąd</MenuItem>
            <MenuItem value={"tag"}>tag</MenuItem>
          </Select>
          <Paper
            elevation={3}
            sx={{ padding: 1, borderRadius: "20px", margin: 1 }}
          >
            <Stack
              direction="row"
              justifyContent="space-around"
              direction="row"
            >
              <Input
                sx={{ margin: 1 }}
                value={inputValue}
                size="medium"
                fullWidth
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="np. zła liczba ects z matematyki"
              />
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={!inputValue}
              >
                wyślij
              </Button>
            </Stack>
          </Paper>
        </Stack>
      ) : (
        <Typography variant="subtitle1">
          Zaloguj się aby mieć dostęp do tej funkcji
        </Typography>
      )}
    </Stack>
  );
};
