// import { RequestEvent } from "@builder.io/qwik-city";
// import { RequestState, constants } from "@clerk/backend";
import type { ActiveSessionResource, InitialState, OrganizationResource, Resources, UserResource } from '@clerk/types';
import type { MembershipRole } from '@clerk/types';

export function isHttpOrHttps(key: string | undefined) {
  return /^http(s)?:\/\//.test(key || '');
}

export function isDevelopmentFromApiKey(apiKey: string): boolean {
  return apiKey.startsWith('test_') || apiKey.startsWith('sk_test_');
}

// export const οbservabilityHeadersFromRequestState = (requestState: RequestState, req: RequestEvent): void => {
//   if (requestState.message) {
//     req.headers.set(constants.Headers.AuthMessage, requestState.message);
//   }
//   if (requestState.reason) {
//     req.headers.set(constants.Headers.AuthReason, requestState.reason);
//   }
//   if (requestState.status) {
//     req.headers.set(constants.Headers.AuthStatus, requestState.status);
//   }
// };

/**
 * Wraps obscured clerk internals with a readable `clerkState` key.
 * This is intended to be passed by the user into <ClerkProvider>
 *
 * @internal
 */
export const wrapWithClerkState = (data: any) => {
  return { clerkState: { __internal_clerk_state: { ...data } } };
};

export const deriveState = (clerkLoaded: boolean, state: Resources, initialState: InitialState | undefined) => {
  if (!clerkLoaded && initialState) {
    return deriveFromSsrInitialState(initialState);
  }
  return deriveFromClientSideState(state);
};

const deriveFromSsrInitialState = (initialState: InitialState) => {
  const userId = initialState.userId;
  const user = initialState.user as any as UserResource;
  const sessionId = initialState.sessionId;
  const session = initialState.session as any as ActiveSessionResource;
  const organization = initialState.organization as any as OrganizationResource;
  const orgId = initialState.orgId;
  const orgRole = initialState.orgRole as MembershipRole;
  const orgSlug = initialState.orgSlug;
  const actor = initialState.actor;

  return {
    userId,
    user,
    sessionId,
    session,
    organization,
    orgId,
    orgRole,
    orgSlug,
    actor,
    lastOrganizationInvitation: null,
    lastOrganizationMember: null,
  };
};

const deriveFromClientSideState = (state: Resources) => {
  const userId: string | null | undefined = state.user ? state.user.id : state.user;
  const user = state.user;
  const sessionId: string | null | undefined = state.session ? state.session.id : state.session;
  const session = state.session;
  const actor = session?.actor;
  const organization = state.organization;
  const orgId: string | null | undefined = state.organization ? state.organization.id : state.organization;
  const orgSlug = organization?.slug;
  const membership = organization
    ? user?.organizationMemberships?.find(om => om.organization.id === orgId)
    : organization;
  const orgRole = membership ? membership.role : membership;

  const lastOrganizationInvitation = state.lastOrganizationInvitation;
  const lastOrganizationMember = state.lastOrganizationMember;

  return {
    userId,
    user,
    sessionId,
    session,
    organization,
    orgId,
    orgRole,
    orgSlug,
    actor,
    lastOrganizationInvitation,
    lastOrganizationMember,
  };
};
