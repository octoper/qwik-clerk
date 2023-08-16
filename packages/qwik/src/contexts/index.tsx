import { $, NoSerialize, Signal, Slot, component$, createContextId, noSerialize, useComputed$, useContextProvider, useSignal, useTask$ } from "@builder.io/qwik";
import { isBrowser, isServer } from "@builder.io/qwik/build"
import Clerk from "@clerk/clerk-js"
import type { ClientResource, InitialState, Resources } from '@clerk/types'
import { deriveState } from "../utils";

export const ClerkContext = createContextId<{
  clerk: Signal<NoSerialize<Clerk>>
  state: Signal<NoSerialize<Resources>>
  isClerkLoaded: Signal<boolean>
  derivedState: Signal<NoSerialize<ReturnType<typeof deriveState>>>
}>(
  'clerk.auth-context'
);

export const ClerkContextProvider = component$((props: {
  publishableKey?: string;
  initialState?: InitialState;
}) => {
  const isClerkLoaded = useSignal<boolean>(false);
  const clerk = useSignal<NoSerialize<Clerk>>()
  const { initialState, publishableKey } = props

  const state = useSignal<NoSerialize<Resources>>({
    user: clerk.value?.user,
    client: clerk.value?.client as ClientResource | undefined,
    organization: clerk.value?.organization,
    session: clerk.value?.session,
    lastOrganizationInvitation: null,
    lastOrganizationMember: null,
  });

  useTask$(() => {
    const run = async () => {
      if (isBrowser) {
        clerk.value = noSerialize(new Clerk(publishableKey || import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY))

        clerk.value?.load().then(() => {
          isClerkLoaded.value = true;

          clerk.value?.addListener($((emission: Resources) => {
            state.value = noSerialize(emission);
          }))
        })
      }
    }

    const promise = run();
    if (isServer) {
      return promise;
    } else {
      return
    }
  }, {
    eagerness: 'idle'
  })

  const initialStateNoSerialized = noSerialize(initialState);

  const derivedState = useComputed$(() => noSerialize(
    deriveState(isClerkLoaded.value, state.value as Resources, initialStateNoSerialized)
  ))

  useContextProvider(ClerkContext, {
    clerk,
    state,
    isClerkLoaded,
    derivedState,
  })

  return (
    <Slot/>
  );
})
