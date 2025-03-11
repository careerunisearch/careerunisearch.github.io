import React from "react";
import { useState } from "react";
import "./Home.css";
import Slider from "../Slider";
import FilterSearch from "../FilterSearch";
import TableContent from "../TableContent";

function Home() {
  const [selectedProvinces, setSelectedProvinces] = useState(["1"]);
  const [selectedType, SetSelectedType] = useState(["0"]);
  const [selectedMajor, SetSelectedMajor] = useState(["0"]);
  const [selectedExamBlock, SetSelectedExamBlock] = useState(["0"]);
  const [selectedYear, SetSelectedYear] = useState(["1"]);
  const [selectedMethod, SetSelectedMethod] = useState(["0"]);
  const [selectedTuition, SetSelectedTuition] = useState([]);
  const [selectedScore, SetSelectedScore] = useState([]);
  const [selectedCode, SetSelectedCode] = useState([]);
  const [resetAction, SetResetAction] = useState(true);

  const handleProvinceChange = (selectedValues) => {
    setSelectedProvinces(selectedValues); // Cập nhật state
  };
  const handleTypeChange = (selectedValues) => {
    SetSelectedType(selectedValues); // Cập nhật state
  };
  const handleMajorChange = (selectedValues) => {
    SetSelectedMajor(selectedValues); // Cập nhật state
  };
  const handleExamBlockChange = (selectedValues) => {
    SetSelectedExamBlock(selectedValues); // Cập nhật state
  };
  const handleYearChange = (selectedValues) => {
    SetSelectedYear(selectedValues); // Cập nhật state
  };
  const handleMethodChange = (selectedValues) => {
    SetSelectedMethod(selectedValues); // Cập nhật state
  };
  const handleTuitionChange = (selectedValues) => {
    SetSelectedTuition(selectedValues); // Cập nhật state
  };
  const handleScoreChange = (selectedValues) => {
    SetSelectedScore(selectedValues); // Cập nhật state
  };
  const handleCodeChange = (selectedValues) => {
    SetSelectedCode(selectedValues); // Cập nhật state
  };

  return (
    <div>
      <Slider />
      <FilterSearch
        appHandleProvinceChange={handleProvinceChange}
        appHandleTypeChange={handleTypeChange}
        appHandleMajorChange={handleMajorChange}
        appHandleExamBlockChange={handleExamBlockChange}
        appHandleYearChange={handleYearChange}
        appHandleMethodChange={handleMethodChange}
        appHandleTuitionChange={handleTuitionChange}
        appHandleScoreChange={handleScoreChange}
        appHandleCodeChange={handleCodeChange}
      />
      <TableContent
        filterProvinces={selectedProvinces}
        filterType={selectedType}
        filterMajor={selectedMajor}
        filterExamBlock={selectedExamBlock}
        filterYear={selectedYear}
        filterMethod={selectedMethod}
        filterTuition={selectedTuition}
        filterScore={selectedScore}
        filterCode={selectedCode}
      />
    </div>
  );
}

export default Home;
