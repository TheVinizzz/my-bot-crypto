const {time, depth, exchangeInfo, accountInfo} = require("./api") 

const symbol = process.env.SYMBOL

setInterval(async () => {
    let buy = 0 , sell = 0;

    const result = await depth(symbol)

    if(result.bids && result.bids.length) {
        console.log(`Highest Buy: ${result.bids[0][0]}`)
        buy = parseInt(result.bids[0][0])
    }

    if(result.asks && result.asks.length) {
        console.log(`Lowest Sell: ${result.asks[0][0]}`)
        sell = parseInt(result.asks[0][0])
    }

    if(sell < 700) {
        console.log("Hora de comprar")
    }

    if(sell > 700) {
        console.log("Hora de comprar")
    }

    
}, process.env.CRAWLER_INTERVAL)