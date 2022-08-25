import Event from '../../db/models/Event';

interface EventInput {
  firstName: string,
  lastName: string,
  email: string,
  date: string,
}

export default {
  Query: {
    getEvents: async () => {
      try {
        const events = await Event.find().sort({ createdAt: 'desc' });

        return events;
      } catch (e) {
        throw new Error('Error while getting events');
      }
    },
    getEvent: async (_: any, { id }: { id: string }) => {
      const event = await Event.findById(id);

      return event;
    },
  },
  Mutation: {
    addEvent: async (
      _: any,
      { eventInput }: { eventInput: EventInput },
      // result: object,
      // info: object,
    ) => {
      const {
        firstName, lastName, email, date,
      } = eventInput;

      const newEvent = new Event({
        firstName,
        lastName,
        email,
        date,
      });

      const res = await newEvent.save();

      return res;
    },
    removeEvent: async (_: any, { id }: { id: string }) => {
      try {
        await Event.deleteOne({ _id: id });

        return { status: 'ok', message: 'Successfully deleted event!' };
      } catch (e: any) {
        return { status: 'error', message: e.message };
      }
    },
  },
};
