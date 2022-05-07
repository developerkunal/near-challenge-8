import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Alert,
  InputGroup,
  Nav,
  ListGroup,

} from "react-bootstrap";
import { keys } from "regenerator-runtime";
import Big from "big.js";

const BN = require("bn.js");

const Creating = (props) => {
  const [state, setState] = React.useState({
    reciverid: "",
    memo: "",
    amount: 1,
    formError: "",
  });
  const create = async () => {
    if (state.reciverid !== "" && state.amount >= 1) {
      await window.contract.ft_transfer_call(
        {
          amount: `${Big(state.amount)
            .times(10 ** 24)
            .toFixed()}`, // 1 NEAR
          receiver_id: "streaming-r-v2.dcversus.testnet",

          memo: `${state.memo}` || "",
          msg: JSON.stringify({
            Create: {
              request: {
                owner_id: `${window.accountId}`,
                receiver_id: `${state.reciverid}.testnet`,
                tokens_per_sec: parseInt(
                  `${Big(385802469135802469).times(state.amount).toFixed()}`
                ), // 1 month for 1 NEAR
              },
            },
          }),
        },
        200000000000000,
        new BN("1")
      );
    } else {
      setState({
        ...state,
        ["formError"]:
          "Reciever Field is Required & Amount Should be Greater than 1 Near",
      });
    }
  };
  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }
console.log(state.radio)
  return (
    <Card style={{ padding: "2vh" }}>
      <Container>
        <Row style={{ marginBottom: "2vh" }}>
          <Alert>
            Before you Create a Payout for your Employee Make sure They have
            registered them self or register them by sending some wNear.{" "}
          </Alert>
        </Row>{" "}
        <Row style={{ marginBottom: "2vh" }}>
          <Form.Group className="mb-3" controlId="Name">
            <Form.Label>Reciever Name</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={state.reciverid}
                name="reciverid"
                onChange={handleChange}
                required
              />
              <InputGroup.Text id="basic-addon2">.testnet</InputGroup.Text>
            </InputGroup>
            <Form.Label>Memo</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Memo (Optional)"
                aria-label="Memo"
                aria-describedby="basic-addon2"
                value={state.memo}
                name="memo"
                onChange={handleChange}
              />
            </InputGroup>
           
            <br/>
            <Form.Label>Reciever's Amount in a Month</Form.Label>

            <InputGroup className="mb-3">
              <input
                className="form-control"
                type="number"
                name="amount"
                value={state.amount}
                min={1}
                max={Big(props.balance)
                  .div(10 ** 24)
                  .toFixed()}
                step={0.1}
                onChange={handleChange}
              />

              <InputGroup.Text id="basic-addon2">wNear</InputGroup.Text>
            </InputGroup>
          </Form.Group>{" "}
          {state.formError && <p style={{ color: "red" }}>{state.formError}</p>}{" "}
        </Row>
        <Row>
          <ListGroup as="ul">
            <ListGroup.Item as="li" active>
              Calculations : -{" "}
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Pay Per Second : -{" "}
              {state.amount &&
                Big(385802469135802469)
                  .times(state.amount)
                  .div(10 ** 24)
                  .toFixed()}
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Pay Per Minute : -{" "}
              {state.amount &&
                Big(385802469135802469)
                  .times(state.amount)
                  .div(10 ** 24)
                  .times(60)
                  .toFixed()}
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Pay Per Hour : -{" "}
              {state.amount &&
                Big(385802469135802469)
                  .times(state.amount)
                  .div(10 ** 24)
                  .times(3600)
                  .toFixed()}
            </ListGroup.Item>
          </ListGroup>
        </Row>
        <Row className="d-flex justify-content-center">
          <Button
            onClick={create}
            style={{ width: "50vw" }}
            disabled={
              Big(props.balance)
                .div(10 ** 24)
                .toFixed() < 1
            }
          >
            Create Payout
          </Button>
        </Row>
        <Row className="d-flex justify-content-center"></Row>
      </Container>
    </Card>
  );
};

Creating.propTypes = {};

export default Creating;
