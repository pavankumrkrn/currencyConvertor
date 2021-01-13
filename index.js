const api_key = '7ae9b6d7fe3dce9dd75cac1c';
let url = 'https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json';


const createElement = (element, className = '', id = '') => {
    let ele = document.createElement(element);
    ele.setAttribute('class', className);
    ele.id = id;
    return ele;
}
function appendTable(currencies, num, val) {
    let count = 0;
    for (let i in currencies) {
        if (i !== val) {
            count++;
            let tr = createElement('tr');
            let td = createElement('td', 'text-center');
            td.innerText = count;
            let td1 = createElement('td', 'text-center');
            td1.innerText = i;
            let td2 = createElement('td', 'text-center');
            if(obj[i] !== undefined)
            td2.innerText = (currencies[i] * num).toFixed(2) + ' ' +obj[i];
            else 
            td2.innerText = (currencies[i] * num).toFixed(2)
            tr.append(td, td1, td2);
            document.getElementById('convertedValues').append(tr)
        }
    }
}

let obj = {}
fetch(url).then((data) => {
    return data.json();
}).then((data) => {
    data.forEach(country => {
        country.currencies.forEach(cur => {
            if (cur.code !== 'ALL' && cur.code !== null && cur.code.length === 3 && cur.symbol !== null)
                obj[cur.code] = cur.symbol;
        });
    });
    for (let i in obj) {
        document.getElementById('country').options.add(new Option(i, i));
    }
}).catch((error) => {
    alert("an error while getting countries");
});

document.getElementById('getButton').onclick = function (e) {
    let num = document.getElementById('value').value;
    let country = document.getElementById('country').value
    if (num !== '' && country !== '') {
        document.getElementById('basic-addon1').innerText = obj[country];
        document.getElementById('countryPara').innerText = 'Current Currency : ' +country+' and Base Value : '+num+' '+
        document.getElementById('basic-addon1').innerText;
        getCurrencies(country, +num);
    } else {
        alert('Please enter a number in the value field and select a currency');
    }
}

function getSymbol(val){
    if(val !== ''){
        document.getElementById('basic-addon1').innerText = obj[val];
    } else {
        document.getElementById('basic-addon1').innerText = '-';
    }

}

function getCurrencies(val, num) {
    let currencyUrl = 'https://v6.exchangerate-api.com/v6/' + api_key + '/latest/'
    document.getElementById('convertedValues').innerHTML = '';
    currencyUrl += val;
    fetch(currencyUrl).then((data) => {
        return data.json();
    }).then((data) => {
        console.log(data.conversion_rates);
        appendTable(data.conversion_rates, +num, val);
    }).catch((error) => {
        alert('Error! unable to fetch currency converted data');
    })
}
