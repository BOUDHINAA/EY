export default function VerifyFailurePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold text-red-600">
          ❌ Verification Failed
        </h1>
        <p className="mt-2">The link is invalid or has expired.</p>
        <a
          href="/signup"
          className="mt-4 inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Try Again
        </a>
      </div>
    </div>
  );
}
