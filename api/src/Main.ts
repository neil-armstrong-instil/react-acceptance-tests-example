import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {typeDefs} from "@shared/graphql/schema/Typedefs";
import {resolvers} from "./resolvers/Resolvers";
import type {Context} from "@shared/graphql/context/Context";
import {scheduleDatabaseClearJob} from "@src/cron/DatabaseClearJob";
import {getDatabase} from "@shared/graphql/database/ActiveDatabases";

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers
});

startStandaloneServer<Context>(server, {
  listen: {
    port: 4000
  },
  context: ({req}) => {
    const userId = req.headers?.userid as (string | undefined) ?? req.headers?.["user-agent"] ?? "default";

    return Promise.resolve({
      database: getDatabase(userId)
    });
  }
}).then(onStart);

function onStart(args: { url: string }): void {
  console.log(`🚀  Server ready at: ${args.url}`);

  scheduleDatabaseClearJob();
}
