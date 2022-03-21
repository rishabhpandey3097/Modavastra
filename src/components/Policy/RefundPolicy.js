import React from "react";
import Header from "../Header/Header";

const RefundPolicy = (props) => {
  return (
    <>
      <Header pageName="" headerType="header--home" />
      <div className="policy-container">
        <h1>Return Policy</h1>
        <h2>Last updated March 08, 2022</h2>
        <p>
          Thank you for your purchase. We hope you are happy with your purchase.
          However, if you are not completely satisfied with your purchase for
          any reason, you may return it to us for store credit only. Please see
          below for more information on our return policy.
        </p>
        <h3>Returns</h3>
        <p>
          All returns must be postmarked within seven (7) days of the purchase
          date. All returned items must be in new and unused condition, with all
          original tags and labels attached.
        </p>
        <h3>Return Process</h3>
        <p>
          To return an item, please email customer service at
          services@modavastra.com to obtain a Return Merchandise Authorization
          (RMA) number. After receiving a RMA number, place the item securely in
          its original packaging and In original packaging , and mail your
          return to the following address:
        </p>
        <ul>
          <li>Gandhi Nagar 1112/27</li>
          <li>Attn: Returns</li>
          <li>RMA #</li>
          <li>1112/27 Gandhi Nagar</li>
          <li>Rohtak , Haryana 124001</li>
          <li>India</li>
        </ul>
        <p>Return shipping charges will be paid or reimbursed by us.</p>
        <h3>Refunds</h3>
        <p>
          After receiving your return and inspecting the condition of your item,
          we will process your return. Please allow at least ten (10) days from
          the receipt of your item to process your return. We will notify you by
          email when your return has been processed.
        </p>
        <h3>Exceptions</h3>
        <p>The following items cannot be returned:</p>
        <ul>
          <li>Custom made outfits cannot be returned or exchanged.</li>
        </ul>
        <h3>Plesae Note</h3>
        <ul>
          <li>Sale items are FINAL SALE and cannot be returned.</li>
        </ul>
        <h3>Questions</h3>
        <p>
          If you have any questions concerning our return policy, please contact
          us at:
          <br /> 8398900360 <br /> services@modavastra.com
        </p>
        <p>
          This return policy was created using Termly's Return and Refund Policy
          Generator.
        </p>
      </div>
    </>
  );
};

export default RefundPolicy;
