// Throws a deliberate error to verify that Sentry receives frontend events.
function ErrorButton() {
  return (
    <button
      type="button"
      onClick={() => {
        throw new Error("This is your first error!");
      }}
    >
      Break the world
    </button>
  );
}

export default ErrorButton;
