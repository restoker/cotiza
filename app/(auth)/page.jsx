import AuthForm from "./ui/auth-form";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=lime&shade=500"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <AuthForm />

        <p className="mt-10 text-center text-sm text-zinc-400">
          Not a member?{' '}
          <a href="#" className="font-semibold leading-6 text-lime-400 hover:text-lime-300">
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  );
}
