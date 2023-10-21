
export const fetchUserLocation = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();

    const res = await fetch(
      // eslint-disable-next-line no-undef
      `https://ipinfo.io/${data.ip}?token=${process.env.NEXT_PUBLIC_TOKEN_IP_INFO}`,
    );
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};