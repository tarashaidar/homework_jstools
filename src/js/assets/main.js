const CONVERTER_API = "https://api.exchangeratesapi.io/latest?base=USD"
const  getCurrency = () => {
 return axios.get(CONVERTER_API).then(res => {
    return res.data
     
}).then(item => {
   return item.rates.RUB;  
})
}

const loader = async() => {
    dollar = await getCurrency();
    samsung = 750 * dollar;
    xiaomi = 650 * dollar;
    samsung = parseFloat(samsung).toFixed(2);
    xiaomi = parseFloat(xiaomi).toFixed(2);
    app.style.display = 'block';
    render();
}

document.querySelector('#get').addEventListener('click', loader);
const app = document.querySelector('#app')

const render = () => {

const Samsumg = document.getElementById("samsung");
const Xiaomi = document.getElementById("xiaomi");

const answer = document.getElementById("answer");

if (dollar > 64 || dollar === 64) {
    loader()
    Samsumg.textContent = samsung;
    Xiaomi.textContent = xiaomi;
}
else {
    document.getElementById("app").style.display = "none";
    answer.textContent = "Sold out";
}
}