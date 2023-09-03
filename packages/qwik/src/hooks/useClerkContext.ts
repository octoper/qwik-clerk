import { useContext } from "@builder.io/qwik";
import { ClerkContext } from "../contexts";

export const useClerkContext = () => {
  const context = useContext(ClerkContext);

  if (!context) {
    throw new Error('ClerkContextProvider not found');
  }

  return context;
};
