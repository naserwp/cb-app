// import React, { useState } from "react";

// function InputForm({ addData }) {
//   const [formData, setFormData] = useState({
//     date: "October 2, 2024", // Default date
//     merchantName: "Credit Services", // Default merchant name
//     cardholderName: "",
//     transactionDate: "",
//     transactionAmount: "",
//     cardNumber: "0894", // Last 4 digits default
//     chargebackAmount: "29.95", // Default amount
//     reason: "Consumer Dispute", // Default reason
//     transactionId: "",
//     orderDescription: "",
//     chargebackCode: "", // New field for chargeback code
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addData(formData);
//     setFormData({
//       date: "October 2, 2024",
//       merchantName: "Credit Services",
//       cardholderName: "",
//       transactionDate: "",
//       transactionAmount: "",
//       cardNumber: "0894",
//       chargebackAmount: "29.95",
//       reason: "Consumer Dispute",
//       transactionId: "",
//       orderDescription: "",
//       chargebackCode: "",
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         name="date"
//         value={formData.date}
//         onChange={handleChange}
//         placeholder="Date"
//       />
//       <input
//         name="merchantName"
//         value={formData.merchantName}
//         onChange={handleChange}
//         placeholder="Merchant Name"
//       />
//       <input
//         name="cardholderName"
//         value={formData.cardholderName}
//         onChange={handleChange}
//         placeholder="Cardholder Name"
//       />
//       <input
//         name="transactionDate"
//         value={formData.transactionDate}
//         onChange={handleChange}
//         placeholder="Transaction Date"
//       />
//       <input
//         name="transactionAmount"
//         value={formData.transactionAmount}
//         onChange={handleChange}
//         placeholder="Transaction Amount"
//       />
//       <input
//         name="cardNumber"
//         value={formData.cardNumber}
//         onChange={handleChange}
//         placeholder="Card Number (Last 4 Digits)"
//       />
//       <input
//         name="chargebackAmount"
//         value={formData.chargebackAmount}
//         onChange={handleChange}
//         placeholder="Chargeback Amount"
//       />
//       <input
//         name="reason"
//         value={formData.reason}
//         onChange={handleChange}
//         placeholder="Reason"
//       />
//       <input
//         name="transactionId"
//         value={formData.transactionId}
//         onChange={handleChange}
//         placeholder="Transaction ID"
//       />
//       <input
//         name="orderDescription"
//         value={formData.orderDescription}
//         onChange={handleChange}
//         placeholder="Order Description"
//       />
//       <input
//         name="chargebackCode"
//         value={formData.chargebackCode}
//         onChange={handleChange}
//         placeholder="Chargeback Code"
//       />
//       <button type="submit">Add Data</button>
//     </form>
//   );
// }

// export default InputForm;
import React, { useState, useEffect } from "react";

function InputForm({ addData }) {
  const [formData, setFormData] = useState({
    date: "October 2, 2024",
    merchantName: "Credit Services",
    cardholderName: "",
    transactionDate: "",
    transactionAmount: "",
    cardNumber: "0894",
    chargebackAmount: "29.95",
    reason: "Consumer Dispute",
    transactionId: "",
    orderDescription: "",
    chargebackCode: "",
  });

  const [creditReport, setCreditReport] = useState(null);

  useEffect(() => {
    fetch("https://member.myscoreiq.com/CreditReport.aspx?view=json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Credit Report:", data); // Preview it in console
        setCreditReport(data);
        // Example: If it contains name or card info you want to pre-fill
        if (data.cardholderName) {
          setFormData((prev) => ({
            ...prev,
            cardholderName: data.cardholderName,
          }));
        }
      })
      .catch((err) => console.error("Error fetching credit report:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addData(formData);
    setFormData({
      date: "October 2, 2024",
      merchantName: "Credit Services",
      cardholderName: "",
      transactionDate: "",
      transactionAmount: "",
      cardNumber: "0894",
      chargebackAmount: "29.95",
      reason: "Consumer Dispute",
      transactionId: "",
      orderDescription: "",
      chargebackCode: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {creditReport && (
        <div
          style={{
            marginTop: "20px",
            backgroundColor: "#f9f9f9",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>📄 Credit Report Preview</h3>
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {JSON.stringify(creditReport, null, 2)}
          </pre>
        </div>
      )}

      {/* your input fields remain unchanged */}
      <input
        name="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="Date"
      />
      <input
        name="merchantName"
        value={formData.merchantName}
        onChange={handleChange}
        placeholder="Merchant Name"
      />
      <input
        name="cardholderName"
        value={formData.cardholderName}
        onChange={handleChange}
        placeholder="Cardholder Name"
      />
      <input
        name="transactionDate"
        value={formData.transactionDate}
        onChange={handleChange}
        placeholder="Transaction Date"
      />
      <input
        name="transactionAmount"
        value={formData.transactionAmount}
        onChange={handleChange}
        placeholder="Transaction Amount"
      />
      <input
        name="cardNumber"
        value={formData.cardNumber}
        onChange={handleChange}
        placeholder="Card Number (Last 4 Digits)"
      />
      <input
        name="chargebackAmount"
        value={formData.chargebackAmount}
        onChange={handleChange}
        placeholder="Chargeback Amount"
      />
      <input
        name="reason"
        value={formData.reason}
        onChange={handleChange}
        placeholder="Reason"
      />
      <input
        name="transactionId"
        value={formData.transactionId}
        onChange={handleChange}
        placeholder="Transaction ID"
      />
      <input
        name="orderDescription"
        value={formData.orderDescription}
        onChange={handleChange}
        placeholder="Order Description"
      />
      <input
        name="chargebackCode"
        value={formData.chargebackCode}
        onChange={handleChange}
        placeholder="Chargeback Code"
      />

      <button type="submit">Add Data</button>
    </form>
  );
}

export default InputForm;
