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
  Tabs,
  Tab,
} from "react-bootstrap";
import { keys } from "regenerator-runtime";
import Big from "big.js";

const BN = require("bn.js");

const Buywnear = (props) => {
  const [state, setState] = React.useState({
    amount: 1,
    reciverid: "",
    formError: "",
  });
  const Buywwner = async () => {
    if (state.amount >= 1) {
      await window.contract.near_deposit(
        {},
        200000000000000,
        new BN(
          Big(state.amount)
            .times(10 ** 24)
            .toFixed()
        )
      );
    } else {
      setState({
        ...state,
        ["formError"]:
          "Amount Should be Greater than 1 Near",
      });
    }
  };
  const sendwnear = async () => {
    if (state.reciverid !== "" && state.amount >= 0.1) {
      await window.contract.ft_transfer(
        {
          receiver_id: `${state.reciverid}.testnet`,
          amount: `${Big(state.amount)
            .times(10 ** 24)
            .toFixed()}`,
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
  return (
    <Tabs defaultActiveKey="buy" id="uncontrolled-tab-example" className="mb-3">
      {" "}
      <Tab eventKey="buy" title="Buy wNear">
        {" "}
        <Card style={{ padding: "2vh" }}>
          <Container>
            <Row style={{ marginBottom: "2vh" }}>
              <Form.Group className="mb-3" controlId="Name">
                <Form.Label>Buy Wnear </Form.Label>

                <InputGroup className="mb-3">
                  <input
                    className="form-control"
                    type="number"
                    name="amount"
                    value={state.amount}
                    min={1}
                    max={ window.accountId &&
                      Big(window.userbalance.total)
                        .div(10 ** 24)
                        .toFixed()}
                    step={0.1}
                    onChange={handleChange}
                  />

                  <InputGroup.Text id="basic-addon2">wNear</InputGroup.Text>
                  <InputGroup className="mb-3">
                    <Form.Label>Avilable Near </Form.Label>
                  </InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    value={
                      window.accountId &&
                      Big(window.userbalance.total)
                        .div(10 ** 24)
                        .toFixed()
                    }
                    disabled
                  />

                  <InputGroup.Text id="basic-addon2">Near</InputGroup.Text>
                </InputGroup>
              </Form.Group>{" "}
            </Row>
            {state.formError && (
              <Alert variant="danger">{state.formError}</Alert>
            )}{" "}
            <Row className="d-flex justify-content-center">
              <Button onClick={Buywwner} style={{ width: "50vw" }}>
                Buy Wnear
              </Button>
            </Row>
            <Row className="d-flex justify-content-center"></Row>
          </Container>
        </Card>
      </Tab>
      <Tab eventKey="send" title="Send wNear">
        <Card style={{ padding: "2vh" }}>
          <Container>
            <Row style={{ marginBottom: "2vh" }}>
              <Form.Group className="mb-3" controlId="Name">
                <Form.Label>Send wNear</Form.Label>
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
                <InputGroup className="mb-3">
                  <input
                    className="form-control"
                    type="number"
                    name="amount"
                    value={state.amount}
                    min={1}
                    max={
                      props.balance &&
                      Big(props.balance)
                        .div(10 ** 24)
                        .toFixed()
                    }
                    step={0.1}
                    onChange={handleChange}
                  />

                  <InputGroup.Text id="basic-addon2">wNear</InputGroup.Text>
                  <InputGroup className="mb-3">
                    <Form.Label>Avilable wNear </Form.Label>
                  </InputGroup>
                  <input
                    className="form-control"
                    type="number"
                    value={
                      props.balance &&
                      Big(props.balance)
                        .div(10 ** 24)
                        .toFixed()
                    }
                    disabled
                  />

                  <InputGroup.Text id="basic-addon2">wNear</InputGroup.Text>
                </InputGroup>
              </Form.Group>{" "}
              {state.formError && (
                <p style={{ color: "red" }}>{state.formError}</p>
              )}{" "}
            </Row>

            <Row className="d-flex justify-content-center">
              <Button onClick={sendwnear} style={{ width: "50vw" }} disabled={ props.balance &&
                      Big(props.balance)
                        .div(10 ** 24)
                        .toFixed()<1}>
                Send Wnear
              </Button>
            </Row>
            <Row className="d-flex justify-content-center"></Row>
          </Container>
        </Card>
      </Tab>
    </Tabs>
  );
};

Buywnear.propTypes = {};

export default Buywnear;
