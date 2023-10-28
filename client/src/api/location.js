
export const fetchUserLocation = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();

    const res = await fetch(
      // eslint-disable-next-line no-undef
      `https://ipinfo.io/${data.ip}?token=${'fe84965f970f45'}`,
    );
    const json = await res.json();
    const loc = json.loc.split(',');
    const lat = parseFloat(loc[0]);
    const lng = parseFloat(loc[1]);
    console.log(lat, lng)
    // const res2 = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=2302dae7eba24584a475c593e18731e6`)
    const res2 = await fetch(`https://revgeocode.search.hereapi.com/v1/revgeocode?apikey=l0kf98ThFp7W9mEuKbe6n-7haTuZUEvQlDMXNpgCwuQ&at=${`3.4335725`},${`-76.5141267`}&lang=en-US`)
    const json2 = await res2.json();
    console.log(json2)
    return json;
  } catch (error) {
    console.error(error);
  }
};