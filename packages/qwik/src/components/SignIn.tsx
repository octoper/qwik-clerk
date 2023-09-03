import { component$ } from "@builder.io/qwik";
import { BaseComponent } from "./BaseComponent";
import { SignInProps } from "@clerk/types";

export const SignIn = component$<SignInProps>((props) => {
  return (
    <>
      <BaseComponent
        mountFn$={(client, ref) => {
          client.mountSignIn(ref, props)
        }}
        unmountFn$={(client, ref) => {
          client.unmountSignIn(ref)
        }}/>
    </>
  )
})
