import {schedule} from "node-cron";
import {clearActiveDatabases} from "@src/../../../shared/src/graphql/database/ActiveDatabases";

export function scheduleDatabaseClearJob(): void {
  const everydayAtTwoAm = "0 2 * * *";
  schedule(everydayAtTwoAm, () => {
    clearActiveDatabases();
  });
}
