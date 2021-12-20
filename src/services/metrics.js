const {type} = require("os");

const buildMetrics = ({config}) => async ({transactions, year}) => {
  let depositEthFlow = Array(12).fill(0);
  let paymentEthFlow = Array(12).fill(0);
  let depositCount = Array(12).fill(0);
  let paymentCount = Array(12).fill(0);
  for(let i = 0; i < transactions.length; i++){
    let date = new Date(transactions[i]["dataValues"]["createdAt"])
    if(year && date.getFullYear() !== year){
      continue;
    }
    if(transactions[i]["dataValues"]["senderAddress"] === config.contractAddress){
      paymentEthFlow[date.getMonth()] += parseFloat(transactions[i]["dataValues"]["amountInEthers"]);
      paymentCount[date.getMonth()]++;
    }else{
      depositEthFlow[date.getMonth()] += parseFloat(transactions[i]["dataValues"]["amountInEthers"]);
      depositCount[date.getMonth()]++;
    }
  }
  return {year, depositCount, depositEthFlow, paymentCount, paymentEthFlow}
}


module.exports = ({config}) => ({
  buildMetrics: buildMetrics({config}),
})
