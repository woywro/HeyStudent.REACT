import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useForm } from "react-hook-form";
import MobileStepper from "@mui/material/MobileStepper";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Container } from "@mui/material";
import { PageTopBar } from "../../components/PageTopBar";
import { CourseInfoAdd } from "./components/CourseInfoAdd";
import { CourseSubjectsAdd } from "./components/CourseSubjectsAdd";
import { CourseSubmit } from "./components/CourseSubmit";

export const Add = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [newCourse, setNewCourse] = useState();
  const [newSubjects, setNewSubjects] = useState([]);
  const [selectedVal, setSelectedVal] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    register: registerSubjects,
    handleSubmit: handleSubmitSubjects,
    formState: { errors: errorsSubjects },
  } = useForm();
  const onSubmit = (data) => {
    setNewCourse(data);
    console.log(newCourse);
    handleNext();
  };

  const onSubmitSubjects = (data) => {
    setNewSubjects([...newSubjects, data]);
    console.log(newSubjects);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function createTags(tags, nc) {
    tags.push(nc.city.toLowerCase());
    tags.push(nc.name.join(" ").toLowerCase());
    var result1 = tags.flatMap((v, i) =>
      tags.slice(i + 1).map((w) => v + " " + w)
    );
    var result2 = tags.flatMap((v, i) =>
      tags.slice(i + 1).map((w) => w + " " + v)
    );
    const result = result1.concat(result2);
    result.push(nc.city.toLowerCase());
    result.push(nc.name.join(" ").toLowerCase());
    result.push(nc.university.toLowerCase());
    result.push(nc.category.toLowerCase());
    return result;
  }

  function handleSubmitAll() {
    const random = Math.floor(Math.random() * 100000);
    const nc = newCourse;
    nc.subjects = newSubjects;
    nc.name = nc.name.split(" ");
    nc.requiredSubjects = nc.requiredSubjects.split(",");
    nc.tags = createTags(nc.tags.split(","), nc);
    nc.id = random.toString();
    nc.message = selectedVal;
    nc.category = [nc.category];
    nc.minPoints = { value: nc.minPoints, year: "2021/2022" };
    nc.willStudy = [];
    nc.willStudyCount = 0;
    setDoc(doc(db, "Courses", random.toString()), newCourse);
  }

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column",
        padding: 0,
        width: "100vw",
        height: "100%",
      }}
    >
      <PageTopBar
        content={
          <Paper
            elevation={3}
            sx={{
              padding: 1,
              marginBottom: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MobileStepper
              variant="progress"
              steps={3}
              position="static"
              activeStep={activeStep}
              sx={{ maxWidth: 400, flexGrow: 1 }}
              nextButton={
                <Button
                  size="small"
                  onClick={() => {
                    handleSubmit(onSubmit)();
                  }}
                  disabled={activeStep === 2}
                >
                  Dalej
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  disabled={isDisabled}
                >
                  Wstecz
                </Button>
              }
            />
          </Paper>
        }
      />

      {activeStep == 0 && (
        <CourseInfoAdd
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      )}
      {activeStep == 1 && (
        <CourseSubjectsAdd
          newSubjects={newSubjects}
          setNewSubjects={setNewSubjects}
          registerSubjects={registerSubjects}
          handleSubmitSubjects={handleSubmitSubjects}
          onSubmitSubjects={onSubmitSubjects}
        />
      )}
      {activeStep == 2 && (
        <CourseSubmit
          setSelectedVal={setSelectedVal}
          isDisabled={isDisabled}
          setDisabled={setDisabled}
          setSent={setSent}
          handleSubmitAll={handleSubmitAll}
          sent={sent}
        />
      )}
    </Container>
  );
};