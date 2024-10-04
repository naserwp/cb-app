// import React, { useRef } from "react";
// import html2pdf from "html2pdf.js";
// import logo from "../logo.jpeg"; // Ensure the correct path to your logo

// function DocumentGenerator({ chargebackData }) {
//   const pdfRef = useRef();

//   const generatePDF = () => {
//     const element = pdfRef.current;

//     const options = {
//       margin: 1,
//       filename: "chargeback-document.pdf",
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//     };

//     // Use html2pdf to convert the element to PDF
//     html2pdf().from(element).set(options).save();
//   };

//   return (
//     <div>
//       <button onClick={generatePDF}>Download PDF</button>
//       <div
//         ref={pdfRef}
//         style={{
//           display: "block",
//           padding: "20px",
//           fontFamily: "Arial, sans-serif",
//         }}
//       >
//         <div style={{ textAlign: "center" }}>
//           <img
//             src={logo}
//             alt="Company Logo"
//             style={{ width: "150px", marginBottom: "10px" }}
//           />
//           <hr style={{ borderTop: "3px solid yellow", margin: "10px 0" }} />
//           <h2 style={{ margin: "0", fontSize: "24px" }}>
//             Chargeback Dispute Document
//           </h2>
//           <p style={{ margin: "0", fontSize: "14px" }}>
//             {new Date().toLocaleDateString()}
//           </p>
//         </div>
//         <br />

//         {chargebackData.map((data, index) => (
//           <div
//             key={index}
//             style={{
//               marginBottom: "30px",
//               border: "1px solid #ccc",
//               padding: "15px",
//             }}
//           >
//             <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
//               Chargeback Details
//             </h3>
//             <p>
//               <strong>Date:</strong> {data.date}
//             </p>
//             <p>
//               <strong>Merchant Name:</strong> {data.merchantName}
//             </p>
//             <p>
//               <strong>Cardholder Name:</strong> {data.cardholderName}
//             </p>
//             <p>
//               <strong>Transaction Date:</strong> {data.transactionDate}
//             </p>
//             <p>
//               <strong>Transaction Amount:</strong> ${data.transactionAmount}
//             </p>
//             <p>
//               <strong>Card Number (Last 4 Digits):</strong> {data.cardNumber}
//             </p>
//             <p>
//               <strong>Chargeback Amount:</strong> ${data.chargebackAmount}
//             </p>
//             <p>
//               <strong>Reason:</strong> {data.reason}
//             </p>

//             {/* Letter to Customer */}
//             <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
//               Dear {data.cardholderName},
//             </h3>
//             <p>
//               We are writing to formally dispute a chargeback raised, under the
//               reason "{data.reason}".
//               <br />
//               The details of the disputed transaction are as follows:
//               <br />
//               <strong>Transaction Date:</strong> {data.transactionDate}
//               <br />
//               <strong>Transaction Amount:</strong> ${data.transactionAmount}
//               <br />
//               <strong>Chargeback Reason:</strong> {data.reason}
//               <br />
//               <strong>Customer/Cardholder Name:</strong> {data.cardholderName}
//               <br />
//               <strong>Transaction ID:</strong> {data.transactionId}
//               <br />
//               <strong>Order Description:</strong> {data.orderDescription}
//               <br />
//               <strong>Chargeback Amount:</strong> ${data.chargebackAmount}
//               <br />
//               <strong>Chargeback Code:</strong> {data.chargebackCode}
//               <br />
//               We have thoroughly reviewed the case and gathered evidence that
//               supports the validity of the transaction.
//               <br />
//               Please find the following information attached as part of our
//               dispute:
//               <br />
//               <strong>Proof of Service/Product Delivery:</strong>
//               <br />
//               <strong>Customer Communication:</strong>
//               <br />
//               Terms and Conditions: https://factiiv.io/terms
//               <br />
//               Privacy Policy: https://factiiv.io/privacy-policy
//               <br />
//               Refund Policy: https://factiiv.io/refund-policy
//               <br />
//               We believe that the chargeback is unwarranted and the transaction
//               was completed in full compliance with the customer’s order and our
//               policies.
//               <br />
//               Please feel free to reach out if any additional information or
//               clarification is required.
//               <br />
//               Thank you for your assistance.
//               <br />
//               Sincerely,
//               <br />
//               Factiiv Team
//               <br />
//               support@factiiv.io
//               <br />
//               (888) 820-8440
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DocumentGenerator;
import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import logo from "../logo.jpeg"; // Ensure the correct path to your logo

