
export default function ErrorState({ onRetry }) {
  return (
    <div className="error-state">
      <h3>Something went wrong</h3>
      <p>We couldn't load the members. Please try again.</p>

      <button onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}
