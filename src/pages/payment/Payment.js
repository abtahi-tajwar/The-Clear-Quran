import Navbar from "../../components/Navbar";
import styled from "styled-components";
import { Container, Grid } from "../../Style.style";
import { css } from "@emotion/react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { headers, routes } from "../../routes";
import axios from "axios";

function Payment() {
  const override = css`
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
  `;

  let user = localStorage.getItem("user");

  const updatePayment = (amount, id) => {
    let body = {
      userId: user.userId,
      isPaid: true,
      paidAmount: amount,
      transactionId: id,
    };

    axios
      .post(routes.registerUser, body, {
        headers: headers,
      })
      .then((res) => {
        window.location.href = "/";
      });
  };

  return (
    <Wrapper>
      <Navbar />
      <Container style={{ marginTop: "30px" }}>
        <Grid width="300px" gap="30px" height={"100%"}>
          <PayPalScriptProvider options={{ "client-id": "test" }}>
            <PayPalButtons
              style={{ layout: "horizontal" }}
              createOrder={(data, actions) => {
                return actions.order
                  .create({
                    purchase_units: [
                      {
                        amount: {
                          value: "4.99",
                        },
                      },
                    ],
                  })
                  .then((orderId) => {
                    // Your code here after create the order
                    return orderId;
                  });
              }}
              onApprove={function (data, actions) {
                return actions.order.capture().then(function (details) {
                  // Your code here after capture the order
                  updatePayment(details.purchase_units[0].payments.captures[0].amount.value, details.id);
                });
              }}
            />
          </PayPalScriptProvider>
        </Grid>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

export default Payment;
