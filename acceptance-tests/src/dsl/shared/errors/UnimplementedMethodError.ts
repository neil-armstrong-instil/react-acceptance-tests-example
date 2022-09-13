// Only works if called from the method that is not implemented!
export function unimplementedMethodError<ReturnType>(): Promise<ReturnType> {
  return Promise.reject(new Error(`Method '${captureMethodThatIsNotImplemented()}' is not implemented`));
}

function captureMethodThatIsNotImplemented(): string {
  const stackTraceAsString = new Error().stack;
  if (!stackTraceAsString) return "Unknown";

  const fourthLineOfStackTrace = stackTraceAsString.split("\n")[3];
  if (!fourthLineOfStackTrace) return "Unknown";

  const regexMatch = fourthLineOfStackTrace.match("at ([a-zA-Z.]+)");
  if (!regexMatch) return "Unknown";

  const capturedMethodName = regexMatch[1];
  if (!capturedMethodName) return "Unknown";

  return capturedMethodName;
}
