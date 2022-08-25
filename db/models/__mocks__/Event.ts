import mongoose from 'mongoose';

export default {
  find: () => ({
    sort: async () => ([
      {
        _id: new mongoose.Types.ObjectId('63064f3220bf851e27ccb15e'),
        firstName: 'react',
        lastName: 'react',
        email: 'react@gmail.com',
        date: '2022-08-05',
        createdAt: new Date('2022-08-24T16:17:54.651Z'),
        updatedAt: new Date('2022-08-24T16:17:54.651Z'),
        __v: 0,
      },
      {
        _id: new mongoose.Types.ObjectId('6306484a20bf851e27ccb13d'),
        firstName: 'Dfrgt',
        lastName: 'Ftdgdt',
        email: 'rgr@grsg.rg',
        date: '2022-08-23',
        createdAt: new Date('2022-08-24T15:48:26.523Z'),
        updatedAt: new Date('2022-08-24T15:48:26.523Z'),
        __v: 0,
      },
      {
        _id: new mongoose.Types.ObjectId('630628e803b806f547c2af47'),
        firstName: 'Ftgdt',
        lastName: 'Ggrtsh',
        email: 'fregd@ger.ge',
        date: '2022-08-23',
        createdAt: new Date('2022-08-24T13:34:32.869Z'),
        updatedAt: new Date('2022-08-24T13:34:32.869Z'),
        __v: 0,
      },
    ]),
  }),
};
