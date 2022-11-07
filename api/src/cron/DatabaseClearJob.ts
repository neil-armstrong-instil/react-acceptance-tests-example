import {schedule} from "node-cron";
import {clearActiveDatabases} from "@src/database/ActiveDatabases";

export function scheduleDatabaseClearJob(): void {
  const everydayAtTwoAm = "* * * * *";
  schedule(everydayAtTwoAm, () => {
    clearActiveDatabases();
  });
}
