import gql from 'graphql-tag';
import React, { useContext, useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import Loader from './Loader';
import Dimmer from './Dimmer';
import ExpandIcon from './static/ExpandIcon';
import DeleteIcon from './static/DeleteIcon';
import ToastContext from '../context';

interface EventData {
  firstName: string,
  lastName: string,
  email: string,
  date: string,
};

const fieldNameMap = new Map([
  ['firstName', 'First name'],
  ['lastName', 'Last name'],
  ['email', 'Email'],
  ['date', 'Date'],
]);

const GET_EVENT = gql`
  query getEvent($id: ID!) {
    getEvent(id: $id) {
      firstName
      lastName
      email
      date
    }
  }
`;

const DELETE_EVENT = gql`
  mutation removeEvent($id: String!) {
    removeEvent(
      id: $id
    ) {
      status
      message
    }
  }
`;

function Event({ id, date, refetch }: { id: string, date: string, refetch: Function }) {
  const toast = useContext(ToastContext);
  const [removeEvent, { loading: removing }] = useMutation(DELETE_EVENT, {
    update(proxy, result) {
      refetch();
      console.log(result);
      
      toast?.setToast('yahoo');
    },
    variables: { id },
  });

  const [getEvent, { loading: getting, data }] = useLazyQuery(GET_EVENT, {
    variables: { id },
  });

  const [color] = useState(['red', 'yellow', 'green'].random());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      getEvent();
    }
  }, [open]);

  const filterNessesaryData = ([fieldName]: string[]) => ['firstName', 'lastName', 'email', 'date'].includes(fieldName);

  const renderData = ([fieldName, fieldValue]: string[]) => <tr key={fieldValue}><td>{fieldNameMap.get(fieldName)}</td><td>{fieldValue}</td></tr>

  const eventData = data?.getEvent as EventData || {};

  console.log(eventData);
  

  return (
    <>
      { open && <Dimmer /> }
      <div key={id} id={id} className={`event ${color} ${open ? 'opened' : ''}`}>
      {
        open
          ? (
            <>
              {
                getting ? <Loader /> : (
                  <>
                    <h3>Event data</h3>
                    <table className="event-data">
                      <tbody>
                        {Object.entries(eventData).filter(filterNessesaryData).map(renderData)}
                      </tbody>
                    </table>
                  </>
                )
              }
            </>
          ) : (
            <>
              <button className="event-delete" type="button" onClick={() => removeEvent()}>
                <DeleteIcon />
              </button>
              <h3 className="event-date-preview">{new Date(date).toDateString()}</h3>
            </>
          )
      }
        <button className="event-expand" type="button" onClick={() => setOpen(prev => !prev)}>
          <ExpandIcon inverted={open} />
        </button>
      </div>
    </>
  )
};

export { GET_EVENT, DELETE_EVENT };

export default Event;
