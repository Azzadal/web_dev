const quantityBuy = document.getElementById('quantityBuy'),
    idBuy = document.getElementsByClassName('idBuy'),
    idSell = document.getElementsByClassName('idSell'),
    quantitySell = document.getElementById('quantitySell'),
    rateBuy = document.getElementById('rateBuy'),
    rateSell = document.getElementById('rateSell'),
    totalBuy = document.getElementById('totalBuy'),
    totalSell = document.getElementById('totalSell'),
    bidsSell = document.getElementById('bidsSell'),
    bidsBuy = document.getElementById('bidsBuy'),
    complBid = document.getElementById('complBid'),
    rowsPriceSell = document.getElementsByClassName('rowsPriceSell'),
    rowsPriceBuy = document.getElementsByClassName('rowsPriceBuy'),
    rowsQuanBuy = document.getElementsByClassName('rowsQuanBuy'),
    rowsQuanSell = document.getElementsByClassName('rowsQuanSell'),
    rowsTotalSell = document.getElementsByClassName('rowsTotalSell'),
    rowsTotalBuy = document.getElementsByClassName('rowsTotalBuy'),
    rowsSell = document.getElementsByClassName('rowsSell'),
    rowsHistory = document.getElementsByClassName('rowsHistory'),
    rowsBuy = document.getElementsByClassName('rowsBuy');
let stompClient = null;
let changePair = document.getElementById('pairs');

function tableSell(arg) {
    const req = new XMLHttpRequest();
    req.responseType = "json";
    req.open('GET', window.location + arg);
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            let json = req.response;
            let i;
            bidsSell.innerHTML = '';
            for(i = 0; i < json.length; i++) {
                bidsSell.innerHTML += '<tr><td class="col-4 idSell" style="display: none;">' + json[i].id + '</td><td class="text-center">'
                    + json[i].rate +
                    '</td><td class="text-center">' + json[i].quantity + '</td><td class="text-center">' +
                    json[i].total + '</td></tr>';
                //rowsSell[i].style.display = "flex";
            }
        }
        autofillBuy();
    }
    req.send();
}

function tableBuy(arg) {
    const req = new XMLHttpRequest();
    req.responseType = "json";
    req.open('GET', window.location + arg);
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            let json = req.response;
            let i;
            bidsBuy.innerHTML = '';
            for(i = 0; i < json.length; i++) {
                bidsBuy.innerHTML += '<tr><td class="col-4 idBuy" style="display: none;">' + json[i].id + '</td><td class="text-center">'
                    + json[i].rate +
                    '</td><td class="text-center">' + json[i].quantity + '</td><td class="text-center">' +
                    json[i].total + '</td></tr>';
               //rowsBuy[i].style.display = "flex";
            }
        }
        autofillSell();
    }
    req.send();
}

function tableComplit() {
    const req = new XMLHttpRequest();
    req.responseType = "json";
    req.open('GET', window.location + "tab_compl");
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            let json = req.response;
            let i;
            complBid.innerHTML = '';
            for (let i = 0; i < json.length; i++) {
                complBid.innerHTML += '<div class="rowsHistory"><div class="date">' + json[i].date + '</div><div class="type">' +
                    json[i].type +
                    '</div><div class="price">' + json[i].rate + '</div><div class="quantity">' + json[i].quantity +
                    '</div>' + '<div class="total">' + json[i].total + '</div></div>';
                rowsHistory[i].style.display = "flex";
            }
        }
    }
    req.send();
}

