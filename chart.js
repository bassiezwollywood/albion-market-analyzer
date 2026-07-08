function drawDummyChart() {

    const ctx = document
        .getElementById("priceChart")
        .getContext("2d");

    if(chart){

        chart.destroy();

    }

    chart = new Chart(ctx,{

        type:"line",

        data:{

            labels:[
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ],

            datasets:[{

                label:"Example Price",

                data:[
                    100,
                    130,
                    120,
                    150,
                    140,
                    170,
                    160
                ]

            }]

        }

    });

}
