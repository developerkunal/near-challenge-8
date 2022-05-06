import React, { useEffect, useState } from "react";
import {
  Card,
  Dropdown,
  Row,
  Col,
  ListGroup,
  DropdownButton,
  ButtonGroup,
  Button
} from "react-bootstrap";
import Big from "big.js";
const BN = require("bn.js");

const Incomming = (props) => {
  const [incommingstreams, setincommingstreams] = useState([]);
  const withdraw = async (i) => {
    await window.contract2.withdraw(
      {
        stream_ids: [i],
      },
      200000000000000,
      new BN("1")
    );
  };
  useEffect(() => {
    const incommingstream = async () => {
      if (window.accountId !== "") {
        setincommingstreams(
          await window.contract2
            .get_account_incoming_streams({
              account_id: `${window.accountId}`,
              from: 0,
              limit: 10,
            })
            .then((res) => {
              return res;
            })
            .catch((error) => {
              return;
            })
        );
      }
    };
    incommingstream();
  }, []);
  console.log(incommingstreams);
  return (
    <>
      <Row xs={1} md={2} className="g-4">
        {incommingstreams &&
          incommingstreams.map((val) => {
            return (
              <Col key={val.id}>
                <Card className="text-center">
                  <Card.Header> Owner ID : {val.owner_id}</Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        balance :{" "}
                        {Big(val.balance)
                          .div(10 ** 24)
                          .toFixed()}{" "}
                        Wnear
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Transfer Per second :
                        {Big(val.tokens_per_sec)
                          .div(10 ** 24)
                          .toFixed()}{" "}
                        Wnear
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Withdrawn Tokens:
                        {Big(val.tokens_total_withdrawn)
                          .div(10 ** 24)
                          .toFixed()}{" "}
                        Wnear
                      </ListGroup.Item>
                      <ListGroup.Item>Status : {val.status}</ListGroup.Item>
                      <ListGroup.Item>
                        {" "}
                       {val.status!='Paused' ? <DropdownButton
                          as={ButtonGroup}
                          title="Options"
                          id="bg-vertical-dropdown-1"
                        >
                          {
                            <Dropdown.Item
                              eventKey="1"
                              onClick={withdraw.bind(null, val.id)}
                            >
                              Withdraw
                            </Dropdown.Item>
                          }
                        </DropdownButton>:<Button disabled>Withdrawls Paused</Button>}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    Updated Time :
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }).format(Math.round(val.last_action / 1000000))}
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
      </Row>
    </>
  );
};
Incomming.propTypes = {};

export default Incomming;
