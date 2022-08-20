import Event from '../../db/models/Event';

export default {
  Query: {
    getEvents: async () => {
      try {
        const events = await Event.find();
        return events;
      } catch (e) {
        throw new Error('Error while getting events');
      }
    },
  },
  Mutation: {
    addEvent: async (_, {
      eventInput: { firstName, lastName, email, date },
    }, result, info) => {
      // TODO: Validate Event
      const newEvent = new Event({
        firstName,
        lastName,
        email,
        date,
      });

      const res = await newEvent.save();

      console.log(res);

      return res;
    },
  },
};
