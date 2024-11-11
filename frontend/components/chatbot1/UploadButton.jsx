import React, { useState } from "react";
import Modal from "react-modal";

const UploadButton = (props) => {

  const buttonsMarkup = options.map((option) => (
    <>
      <button
        key={option.id}
        onClick={openModal}
        className={`text-white border-none px-4 py-2 rounded ${paymentSuccess ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 cursor-pointer'}`}
        disabled={paymentSuccess}
      >
        {option.text}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Payment Form"
        className="modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <h2>Payment Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Amount: </label>
            <input type="text" disabled value={"RM 20,000"} />
          </div>
          <div>
            <label>Credit/Debit Card Number</label>
            <input
              type="text"
              id="CardNumber"
              name="CardNumber"
              required
              autoComplete="on"
              value={"****-****-****-****"}
            />
          </div>
          <div>
            <label>Expiry Date</label>
            <input
              type="text"
              id="ExpiryDate"
              name="ExpiryDate"
              required
              autoComplete="on"
              value={"09/29"}
            />
          </div>
          <div>
            <label>CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              required
              autoComplete="on"
              value={"***"}
            />
          </div>
          <button type="submit">Submit Payment</button>
          <button
            type="button"
            onClick={cancelModal}
            className="close-button my-2"
          >
            Cancel
          </button>
        </form>
      </Modal>
      {modalClosed && (
        <div className="payment-success">Payment Successful!</div>
      )}
      {paymentCancel && (
        <div className="payment-cancel">Payment Failed! Please try again</div>
      )}
    </>
  ));

  return <div className={styles.optionButton}>{buttonsMarkup}</div>;
};

export default UploadButton;
