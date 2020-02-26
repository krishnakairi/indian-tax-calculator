// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IntlPolyfill from 'intl'
import 'intl/locale-data/jsonp/pt'

const setupTests = () => {
 // https://formatjs.io/guides/runtime-environments/#server
 if (global.Intl) {
   Intl.NumberFormat = function () {
       this.format = num => {
            const n = new IntlPolyfill
                .NumberFormat('en-IN', { minimumFractionDigits: 0 })
                .format(num);
            return `₹${n}`;
       }
   }
   Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat
 } else {
   global.Intl = IntlPolyfill
 }
}

setupTests();
configure({ adapter: new Adapter() });