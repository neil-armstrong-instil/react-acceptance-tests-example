import {Database} from "@src/database/Database";

interface ActiveDatabases {
  [id: string]: Database;
}

const activeDatabases: ActiveDatabases = {};

export function getActiveDatabase(id: string): Database {
  let activeDatabase = activeDatabases[id];
  if (!activeDatabase) {
    activeDatabase = new Database();
    activeDatabases[id] = new Database();
  }

  return activeDatabase;
}

export function clearActiveDatabases(): void {
  const keys = Object.keys(activeDatabases);
  for (const key of keys) {
    delete activeDatabases[key];
  }
}