function DocumentGenerator({ chargebackData }) {
  const pdfRef = useRef();

  const generatePDF = () => {
    const element = pdfRef.current;

    // Get the first chargeback entry for filename
    const firstEntry = chargebackData[0];
    const customerName = firstEntry.cardholderName.replace(
      /[^a-zA-Z0-9]/g,
      "_"
    ); // Sanitize customer name
    const transactionId = firstEntry.transactionId;
    const filename = `chargeback_${customerName}_${transactionId}.pdf`; // Generate filename

    const options = {
      margin: 1,
      filename: filename, // Use dynamic filename
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Use html2pdf to convert the element to PDF
    html2pdf().from(element).set(options).save();
  };

  return (
    <div>
      <button onClick={generatePDF}>Download PDF</button>
      <div
        ref={pdfRef}
        style={{
          display: "block",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src={logo}
            alt="Company Logo"
            style={{ width: "150px", marginBottom: "10px" }}
          />
          <hr style={{ borderTop: "3px solid yellow", margin: "10px 0" }} />
          <h2 style={{ margin: "0", fontSize: "24px" }}>
            Chargeback Dispute Document
          </h2>
          <p style={{ margin: "0", fontSize: "14px" }}>
            {new Date().toLocaleDateString()}
          </p>
        </div>
        <br />

        {chargebackData.map((data, index) => (
          <div
            key={index}
            style={{
              marginBottom: "30px",
              border: "1px solid #ccc",
              padding: "15px",
              pageBreakInside: "avoid", // Ensure the section doesn’t break within itself
            }}
          >
            <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
              Chargeback Details
            </h3>
            <p>
              <strong>Date:</strong> {data.date}
            </p>
            <p>
              <strong>Merchant Name:</strong> {data.merchantName}
            </p>
            <p>
              <strong>Cardholder Name:</strong> {data.cardholderName}
            </p>
            <p>
              <strong>Transaction Date:</strong> {data.transactionDate}
            </p>
            <p>
              <strong>Transaction Amount:</strong> ${data.transactionAmount}
            </p>
            <p>
              <strong>Card Number (Last 4 Digits):</strong> {data.cardNumber}
            </p>
            <p>
              <strong>Chargeback Amount:</strong> ${data.chargebackAmount}
            </p>
            <p>
              <strong>Reason:</strong> {data.reason}
            </p>

            {/* Add padding to ensure space before the page break */}
            <div style={{ paddingBottom: "20px" }}></div>

            {/* Page break to start the letter on the second page */}
            <div style={{ pageBreakAfter: "always", marginTop: "40px" }}></div>

            {/* Letter to Customer */}
            <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
              Dear {data.cardholderName},
            </h3>
            <p>
              We are writing to formally dispute a chargeback raised, under the
              reason "{data.reason}".
              <br />
              The details of the disputed transaction are as follows:
              <br />
              <strong>Transaction Date:</strong> {data.transactionDate}
              <br />
              <strong>Transaction Amount:</strong> ${data.transactionAmount}
              <br />
              <strong>Chargeback Reason:</strong> {data.reason}
              <br />
              <strong>Customer/Cardholder Name:</strong> {data.cardholderName}
              <br />
              <strong>Transaction ID:</strong> {data.transactionId}
              <br />
              <strong>Order Description:</strong> {data.orderDescription}
              <br />
              <strong>Chargeback Amount:</strong> ${data.chargebackAmount}
              <br />
              <strong>Chargeback Code:</strong> {data.chargebackCode}
              <br />
              We have thoroughly reviewed the case and gathered evidence that
              supports the validity of the transaction.
              <br />
              Please find the following information attached as part of our
              dispute:
              <br />
              <br />
              <strong>Proof of Service/Product Delivery:</strong>
              <br />
              <strong>Customer Communication:</strong>
              <br />
              Terms and Conditions: https://factiiv.io/terms
              <br />
              Privacy Policy: https://factiiv.io/privacy-policy
              <br />
              Refund Policy: https://factiiv.io/refund-policy
              <br />
              We believe that the chargeback is unwarranted and the transaction
              was completed in full compliance with the customer’s order and our
              policies.
              <br />
              Please feel free to reach out if any additional information or
              clarification is required.
              <br />
              Thank you for your assistance.
              <br />
              Sincerely,
              <br />
              Factiiv Team
              <br />
              support@factiiv.io
              <br />
              (888) 820-8440
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocumentGenerator;
