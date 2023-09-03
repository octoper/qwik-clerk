import { component$ } from "@builder.io/qwik";
import { BaseComponent } from "./BaseComponent";
import { UserProfileProps } from "@clerk/types";

export const UserProfile = component$<UserProfileProps>((props) => {
  return (
    <>
      <BaseComponent
        mountFn$={(client, ref) => {
          client.mountUserProfile(ref, props)
        }}
        unmountFn$={(client, ref) => {
          client.unmountUserProfile(ref)
        }}/>
    </>
  )
})
