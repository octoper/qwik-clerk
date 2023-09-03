import { component$ } from "@builder.io/qwik";
import { useClerk, useUser } from "../hooks";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default component$(() => {
  const clerk = useClerk();
  const user = useUser();

  return (
    <div>
      <h1>Sign In</h1>
      <p>
        {user.value.isSignedIn ? `Hi ${user.value.user?.fullName}` : `Hi Guest`}
      </p>
      <button onClick$={() => clerk.client?.openSignIn()}>Sign In</button>
      <button onClick$={() => clerk.client?.signOut()}>Sign Out</button>
      <SignIn
        appearance={{
          layout: {
            privacyPageUrl: "/privacy",
            termsPageUrl: "/terms",
          },
        }}
      />
      <SignUp
        appearance={{
          layout: {
            privacyPageUrl: "/privacy",
            termsPageUrl: "/terms",
          },
        }}
      />
    </div>
  );
});
