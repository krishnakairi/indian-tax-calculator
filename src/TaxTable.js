import React from 'react';
import { Table } from 'react-bootstrap';

const format = num => new Intl
    .NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 })
    .format(num);

function TaxTable({ slabs, total, netIncome }) {
    if (slabs && slabs.length <= 0) {
        return <></>;
    }
    return (
        <Table striped bordered hover responsive="lg">
            <thead>
                <tr>
                    <th>Tax Slab</th>
                    <th>Income</th>
                    <th>Tax Rate</th>
                    <th>Tax Amount</th>
                </tr>
            </thead>
            <tbody>
                {slabs.map((slab, index) => TaxRow({ ...slab, index }))}
                <tr className='tax-total'>
                    <th>Total</th>
                    <th>{format(netIncome)}</th>
                    <th>-</th>
                    <th>{format(total)}</th>
                </tr>
            </tbody>
        </Table>
    );
}

function TaxRow({ max, min, taxRate, taxAmount, taxable, index }) {
    return (
        <tr key={index} className='tax-slab'>
            {(max === Infinity) ? <th>Above {format(min)}</th> : <th>{format(min)} to {format(max)}</th>}
            <th>{format(taxable)}</th>
            <th>%{taxRate}</th>
            <th>{format(taxAmount)}</th>
        </tr>
    )
}

export default TaxTable;
