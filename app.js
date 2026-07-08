let chart;

async function searchItem() {

    const item = document.getElementById("itemName").value.trim();

    if (item === "") {

        alert("Enter an Albion item ID.");

        return;
    }

    const results = document.getElementById("results");

    results.innerHTML = "Loading...";

    const data = await getMarketData(item);

    if (data.length === 0) {

        results.innerHTML = "No market data found.";

        return;

    }

    let html = "";

    let cheapest = null;
    let highest = null;

    data.forEach(location => {

        html += `
        <div style="margin-bottom:20px;">
            <h3>${location.city}</h3>

            Buy Price:
            <b>${location.buy_price_min.toLocaleString()}</b><br>

            Sell Price:
            <b>${location.sell_price_min.toLocaleString()}</b><br>

            Updated:
            ${location.sell_price_min_date}
        </div>
        `;

        if (
            location.sell_price_min > 0 &&
            (cheapest == null ||
                location.sell_price_min < cheapest.sell_price_min)
        ) {
            cheapest = location;
        }

        if (
            location.sell_price_min > 0 &&
            (highest == null ||
                location.sell_price_min > highest.sell_price_min)
        ) {
            highest = location;
        }

    });

    if (cheapest && highest) {

        html += `
        <hr>

        <h2>Best Trade</h2>

        Buy in
        <b>${cheapest.city}</b>

        for

        <b>${cheapest.sell_price_min.toLocaleString()}</b>

        <br><br>

        Sell in

        <b>${highest.city}</b>

        for

        <b>${highest.sell_price_min.toLocaleString()}</b>

        <br><br>

        Profit per item:

        <b style="color:lime;">
        ${(highest.sell_price_min-cheapest.sell_price_min).toLocaleString()}
        </b>
        `;
    }

    results.innerHTML = html;

    drawDummyChart();

}

function calculateProfit(){

    const buy =
        Number(document.getElementById("buyPrice").value);

    const sell =
        Number(document.getElementById("sellPrice").value);

    const qty =
        Number(document.getElementById("quantity").value);

    const profit =
        (sell-buy)*qty;

    document.getElementById("profitResult").innerHTML=
        "Profit: "+
        profit.toLocaleString()+
        " Silver";

}
