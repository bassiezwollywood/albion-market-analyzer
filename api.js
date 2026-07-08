const API_URL = "https://west.albion-online-data.com/api/v2/stats/prices/";

async function getMarketData(item) {

    const url =
        API_URL +
        encodeURIComponent(item) +
        "?locations=Bridgewatch,Martlock,FortSterling,Lymhurst,Thetford,Caerleon";

    try {

        const response = await fetch(url);

        if (!response.ok)
            throw new Error("Unable to contact Albion API");

        return await response.json();

    } catch (err) {

        console.error(err);

        return [];
    }

}
