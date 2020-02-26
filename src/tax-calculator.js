// tax slabs - clearTax 
const TaxSlabs = [
    { max: 250000, min: 0, taxRate: 0 },
    { max: 500000, min: 250000, taxRate: 5 },
    { max: 750000, min: 500000, taxRate: 10 },
    { max: 1000000, min: 750000, taxRate: 15 },
    { max: 1250000, min: 1000000, taxRate: 20 },
    { max: 1500000, min: 1250000, taxRate: 25 },
    { max: Infinity, min: 1500000, taxRate: 30 },
]

/**
 * calculate tax based on tax slab rates
 * @param {*} netIncome number
 * @returns tax array 
 */
export default function calucateTax(netIncome) {
    let total = 0;
    const tax = [];
    for (let i = TaxSlabs.length - 1; i >= 0; i--) {
        const slab = TaxSlabs[i];
        if (netIncome > slab.min && netIncome <= slab.max) {
            const taxable = netIncome - slab.min;
            const taxAmount = (taxable / 100) * slab.taxRate;
            tax.push({ ...slab, taxable, taxAmount });
            netIncome = netIncome - taxable;
            total = total + taxAmount;
        }
    }
    return { slabs: tax.reverse(), total };
}
