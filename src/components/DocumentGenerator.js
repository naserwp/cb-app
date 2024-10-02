import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Ensure this is installed if you plan to use it
import logo from "../logo.jpeg"; // Ensure the correct path to your logo

function DocumentGenerator({ chargebackData }) {
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4", // A4 size
      putOnlyUsedFonts: true,
      floatPrecision: 16,
    });

    // Add Company Logo
    doc.addImage(logo, "JPEG", 10, 10, 50, 20); // Logo position and size
    doc.setDrawColor(255, 255, 0); // Yellow color
    doc.setLineWidth(5);
    doc.line(10, 35, 200, 35); // Draw the line

    // Title Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Chargeback Dispute Document", 10, 45);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 55);

    // Add a line break
    doc.setLineWidth(1);
    doc.line(10, 60, 200, 60); // Draw the line

    let yPosition = 65; // Starting position for content

    chargebackData.forEach((data, index) => {
      // Add a new page if the content exceeds A4 height
      if (yPosition > 250 && index > 0) {
        doc.addPage();
        yPosition = 10; // Reset yPosition for new page
        doc.addImage(logo, "JPEG", 10, 10, 50, 20); // Add logo again on the new page
        doc.text("Chargeback Dispute Document", 10, 45);
        doc.setFontSize(12);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 55);
        doc.setLineWidth(1);
        doc.line(10, 60, 200, 60); // Draw the line
        yPosition = 65; // Reset yPosition for content
      }

      // Content Section
      doc.setFont("helvetica", "bold");
      doc.text(
        `Chargeback Details for Transaction ID: ${data.transactionId}`,
        10,
        yPosition
      );
      yPosition += 10;

      doc.setFont("helvetica", "normal");
      doc.text(`Merchant Name: ${data.merchantName}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Cardholder Name: ${data.cardholderName}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Transaction Date: ${data.transactionDate}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Transaction Amount: $${data.transactionAmount}`, 10, yPosition);
      yPosition += 10;
      doc.text(
        `Card Number (Last 4 Digits): ${data.cardNumber}`,
        10,
        yPosition
      );
      yPosition += 10;
      doc.text(`Chargeback Amount: $${data.chargebackAmount}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Reason: ${data.reason}`, 10, yPosition);
      yPosition += 10;

      // Add the letter to the customer
      doc.setFont("helvetica", "bold");
      doc.text(`Dear ${data.cardholderName},`, 10, yPosition);
      yPosition += 10;
      doc.setFont("helvetica", "normal");
      doc.text(
        `We are writing to formally dispute a chargeback raised, under the reason "${data.reason}".`,
        10,
        yPosition
      );
      yPosition += 10;
      doc.text(
        `The details of the disputed transaction are as follows:`,
        10,
        yPosition
      );
      yPosition += 10;
      doc.text(`Transaction Date: ${data.transactionDate}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Transaction Amount: $${data.transactionAmount}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Chargeback Reason: ${data.reason}`, 10, yPosition);
      yPosition += 10;
      doc.text(
        `Customer/Cardholder Name: ${data.cardholderName}`,
        10,
        yPosition
      );
      yPosition += 10;
      doc.text(`Transaction ID: ${data.transactionId}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Order Description: ${data.orderDescription}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Chargeback Amount: $${data.chargebackAmount}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Chargeback Code: ${data.chargebackCode}`, 10, yPosition);
      yPosition += 10;
      doc.text(
        `We have thoroughly reviewed the case and gathered evidence that supports the validity of the transaction.`,
        10,
        yPosition
      );
      yPosition += 10;
      doc.text(
        `Please find the following information attached as part of our dispute:`,
        10,
        yPosition
      );
      yPosition += 10;
      doc.text(`Proof of Service/Product Delivery:`, 10, yPosition);
      yPosition += 10;
      doc.text(`Customer Communication:`, 10, yPosition);
      yPosition += 10;
      doc.text(`Terms and Conditions: https://factiiv.io/terms`, 10, yPosition);
      yPosition += 10;
      doc.text(
        `Privacy Policy: https://factiiv.io/privacy-policy`,
        10,
        yPosition
      );
      yPosition += 10;
      doc.text(
        `Refund Policy: https://factiiv.io/refund-policy`,
        10,
        yPosition
      );
      yPosition += 10;
      doc.text(
        `We believe that the chargeback is unwarranted and the transaction was completed in full compliance with the customer’s order and our policies.`,
        10,
        yPosition
      );
      yPosition += 10;
      doc.text(
        `Please feel free to reach out if any additional information or clarification is required.`,
        10,
        yPosition
      );
      yPosition += 10;
      doc.text(`Thank you for your assistance.`, 10, yPosition);
      yPosition += 10;
      doc.text(`Sincerely,`, 10, yPosition);
      yPosition += 10;
      doc.text(`Factiiv Team`, 10, yPosition);
      yPosition += 10;
      doc.text(`support@factiiv.io`, 10, yPosition);
      yPosition += 10;
      doc.text(`(888) 820-8440`, 10, yPosition);
      yPosition += 10;
    });

    // Save the PDF
    doc.save("chargeback-document.pdf");
  };

  return (
    <div>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
}

export default DocumentGenerator;
