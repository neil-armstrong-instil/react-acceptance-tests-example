import {Database} from "@shared/graphql/database/Database";

interface ActiveDatabases {
  [id: string]: Database;
}

const activeDatabases: ActiveDatabases = {};

export function getDatabase(id: string): Database {
  let activeDatabase = activeDatabases[id];
  if (!activeDatabase) {
    console.log("No database for", id);
    activeDatabase = new Database();
    activeDatabases[id] = activeDatabase;
  }

  return activeDatabase;
}

export function clearActiveDatabases(): void {
  const keys = Object.keys(activeDatabases);
  for (const key of keys) {
    delete activeDatabases[key];
  }
  console.log("Databases cleared");
}
