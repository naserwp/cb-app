import React from "react";

function DocumentPreview({ chargebackData, updateData, removeData }) {
  return (
    <div>
      <h2>Preview</h2>
      {chargebackData.map((data, index) => (
        <div key={index}>
          <p>Date: {data.date}</p>
          <p>Merchant Name: {data.merchantName}</p>
          <p>Cardholder Name: {data.cardholderName}</p>
          <p>Transaction ID: {data.transactionId}</p>
          <p>Amount: {data.amount}</p>
          <p>Reason: {data.reason}</p>
          <p>Chargeback Amount: {data.chargebackAmount}</p>
          <button onClick={() => removeData(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default DocumentPreview;
