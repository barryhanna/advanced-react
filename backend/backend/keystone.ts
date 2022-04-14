/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/
import 'dotenv/config';
import { config } from '@keystone-6/core';

// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
import { lists } from './schema';
import { User } from './schemas/User';
// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session } from './auth';
import { createSchema } from '@keystone-next/keystone/schema';

const databaseUrl =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long should they stay signed in
  secret: process.env.COOKIE_SECRET,
};

export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseUrl,
      // TODO: Add data seeding here
    },
    lists: createSchema({
      // Schema items go in here
      User,
    }),
    ui: {
      // TODO: change this for roles
      isAccessAllowed: () => true,
    },
    // TODO: Add session values here
  })
);
