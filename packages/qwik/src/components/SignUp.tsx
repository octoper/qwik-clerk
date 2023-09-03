import { component$ } from "@builder.io/qwik";
import { BaseComponent } from "./BaseComponent";
import { SignInProps } from "@clerk/types";

export default component$<SignInProps>((props) => {
  return (
    <BaseComponent
      mountFn$={(client, ref) => {
        client.mountSignUp(ref, props);
      }}
      unmountFn$={(client, ref) => {
        client.unmountSignUp(ref);
      }}
    />
  );
});
