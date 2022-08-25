import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import EventsList, { GET_EVENTS } from '../EventsList';
import { GET_EVENT } from '../Event';
import '../../types';
import { act } from 'react-dom/test-utils';

const numberOfEvents = faker.datatype.number({ min: 1, max: 50 });
const events = Array(numberOfEvents).fill().map(() => ({
    __typename: 'Event',
    id: faker.database.mongodbObjectId() ,
    date: faker.date.between('2010-01-01T00:00:00.000Z', '2030-01-01T00:00:00.000Z').toISOString().split('T')[0],
}));
const randomEventNumber = faker.datatype.number({ min: 0, max: numberOfEvents - 1 });
const randomEvent = events[randomEventNumber];

const mocks = [{
  request: {
    query: GET_EVENTS,
  },
  result: {
    data: {
      getEvents: events,
    },
  },
}, {
  request: {
    query: GET_EVENT,
  },
  result: {
    data: {
      getEvent: {
        __typename: 'Event',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        date: randomEvent.date,
      },
    },
  },
}];

it('EventsList component works as intended', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <EventsList />
    </MockedProvider>
  );

  expect(await screen.findByText('Add event')).toBeInTheDocument();

  const dateToFind = new Date(randomEvent.date).toDateString();

  expect(await screen.findByText(dateToFind)).toBeInTheDocument();

  const event = await container.querySelector(`#${randomEvent.id}`);
  const [expandButton] = await event.getElementsByClassName('event-expand');

  act(() => {
    expandButton.click();
  })

  // expect(await screen.findByText(randomEvent.date)).toBeInTheDocument();
});
