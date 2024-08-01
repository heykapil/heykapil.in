import { Session } from "app/components/helpers/session";
import { redirect } from "next/navigation";
import { SubmitButton } from "../guestbook/SubmitButton";
import { cookies } from "next/headers";
import { ChangePass } from "app/db/actions";
// import { SignOut } from "app/components/helpers/signout";

const ProfilePage = async () => {
  const session = await Session();
  if (!session || !session?.email) {
    redirect("/signin?callback=/profile");
  }
  const ChangePassCookie = cookies().get("ChangePassCookie");

  return (
    <div className="grid gap-6 lg:grid-cols-profile lg:gap-10">
      <div className="space-y-2">
        <div className="flex items-center space-x-4 justify-between lg:space-x-6">
          <div className="flex items-center space-x-4">
            <div className="rounded-full overflow-hidden border-2 border-white">
              <img
                alt="Avatar"
                className="rounded-full"
                height="80"
                src={
                  session?.avatar ||
                  `https://ui-avatars.com/api/?background=random&name=${session?.full_name}` ||
                  `https://ui-avatars.com/api/?background=random&name=${session?.username}`
                }
                style={{
                  aspectRatio: "80/80",
                  objectFit: "cover",
                }}
                width="80"
              />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl capitalize font-bold">
                {session?.full_name || session.name}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                @{session?.username}
              </p>
            </div>
          </div>
          <div>
            {/* <SignOut callback={"/"} /> */}
            <a href={`/signout?callback=/`} className="text-xs text-neutral-700 dark:text-neutral-300 mt-2 mb-6 rounded-lg px-3 py-2 font-semibold bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700">
              Sign Out
              </a>
          </div>
        </div>
      </div>
      {session?.verified === false ? (
        <span className="text-red-500">Kindly verify your email!</span>
      ) : null}
      <div className="grid gap-4 md:gap-2">
        <div className="flex flex-col space-y-2">
          <div className="flex"> email: {session?.email}</div>
          <div className="flex"> username: {session?.username}</div>
          <div className="flex">
            role: {session?.verified ? "verified" : "unverified"}{" "}
            {session?.role}
          </div>
        </div>
      </div>
      <hr />
      {!session.oauth ? (
        <form className="flex flex-col space-y-2" action={ChangePass}>
          <input
            className="border-b bg-inherit ring-offset-0 outline-none border-zinc-700 dark:border-zinc-300 w-full max-w-[250px] px-1 py-2"
            type="password"
            name="oldPass"
            placeholder="old password"
            minLength={3}
          />
          <input
            className="border-b bg-inherit ring-offset-0 outline-none border-zinc-700 dark:border-zinc-300 w-full max-w-[250px]  px-1 py-2"
            type="password"
            name="newPass"
            placeholder="new password"
            minLength={3}
          />
          <SubmitButton
            type="submit"
            className="px-3 py-2 w-fit border-b dark:border-zinc-300-neutral-200 dark:border-b ring-offset-0 outline-none border-zinc-700 dark:border-zinc-300-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 mb-8 transition-all',
         disabled:opacity-50"
            pendingState={
              <p className="flex items-center gap-1">
                Loading... <span className="loading loading-dots"></span>
              </p>
            }
          >
            Change Password
          </SubmitButton>
          {!!ChangePassCookie &&
            (JSON.parse(JSON.stringify(ChangePassCookie)).value as string)}
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfilePage;
