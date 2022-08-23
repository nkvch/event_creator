import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import Event, { GET_EVENT, DELETE_EVENT } from '../Event';
import '../../types';
import { act } from 'react-dom/test-utils';

const id = faker.datatype.number({ min: 10, max: 100 });
const date = '2022-02-02';

const mocks = [{
  request: {
    query: GET_EVENT,
    variables: {
      id,
    },
  },
  result: {
    data: {
      getEvent: {
        __typename: 'Event',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        date,
      },
    },
  },
}];

it('Event component works as intended', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Event date={date} id={id} refetch={() => {}} />
    </MockedProvider>
  );
  expect(await screen.findByText(new Date(date).toDateString())).toBeInTheDocument();

  const [expandButton] = await container.getElementsByClassName('event-expand');

  act(() => {
    expandButton.click();
  })

  expect(await screen.findByText('First name')).toBeInTheDocument();
  expect(await screen.findByText(mocks[0].result.data.getEvent.email)).toBeInTheDocument();
});
