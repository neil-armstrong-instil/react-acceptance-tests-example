import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {typeDefs} from "./schema/Typedefs";
import {resolvers} from "./resolvers/Resolvers";
import type {Context} from "@src/context/Context";
import {getActiveDatabase} from "@src/database/ActiveDatabases";
import {scheduleDatabaseClearJob} from "@src/cron/DatabaseClearJob";

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  csrfPrevention: false
});

startStandaloneServer<Context>(server, {
  listen: {
    port: 4000
  },
  context: ({req}) => {
    const userId = req.headers?.cookie?.[0] ?? req.headers?.["user-agent"] ?? "default";

    return Promise.resolve({
      database: getActiveDatabase(userId)
    });
  }
}).then(onStart);

function onStart(args: { url: string }): void {
  console.log(`🚀  Server ready at: ${args.url}`);

  scheduleDatabaseClearJob();
}
