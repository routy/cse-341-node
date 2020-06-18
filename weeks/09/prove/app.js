const express = require('express');
const url     = require('url');

const app  = express();
const port = process.env.PORT || '8000';

app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");

app.get('/', (req, res) => {

    let params = {
        rateTypes: getRateTypes()
    };

    res.render("rate", params);
});

app.get('/getRate', (req, res) => {

    const parts = url.parse(req.url, true);
    const query = parts.query;
    let params = {};

    const rates = getRates();

    if ( query.type && rates.hasOwnProperty(query.type) && !isNaN(parseFloat(query.weight)) ) {
        
        const rate = calculateRate(query.type, query.weight);

        if (rate) {
            params.status = 'success';
            params.rate = rate;
        } else {
            params.status = 'error';
            params.message = 'We were unable to calculate a rate for your request. Please ensure that your weight is within the max weight limit.';
        }

    } else {

        params.status = 'error';
        params.message = 'Please select a valid mail type and weight (oz).';

    }

    res.json(params);
});

/**
 * Return the available rate types for selection
 */
function getRateTypes() 
{
    const rates = getRates();
    let rateTypes = [];

    Object.keys(rates).forEach( key => {
        rateTypes.push(
            {
                key,
                value: rates[key].name,
                maxWeight: rates[key].rates.slice(-1)[0].weight
            }
        );
    });

    return rateTypes;
}

/**
 * Return all the rates
 */
function getRates(type)
{
    const rates = {
        lettersStamped: {
            name: 'Letters (Stamped)',
            rates: [
                { weight: 1, price: .55 },
                { weight: 2, price: .70 },
                { weight: 3, price: .85 },
                { weight: 3.5, price: 1 }
            ]
        },
        lettersMetered: {
            name: 'Letters (Metered)',
            rates: [
                { weight: 1, price: .50 },
                { weight: 2, price: .65 },
                { weight: 3, price: .80 },
                { weight: 3.5, price: .95 }
            ]
        },
        largeEnvelopesFlats: {
            name: 'Large Envelopes (Flats)',
            rates: [
                { weight: 1, price: 1.00 },
                { weight: 2, price: 1.20 },
                { weight: 3, price: 1.40 },
                { weight: 4, price: 1.60 },
                { weight: 5, price: 1.80 },
                { weight: 6, price: 2.00 },
                { weight: 7, price: 2.20 },
                { weight: 8, price: 2.40 },
                { weight: 9, price: 2.60 },
                { weight: 10, price: 2.80 },
                { weight: 11, price: 3.00 },
                { weight: 12, price: 3.20 },
                { weight: 13, price: 3.40 }
            ]
        },
        firstClassPackageServiceRetail: {
            name: 'First Class Package Service - Retail',
            rates: [
                { weight: 4, price: 3.80, zones: [1,2] },
                { weight: 8, price: 4.60, zones: [1,2] },
                { weight: 12, price: 5.30, zones: [1,2] },
                { weight: 13, price: 5.90, zones: [1,2] }
            ]
        }
    }
    
    // If a specific rateType was provided, return only the rates for that type
    return (type !== undefined) ? ( ( rates[type] !== undefined ) ? rates[type] : false ) : rates;
}

function calculateRate(type, weight) {

    const rates = getRates();
    
    if (rates[type] === undefined) {
        return false;
    }

    let rate = false;

    for (let i = 0; i < rates[type].rates.length; i++) {
        if(rates[type].rates[i].weight >= weight) {
            rate = rates[type].rates[i].price;
            break;
        }
    }

    return rate;

} 

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
