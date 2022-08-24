import { ApolloServer } from 'apollo-server';

import schema from '../graphql/schema';

jest.mock('../db/models/Event.ts');

it('returns array of events', async () => {
  const testServer = new ApolloServer({
    schema,
  });

  const result = await testServer.executeOperation({
    query: 'query getAll { getEvents { id date __typename } }',
    variables: {},
  });

  console.log(result.data.getEvents);
  // expect(result.data.getEvents[1]._id).toBe('6306484a20bf851e27ccb13d');
});
