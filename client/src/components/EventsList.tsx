import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Loader from './Loader';
import Event from './Event';
import EventForm from './EventForm';
import Dimmer from './Dimmer';

const GET_EVENTS = gql`
  {
    getEvents {
      id
      date
    }
  }
`;

function EventsList() {
  const { loading, data, refetch } = useQuery(GET_EVENTS, {
    notifyOnNetworkStatusChange: true,
  });

  return (
    <div className={`events-holder ${loading ? 'loading' : ''}`}>
      <EventForm refetchAfterSubmit={refetch} />
      {
        loading && <><Dimmer /><Loader /></>
      }
      {
        data?.getEvents.map((event: { id: string, date: string }) => <Event key={event.id} {...event} refetch={refetch} />)
      }
    </div>
  );
};

export { GET_EVENTS };

export default EventsList;
