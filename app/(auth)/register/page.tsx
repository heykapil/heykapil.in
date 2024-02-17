import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Session } from "app/components/helpers/session";
import RegisterForm from "./registerForm";
export default async function RegisterPage(props: any) {
  const callBackUrl: string =
    props?.searchParams?.callback?.toString() || "/profile";
  const session = await Session();
  if (session && session.email && session.username) {
    redirect(callBackUrl);
  }
  const RegisterCookie = cookies().get("RegisterCookie");
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">Register</h1>
      <p className="my-4 text-md font-medium text-neutral-500">
        Create an account!
      </p>
      <RegisterForm callBackUrl={callBackUrl} />
      <div className="text-sm">
        {!!RegisterCookie && (
          <span className="text-[#0000ff] dark:text-blue-200">
            {JSON.parse(JSON.stringify(RegisterCookie)).value as string}
          </span>
        )}
      </div>
    </section>
  );
}
