import Form from "@/app/(auth)/login/Form";
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-white px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back 👋</h2>
          <p className="text-sm text-gray-500">Login to your admin account</p>
        </div>

        <Form  />
      </div>
    </div>
  );
}
