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

const Outgoing = (props) => {
  const [outgoingsteams, setOutgoingstreams] = useState([]);
  const stopstream = async (i) => {
    await window.contract2.stop_stream(
      {
        stream_id: `${i}`,
      },
      200000000000000,
      new BN("1")
    );
  };
  const pausestream = async (i) => {
    await window.contract2.pause_stream(
      {
        stream_id: `${i}`,
      },
      200000000000000,
      new BN("1")
    );
  };
  const startstream = async (i) => {
    await window.contract2.start_stream(
      {
        stream_id: `${i}`,
      },
      200000000000000,
      new BN("1")
    );
  };
  useEffect(() => {
    const outgoingstream = async () => {
      if (window.accountId !== "") {
        setOutgoingstreams(
          await window.contract2
            .get_account_outgoing_streams({
              account_id: `${window.accountId}`,
              from: 0,
              limit: 100,
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
    outgoingstream();
  }, []);
  console.log(outgoingsteams);
  return (
    <>
      <Row xs={1} md={2} className="g-4">
        {outgoingsteams &&
          outgoingsteams.map((val) => {
            return (
              <Col key={val.id}>
                <Card className="text-center">
                  <Card.Header> Reciever ID : {val.receiver_id}</Card.Header>
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
                      <ListGroup.Item>Status : {(typeof val.status!='object') ? val.status:<>Finished</>}</ListGroup.Item>
                      <ListGroup.Item>
                        {" "}
                        {(typeof val.status!='object') ? <DropdownButton
                          as={ButtonGroup}
                          title="Options"
                          id="bg-vertical-dropdown-1"
                        >
                          {val.status != "Active" && (typeof val.status!='object') && (
                            <Dropdown.Item
                              eventKey="1"
                              onClick={startstream.bind(null, val.id)}
                            >
                              Start Stream
                            </Dropdown.Item>
                          )}
                          {val.status != "Paused" && (typeof val.status!='object') && (
                            <Dropdown.Item
                              eventKey="1"
                              onClick={pausestream.bind(null, val.id)}
                            >
                              Pause Stream
                            </Dropdown.Item>
                          )}
                          {val.status != "Stop" && (typeof val.status!='object') && (
                            <Dropdown.Item
                              eventKey="2"
                              onClick={stopstream.bind(null, val.id)}
                            >
                              Stop Stream
                            </Dropdown.Item>
                          )}
                           
                        </DropdownButton>:<Button disabled>Already Finished</Button>}
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
Outgoing.propTypes = {};

export default Outgoing;
