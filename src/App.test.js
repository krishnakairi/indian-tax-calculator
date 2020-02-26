import React from 'react';
import { mount } from 'enzyme';
import App from './App';

describe('Tax Calculator', () => {
  let wrapper, input;
  const _t = str => str.replace(/\|/g, '');

  beforeEach(() => {
    wrapper = mount(<App />);
    input = wrapper.find('input');
  });

  it('should have input element to enter net income', () => {
    expect(input).toBeDefined();
  });

  it('should not show table when user does not edit net income', () => {
    const table = wrapper.find('table');
    expect(table.exists()).toBeFalsy();
  });

  it('should show table when user edit input element', () => {
    input.simulate('change', { target: { value: 1 } });
    const table = wrapper.find('table');
    expect(table.exists()).toBeTruthy();
  });

  it('should calculate tax when user enters 755000', () => {
    input.simulate('change', { target: { value: 755000 } });
    const taxRows = wrapper.find('.tax-slab');
    const totalRow = wrapper.find('.tax-total');
    expect(taxRows).toHaveLength(4)
    expect(taxRows.at(0).text()).toEqual(_t('₹0 to ₹2,50,000|₹2,50,000|%0|₹0'))
    expect(taxRows.at(1).text()).toEqual(_t('₹2,50,000 to ₹5,00,000|₹2,50,000|%5|₹12,500'))
    expect(taxRows.at(2).text()).toEqual(_t('₹5,00,000 to ₹7,50,000|₹2,50,000|%10|₹25,000'))
    expect(taxRows.at(3).text()).toEqual(_t('₹7,50,000 to ₹10,00,000|₹5,000|%15|₹750'))
    expect(totalRow).toHaveLength(1)
    expect(totalRow.at(0).text()).toEqual(_t('Total|₹7,55,000|-|₹38,250'))
  });
});
