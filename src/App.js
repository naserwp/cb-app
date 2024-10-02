import React, { useState } from "react";
import InputForm from "./components/InputForm";
import DocumentPreview from "./components/DocumentPreview";
import DocumentGenerator from "./components/DocumentGenerator";

function App() {
  const [chargebackData, setChargebackData] = useState([]);

  const addData = (newData) => {
    setChargebackData([...chargebackData, newData]);
  };

  const updateData = (index, updatedData) => {
    const newData = chargebackData.map((data, i) =>
      i === index ? updatedData : data
    );
    setChargebackData(newData);
  };

  const removeData = (index) => {
    const newData = chargebackData.filter((_, i) => i !== index);
    setChargebackData(newData);
  };

  return (
    <div className="App">
      <h1>Chargeback Document Generator</h1>
      <InputForm addData={addData} />
      <DocumentPreview
        chargebackData={chargebackData}
        updateData={updateData}
        removeData={removeData}
      />
      <DocumentGenerator chargebackData={chargebackData} />
    </div>
  );
}

export default App;
