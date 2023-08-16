import { useComputed$, useContext } from "@builder.io/qwik";
import { ClerkContext } from "../contexts";

export const useClerkContext = () => {
  const context = useContext(ClerkContext);

  if (!context) {
    throw new Error('ClerkContextProvider not found');
  }

  return context;
};

export const useClerk = () => {
  const { clerk } = useClerkContext();

  return clerk;
}

export const useUser = () => {
  const { derivedState } = useClerkContext();

  const state = useComputed$(() => {
    const user = derivedState.value?.user
    if (user === undefined) {
      return { isLoaded: false, isSignedIn: undefined, user: undefined };
    }

    if (user === null) {
      return { isLoaded: true, isSignedIn: false, user: null };
    }

    return { isLoaded: true, isSignedIn: true, user };
  })

  return state;
}