function connect() {
    const socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, frame => {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/buys', function (e) {
            let gvn = JSON.parse(e.body);
            bidsBuy.innerHTML = '';
            for (let i = 0; i < gvn.length; i++) {
                bidsBuy.innerHTML += '<tr><td class="col-4 idSell" style="display: none;">' + gvn[i].id +
                    '</td><td class="text-center">' + gvn[i].rate +
                    '</td><td class="text-center">' + gvn[i].quantity + '</td><td class="text-center">' +
                    gvn[i].total + '</td></tr>';
                //rowsBuy[i].style.display = "flex";
            }
            autofillSell();
        });
        stompClient.subscribe('/topic/sells', function (e) {
            let gvn = JSON.parse(e.body);
            bidsSell.innerHTML = '';
            for (let i = 0; i < gvn.length; i++) {
                bidsSell.innerHTML += '<tr><td class="col-4 idSell" style="display: none;">' + gvn[i].id + '</td>' +
                    '<td class="text-center">' + gvn[i].rate +
                    '</td><td class="text-center">' + gvn[i].quantity + '</td><td class="text-center">' +
                    gvn[i].total + '</td></tr>';
                //rowsSell[i].style.display = "flex";
            }
            autofillBuy();
        });
        let options = {
            era: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        stompClient.subscribe('/topic/ids', function (e) {
            let gvn = JSON.parse(e.body);
            complBid.innerHTML = '';
            for (let i = 0; i < gvn.length; i++) {
                let parsed = JSON.parse(gvn[i].date);
                let date = moment(gvn[i].date).format('DD-MM-YYYY'+ '<br>'+ 'HH:mm:ss');
                //console.log(moment(gvn[i].date).format('DD-MM-YYYY HH:mm:ss'))
                complBid.innerHTML += '<div class="rowsHistory"><div class="date">' + date + '</div><div class="type">' +
                    gvn[i].type +
                    '</div><div class="price">' + gvn[i].rate + '</div><div class="quantity">' + gvn[i].quantity +
                    '</div>' + '<div class="total">' + gvn[i].total + '</div></div>';
                rowsHistory[i].style.display = "flex";
            }
        });
    });
}
function checkBuy(pair1, pair2) {
    let date = new Date();
    let flag;
    let q;
    if (rowsSell.length <= 0) flag = 1;
    for (let i = 0; i < rowsSell.length; i++) {
        if (rateBuy.value === rowsPriceSell[i].innerHTML) {
            flag = 0;
            q = i;
            break;
        }
        else {
            flag = 1;
        }
    }
    if(flag === 0) {
        stompClient.send("/app/id", {}, JSON.stringify({
            'id': idSell[q].innerHTML,
            'rate': rowsPriceSell[q].innerHTML,
            'quantity': rowsQuanSell[q].innerHTML,
            'total': rowsTotalSell[q].innerHTML,
            'type': pair2,
            'status': 'done',
            'date': date
        }));
        rowsSell[q].remove();
        setTimeout(tableSell, 1000, pair2);
    } else addBidsBuy(pair1);
}


function checkSell(pair1, pair2) {
    let date = new Date();
    let flag;
    let q;
    if (rowsBuy.length <= 0) flag = 1;
    for (let i = 0; i < rowsBuy.length; i++) {
        if (rateSell.value === rowsPriceBuy[i].innerHTML) {
            flag = 0;
            q = i;
            break;
        }
        else {
            flag = 1;
        }
    }
    if(flag === 0) {
        stompClient.send("/app/id", {}, JSON.stringify({
            'id': idBuy[q].innerHTML,
            'rate': rowsPriceBuy[q].innerHTML,
            'quantity': rowsQuanBuy[q].innerHTML,
            'total': rowsTotalBuy[q].innerHTML,
            'type': pair2,
            'status': 'done',
            'date': date
        }));
        rowsBuy[q].remove();
        setTimeout(tableBuy, 1000, pair2);
    } else addBidsSell(pair1);
}

function addBidsBuy(pair) {
    stompClient.send("/app/" + pair, {}, JSON.stringify({
        'rate':rateBuy.value,
        'quantity':quantityBuy.value,
        'total':totalBuy.value,
        'type':pair,
        'status':'not_done',
        'date': 15
    }));

    $("#quantityBuy").val("0");
    $("#totalBuy").val("0");
}

function addBidsSell(pair) {
    stompClient.send("/app/" + pair, {}, JSON.stringify({
        'rate':rateSell.value,
        'quantity':quantitySell.value,
        'total':totalSell.value,
        'type':pair,
        'status':'not_done',
        'date': 15
    }));

    $("#quantitySell").val("0");
    $("#totalSell").val("0");
}

document.getElementById('butBuy').onclick = function (e) {
    e.preventDefault();
    n = changePair.selectedIndex;
    if (n === 1) checkBuy("URBuy", "URSell");
    if (n === 2) checkBuy("ERBuy", "ERSell");
    if (n === 3) checkBuy("UEBuy", "UESell");
    if (n === 4) checkBuy("EUBuy", "EUSell");
}

document.getElementById('butSell').onclick = function (e) {
    e.preventDefault();
    n = changePair.selectedIndex;
    if (n === 1) checkSell("URSell", "URBuy")
    if (n === 2) checkSell("ERSell", "ERBuy")
    if (n === 3) checkSell("UESell", "UEBuy")
    if (n === 4) checkSell("EUSell", "EUBuy")
}

//автозаполнение формы продажи
function autofillSell(){
    for (let i = 0; i <= rowsBuy.length; i++) {
        rowsBuy[i].addEventListener('click',function () {
            rateSell.innerHTML = rowsPriceBuy[i].innerHTML;
            quantitySell.value = rowsQuanBuy[i].innerHTML;
            outTotal();
        })
    }
}

//автозаполнение формы покупки
function autofillBuy(){
    for (let i = 0; i <= rowsSell.length; i++) {
        rowsSell[i].addEventListener('click',function () {
            rateBuy.innerHTML = rowsPriceSell[i].innerHTML;
            quantityBuy.value = rowsQuanSell[i].innerHTML;
            outTotal();
        })
    }
}

//
function ajaxRate(type) {
    const formData = JSON.stringify({
        rateBuy: $("#rateBuy").val(),
        rateSell: $("#rateSell").val(),
        type: type
    });
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open('POST', window.location + "rate");
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(formData);
}