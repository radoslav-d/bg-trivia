const API_ENDPOINT = 'https://bg-triv.cfapps.sap.hana.ondemand.com/data.json';

export default class RestClient {
  getQuizes() {
    return fetch(API_ENDPOINT).then(response =>
      response.text().then(text => JSON.parse(text).quizes),
    );
  }
}
