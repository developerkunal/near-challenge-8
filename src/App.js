import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import { login, logout } from "./utils";
import Big from "big.js";
// React Bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import background from "./assets/background.png";
// React Bootstraps imports
import {
  Nav,
  Navbar,
  Container,
  Row,
  Card,
  Alert,
  Tabs,
  Tab,
  Button,
} from "react-bootstrap";

// Custom Components
import Creating from "./Components/Creating";
import Buywnear from "./Components/Buywnear";
import Outgoing from "./Components/Outgoing";
import Incomming from "./Components/Incomming";
// assets
import Logo from "./assets/logo-white.svg";

import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  const [wnear, setNears] = useState(0);
  useEffect(() => {
    const checkBalance = async () => {
      if (window.accountId !== "") {
        console.log(
          await window.contract.ft_balance_of({
            account_id: `${window.accountId}`,
          })
        );

        setNears(
          await window.contract.ft_balance_of({
            account_id: `${window.accountId}`,
          })
        );
      }
    };
    checkBalance();
  }, []);

  return (
    <React.Fragment>
      {" "}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            NEar SpringField challenge
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              ></Nav><Nav>
                {wnear && (
                  <Nav.Link>
                    {"   "}
                    {Big(wnear)
                      .div(10 ** 24)
                      .toFixed()}{" "}
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="11"
                        fill="#FAFAFA"
                        stroke="#D5D4D8"
                        strokeWidth="2"
                      ></circle>
                      <path
                        d="M15.6317 6.60497L13.1233 10.3034C13.0876 10.3567 13.0725 10.421 13.0808 10.4845C13.0892 10.5479 13.1204 10.6063 13.1686 10.6487C13.2169 10.691 13.279 10.7146 13.3435 10.7151C13.4079 10.7155 13.4703 10.6928 13.5192 10.651L15.9883 8.52414C16.0028 8.51128 16.0207 8.50289 16.0399 8.49998C16.0591 8.49707 16.0788 8.49977 16.0964 8.50776C16.1141 8.51574 16.129 8.52867 16.1394 8.54495C16.1498 8.56123 16.1553 8.58017 16.155 8.59945V15.2582C16.155 15.2786 16.1487 15.2985 16.1369 15.3152C16.1251 15.3319 16.1084 15.3446 16.0891 15.3515C16.0698 15.3585 16.0489 15.3594 16.029 15.3541C16.0092 15.3488 15.9915 15.3376 15.9783 15.3219L8.515 6.44938C8.39495 6.3086 8.24548 6.19548 8.07696 6.11788C7.90844 6.04027 7.72492 6.00005 7.53917 6H7.27833C6.9393 6 6.61415 6.13375 6.37442 6.37183C6.13468 6.60991 6 6.93282 6 7.26952V16.6477C6 16.9844 6.13468 17.3073 6.37442 17.5454C6.61415 17.7835 6.9393 17.9172 7.27833 17.9172C7.49693 17.9173 7.71189 17.8617 7.90271 17.7558C8.09353 17.6499 8.25384 17.4972 8.36833 17.3123L10.8767 13.6138C10.9124 13.5605 10.9275 13.4962 10.9192 13.4328C10.9108 13.3693 10.8796 13.311 10.8314 13.2686C10.7831 13.2262 10.721 13.2026 10.6566 13.2022C10.5921 13.2017 10.5297 13.2245 10.4808 13.2662L8.01167 15.3931C7.9972 15.406 7.97927 15.4144 7.96008 15.4173C7.94088 15.4202 7.92125 15.4175 7.90358 15.4095C7.8859 15.4015 7.87095 15.3886 7.86055 15.3723C7.85015 15.356 7.84475 15.3371 7.845 15.3178V8.65738C7.84501 8.63699 7.85133 8.61711 7.86311 8.60041C7.8749 8.58372 7.89157 8.57103 7.91086 8.56407C7.93016 8.55711 7.95114 8.55622 7.97096 8.56151C7.99078 8.5668 8.00849 8.57803 8.02167 8.59366L15.4842 17.4679C15.6042 17.6086 15.7537 17.7218 15.9222 17.7994C16.0907 17.877 16.2742 17.9172 16.46 17.9172H16.7208C16.8888 17.9174 17.0551 17.8846 17.2103 17.8208C17.3655 17.7571 17.5065 17.6636 17.6253 17.5457C17.7441 17.4278 17.8383 17.2878 17.9026 17.1337C17.9669 16.9797 18 16.8145 18 16.6477V7.26952C18 6.93282 17.8653 6.60991 17.6256 6.37183C17.3859 6.13375 17.0607 6 16.7217 6C16.5031 5.99994 16.2881 6.05552 16.0973 6.16143C15.9065 6.26733 15.7462 6.42004 15.6317 6.60497Z"
                        fill="#D5D4D8"
                      ></path>
                    </svg>
                  </Nav.Link>
                )}
                <Nav.Link
                  onClick={
                    window.walletConnection.isSignedIn() ? logout : login
                  }
                >
                  {window.walletConnection.isSignedIn() ? "Logout" : "Login"}
                </Nav.Link>{" "}
                
              </Nav>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{ marginTop: "3vh" }}>
        {" "}
        <Row className="d-flex justify-content-center"></Row>
        <br />
        <Row>
          {window.accountId && (
            <Navbar.Text>Logined as {window.accountId + "  "}</Navbar.Text>
          )}
        </Row>
        {wnear > 0 ? (
          <Row style={{ marginTop: "3vh" }}>
            <Tabs
              defaultActiveKey="buywnear"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              {" "}
              <Tab eventKey="buywnear" title="Buy/Send Wnear">
                {" "}
                <Buywnear balance={wnear} />
              </Tab>
              <Tab eventKey="Create" title="Create Payout">
                <Creating balance={wnear} />
              </Tab>
              <Tab eventKey="outgoing" title="View Outgoing Payouts">
                {" "}
                <Outgoing />
              </Tab>
              <Tab eventKey="incomming" title="View Incomming Payouts">
                <Incomming />
              </Tab>
            </Tabs>
          </Row>
        ) : window.accountId ? (
          <Row style={{ marginTop: "3vh" }}>
            <h1>You Need To Buy Wnear To Register</h1>
            <Buywnear />
          </Row>
        ) : (
          <Container>
            <div
              style={{
                margin: "auto",
                width: "50%",
                border: "3px solid green",
                padding: "10px",
              }}
            >
              <Card className="text-center justify-content-center">
                <Card.Header>
                  <Card.Img src={background} />
                </Card.Header>
                <Card.Body>
                  <Card.Title>Login Into Our Pay For Work Portal</Card.Title>

                  <Button
                    variant="primary"
                    onClick={
                      window.walletConnection.isSignedIn() ? logout : login
                    }
                  >
                    Login Now
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Container>
        )}
      </Container>
    </React.Fragment>
  );
}
