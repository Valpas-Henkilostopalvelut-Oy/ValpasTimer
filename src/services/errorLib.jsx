export function onError(error) {
  let message = error;

  if (!(error instanceof Error) && error.message) {
    message = error.message;
  }
  alert(message);
}
