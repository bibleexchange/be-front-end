import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import auth from './auth'
// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns the result as a Promise:
function fetchQuery(
  operation,
  variables,
  // cacheConfig,
  // uploadables,
) {
  return fetch(
    process.env.API_ENDPOINT
      ? `${process.env.API_ENDPOINT}`
      : 'http://bible.exchange/graphql',
    {
      method: 'POST',
      headers: {
        // Add authentication and other headers here
        'content-type': 'application/json',
        "Authorization": "Bearer " + auth.getToken(),
        "Accept": "*",
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    },
  ).then(response => response.json());
}

export default new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});