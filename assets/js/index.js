const sellAdvertisementWrap = document.getElementById("sellAdvertisementTable")
const sellAdvertisementMain = document.getElementById("sellAdvertisementWrap")

const tradesWrap = document.getElementById("trade")

const errMsgBuy = document.createElement("td")
errMsgBuy.colSpan = "3"
errMsgBuy.innerHTML = "Sorry, there are no buy offers available."

const errMsgSell = document.createElement("td")
errMsgSell.colSpan = "3"
errMsgSell.innerHTML = "Sorry, there are no sell offers available."

const apiErr = document.createElement("p");
apiErr.innerText = "Oh no, seems like the API is not working."

// SELL OFFERS
fetch("https://tnbcrow-discord-bot.herokuapp.com/advertisement?ordering=price&side=SELL&format=json").then(response => response.json().then(offers =>
{
  console.log(offers.count)
  if (offers.count > 0)
  {
    displayAdvertisements(offers, sellAdvertisementWrap)
  }
  else
  {
    sellWrap.innerHTML = ""
    sellWrap.appendChild(errMsgSell)
  }
})).catch(err =>
{
  sellAdvertisementMain.innerHTML = ""
  sellAdvertisementMain.appendChild(apiErr)
})

function displayAdvertisements(offers, wrapper)
{
  // let buy_offer_list = []
  for (let i = 0; i < 8; i++)
  {
    let offer = document.createElement('tr');
    offer.innerHTML = `<td>${offers.results[i].price/100000000}</td><td>${numberWithCommas(offers.results[i].amount/100000000)}</td>`
    wrapper.appendChild(offer);
  }
}

// Recent Trades
fetch("https://tnbcrow.pythonanywhere.com/recent-trades").then(res => res.json()).then(trades =>
{
  if (trades.count > 0)
  {
    displayTrades(trades, tradesWrap)
  }
}).catch(err => console.log(err))

function displayTrades(trades, wrapper)
{
  // let buy_offer_list = []
  for (let i = 0; i < trades.count && i < 8; i++)
  {
    let trade = document.createElement('tr');
    trade.innerHTML = `<td>${trades.results[i].rate/10000}</td><td>${trades.results[i].amount}</td><td>${parseInt(trades.results[i].rate/10000 * trades.results[i].amount)}</td>`
    wrapper.appendChild(trade);
  }
}

function numberWithCommas(x)
{
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Statistics
const rate = document.getElementById("rate");
const cap = document.getElementById('cap');
const supply = document.getElementById('circ');
fetch("https://raw.githubusercontent.com/itsnikhil/tnb-analysis/master/web/js/static.json").then(res => res.json()).then(data =>
{
  circulating_supply = data.Total;
  supply.innerText = numberWithCommas(data.Total);
}).catch(err =>
{
  supply.innerText = "There seems to be something wrong with the API";
  cap.innerText = "There seems to be something wrong with the API"
})

fetch("https://tnbcrow.pythonanywhere.com/recent-trades").then(res => res.json()).then(data =>
{
  rate.innerText = data.results[0].rate / 10000
  cap.innerText = numberWithCommas(parseInt(circulating_supply * rate.innerText));
}).catch(err =>
{
  rate.innerText = "There seems to be something wrong with the API"
  cap.innerText = "There seems to be something wrong with the API"
})