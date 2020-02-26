import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Form } from 'react-bootstrap';
import TaxTable from './TaxTable';
import calucateTax from './tax-calculator';

function App() {
  const [tax, setTax] = useState({ slabs: [], total: 0 });
  const calcTax = (netIncome) => {
    const income = parseInt(netIncome);
    const calcTax = calucateTax(income);
    setTax({ ...calcTax, netIncome });
  }

  return (
    <div className="App">
      <Navbar bg="light" className='mb-2'>
        <Navbar.Brand>Indian Tax Calucator</Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col md={{ span: 6 }}>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Net Income</Form.Label>
                <Form.Control type="number" placeholder="₹" onChange={e => calcTax(e.target.value)} />
                <Form.Text className="text-muted">
                  Edit Net Income to see calculated tax.
                </Form.Text>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <TaxTable slabs={tax.slabs} total={tax.total} netIncome={tax.netIncome}></TaxTable>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
