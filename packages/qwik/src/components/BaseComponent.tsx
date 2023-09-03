import { component$, useVisibleTask$, useSignal, ValueOrPromise } from "@builder.io/qwik";
import { useClerkContext } from "../hooks/useClerkContext";
import Clerk from "@clerk/clerk-js";

export interface ComponentProps {
  mountFn$: (client: Clerk, ref: HTMLDivElement) => ValueOrPromise<void>;
  unmountFn$: (client: Clerk, ref: HTMLDivElement) => ValueOrPromise<void>;
}

export const BaseComponent = component$<ComponentProps>(({
  mountFn$,
  unmountFn$
}) => {
  const { isClerkLoaded, clerk } = useClerkContext();
  const elementRef = useSignal<HTMLDivElement>()

  useVisibleTask$(({ track, cleanup }) => {
    const isLoaded = track(() => isClerkLoaded.value)

    if (isLoaded && clerk.client) {
      elementRef.value && mountFn$(clerk.client as Clerk, elementRef.value)
    }

    cleanup(async () => {
      if (isLoaded && clerk.client && elementRef.value) {
        unmountFn$(clerk.client as Clerk, elementRef.value)
      }
    })
  })

  return (
    <>
      <div ref={elementRef}></div>
    </>
  );
})
