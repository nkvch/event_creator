import eventsResolvers from './events';

export default {
  Query: {
    ...eventsResolvers.Query,
  },
  Mutation: {
    ...eventsResolvers.Mutation,
  },
};
