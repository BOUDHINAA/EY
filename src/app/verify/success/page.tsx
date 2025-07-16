export default function VerifySuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold text-green-600">✅ Email Verified</h1>
        <p className="mt-2">Your account is now active.</p>
        <a
          href="/login"
          className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
}
