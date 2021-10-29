const axios = require("axios")
const qs = require('qs');
const crypto = require("crypto")

const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const apiUrl = process.env.API_URL
const symbol = process.env.SYMBOL

const buildSign = (data, config) => {
    return crypto.createHmac('sha256', config).update(data).digest('hex');
  };

const privateCall = async (path, data = {}, method = "GET") => {
    const timestamp = Date.now();
    const signature = buildSign(data, apiSecret)

    const newData = {...data, timestamp, signature}

    const qss = `?${qs.stringify(signature)}`

    try {
        const result = await axios({
            method,
            url: `${apiUrl}${path}${qss}`,
            headers: {'X-MBX-APIKEY': apiKey}
        })
        return result.data;
    }
    catch(err) {
        console.log(err.response)
    }
}

const accountInfo = () => {
    return privateCall("/v3/account")
}

const publicCall = async (path, data, method = "GET") => {
    try {
        const qss = data ? `?${qs.stringify(data)}` : ""
        const result = await axios({
            method,
            url: `${apiUrl}${path}${qss}`
        })
        return result.data;
    }
    catch(err) {
        console.log(err)
    }
}

const time = () => {
    return publicCall("/v3/time")
}

const depth = (symbol = "BTCBRL", limit = "5") => {
    return publicCall("/v3/depth", {symbol, limit})
}

const exchangeInfo = () => {
    return publicCall("/v3/exchangeInfo")
}


module.exports = {
    time,
    depth,
    exchangeInfo,
    accountInfo
}