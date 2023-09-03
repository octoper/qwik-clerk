import { useComputed$ } from "@builder.io/qwik";
import { useClerkContext } from "./useClerkContext";

export const useUser = () => {
  const { derivedState } = useClerkContext();

  const state = useComputed$(() => {
    const user = derivedState.value.user

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
