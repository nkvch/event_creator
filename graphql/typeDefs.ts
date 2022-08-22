import gql from 'graphql-tag';

export default gql`
  input EventInput {
    firstName: String!
    lastName: String!
    email: String! @constraint(format: "email")
    date: String! @constraint(format: "date")
  }
  type Event {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    date: String!
  }
  enum ResponseStatus {
    ok
    error
  }
  type DeleteResponse {
    status: ResponseStatus!
    message: String
  }
  type Query {
    getEvents: [Event]
    getEvent (id: ID!): Event
  } 
  type Mutation {
    addEvent(eventInput: EventInput): Event!
    removeEvent(id: String): DeleteResponse!
  }
`;
