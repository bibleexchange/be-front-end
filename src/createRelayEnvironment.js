const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require("relay-runtime");

import auth from "./auth";

function fetchQuery(operation,variables){
    return fetch(process.env.API_ENDPOINT? process.env.API_ENDPOINT:"http://bible.exchange/graphql", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + auth.getToken(),
            "Accept": "*/*",
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    }).then(response => {
        return response.json();
    });
}

const network = Network.create(fetchQuery);

const source = new RecordSource();
const store = new Store(source);

export default new Environment({
    network,
    store,
});