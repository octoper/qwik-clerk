import { component$ } from "@builder.io/qwik";
import { BaseComponent } from "./BaseComponent";
import { UserProfileProps } from "@clerk/types";

export const OrganizationSwitcher = component$<UserProfileProps>((props) => {
  return (
    <>
      <BaseComponent
        mountFn$={(client, ref) => {
          client.mountOrganizationSwitcher(ref, props)
        }}
        unmountFn$={(client, ref) => {
          client.unmountOrganizationSwitcher(ref)
        }}/>
    </>
  )
})
