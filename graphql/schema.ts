import { constraintDirective, constraintDirectiveTypeDefs } from 'graphql-constraint-directive';
import { makeExecutableSchema } from '@graphql-tools/schema';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

const schema = constraintDirective()(makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, typeDefs],
  resolvers,
}));

export default schema;
