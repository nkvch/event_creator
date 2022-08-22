import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { FormEvent, useState } from 'react';

const ADD_EVENT = gql`
  mutation addEvent(
    $eventInput: EventInput!
  ) {
    addEvent(eventInput: $eventInput) {
      date
    }
  }
`;

function EventForm({ refetchAfterSubmit }: { refetchAfterSubmit: Function }) {
  const [addEvent, { loading: saving, error }] = useMutation(ADD_EVENT, {
    update(proxy, result) {
      // console.log(result);
    },
  });

  const [color] = useState(['red', 'yellow', 'green'].random());

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const target = e.target as unknown;
    const [firstNameInput, lastNameInput, emailInput, dateInput] = target as HTMLInputElement[];
    const [firstName, lastName, email, date] = [firstNameInput, lastNameInput, emailInput, dateInput].map(el => el.value);

    await addEvent({ variables: {
      eventInput: { firstName, lastName, email, date },
    }});

    refetchAfterSubmit();
  }

  return (
    <div id="event-form-element" className={`event form ${color}`}>
      <form onSubmit={onSubmit}>
        <input className="event-form-input" placeholder="First name" type="text" />
        <input className="event-form-input" placeholder="Last name" type="text" />
        <input className="event-form-input" placeholder="Email" type="email" />
        <input className="event-form-input" placeholder="date" type="date" />
        <button className="event-form-button" disabled={saving} type="submit" >{saving ? 'Saving...' : 'Save'}</button>
      </form>
    </div>
  )
}

export default EventForm;
