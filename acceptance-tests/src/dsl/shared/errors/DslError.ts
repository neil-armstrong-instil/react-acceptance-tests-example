export class DslError extends Error {
  constructor(message: string, private maybePreviousError: unknown) {
    super(message);

    if (maybePreviousError instanceof Error) {
      this.stack += `\n\n${maybePreviousError.stack}`;
    }
  }

  static toString(objectToPrint: object): string {
    return JSON.stringify(objectToPrint, null, 0);
  }
}
