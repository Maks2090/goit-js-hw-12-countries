export default function fetchCountries (name) {
    const baseUrl  = `https://restcountries.eu/rest/v2/name/${name}?fields=name;capital;population;flag;languages`;

   return fetch(baseUrl).then(response => {
        return response.json();
    });
    
}

