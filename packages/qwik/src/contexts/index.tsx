import {
  NoSerialize,
  Signal,
  Slot,
  component$,
  createContextId,
  noSerialize,
  useComputed$,
  useContextProvider,
  useSignal,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import { isBrowser, isServer } from "@builder.io/qwik/build";
import Clerk from "@clerk/clerk-js";
import { Resources as ClerkResoures } from "@clerk/types";
import type {
  ActiveSessionResource,
  ClerkOptions,
  ClientResource,
  InitialState,
  OrganizationInvitationResource,
  OrganizationMembershipResource,
  OrganizationResource,
  UserResource,
} from "@clerk/types";
import { deriveState } from "../utils";

export interface Resources {
  client: NoSerialize<ClientResource | null>;
  session: NoSerialize<ActiveSessionResource | null>;
  user: NoSerialize<UserResource> | null;
  organization: NoSerialize<OrganizationResource | null>;
  lastOrganizationInvitation: NoSerialize<OrganizationInvitationResource | null>;
  lastOrganizationMember: NoSerialize<OrganizationMembershipResource | null>;
}

export interface ClerkStore {
  client: NoSerialize<Clerk>;
}

export const ClerkContext = createContextId<{
  clerk: ClerkStore;
  state: Resources;
  isClerkLoaded: Signal<boolean>;
  derivedState: Signal<ReturnType<typeof deriveState>>;
}>("clerk.auth-context");

type ClerkContextProviderProps = {
  publishableKey?: string;
  initialState?: InitialState;
} & ClerkOptions;

export const ClerkContextProvider = component$<ClerkContextProviderProps>(
  (props) => {
    const isClerkLoaded = useSignal<boolean>(false);
    const clerk = useStore<ClerkStore>({
      client: undefined,
    });
    const { initialState, publishableKey, ...options } = props;

    const client = clerk.client?.client;
    const state = useStore<Resources>({
      client: noSerialize(client),
      user: noSerialize(clerk.client?.user ?? undefined),
      organization: noSerialize(clerk.client?.organization ?? undefined),
      session: noSerialize(clerk.client?.session ?? undefined),
      lastOrganizationInvitation: undefined,
      lastOrganizationMember: undefined,
    });

    useTask$(
      () => {
        const run = async () => {
          if (isBrowser) {
            clerk.client = noSerialize(
              new Clerk(
                publishableKey || import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
              ),
            );

            // eslint-disable-next-line qwik/valid-lexical-scope
            clerk.client?.load(options).then(() => {
              isClerkLoaded.value = true;

              clerk.client?.addListener((emission: ClerkResoures) => {
                state.client = noSerialize(emission.client);
                state.user = noSerialize(emission.user ?? undefined);
                state.organization = noSerialize(
                  emission.organization ?? undefined,
                );
                state.session = noSerialize(emission.session ?? undefined);
                state.lastOrganizationInvitation = noSerialize(
                  emission.lastOrganizationInvitation ?? undefined,
                );
                state.lastOrganizationMember = noSerialize(
                  emission.lastOrganizationMember ?? undefined,
                );
              });
            });
          }
        };

        const promise = run();
        if (isServer) {
          return promise;
        } else {
          return;
        }
      },
      {
        eagerness: "idle",
      },
    );

    const initialStateNoSerialized = noSerialize(initialState);

    const derivedState = useComputed$(() =>
      deriveState(isClerkLoaded.value, state, initialStateNoSerialized),
    );

    useContextProvider(ClerkContext, {
      clerk,
      state,
      isClerkLoaded,
      derivedState,
    });

    return <Slot />;
  },
);
