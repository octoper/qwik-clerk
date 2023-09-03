import { component$ } from "@builder.io/qwik";
import { BaseComponent } from "./BaseComponent";
import { UserProfileProps } from "@clerk/types";

export const OrganizationProfile = component$<UserProfileProps>((props) => {
  return (
    <>
      <BaseComponent
        mountFn$={(client, ref) => {
          client.mountOrganizationProfile(ref, props)
        }}
        unmountFn$={(client, ref) => {
          client.unmountOrganizationProfile(ref)
        }}/>
    </>
  )
})
