import type {
  ActiveSessionResource,
  InitialState,
  MembershipRole,
  OrganizationResource,
  UserResource,
} from "@clerk/types";
import { Resources } from "../contexts";
import { noSerialize } from "@builder.io/qwik";

export const deriveState = (
  clerkLoaded: boolean,
  state: Resources,
  initialState: InitialState | undefined,
) => {
  if (!clerkLoaded && initialState) {
    return deriveFromSsrInitialState(initialState);
  }

  return deriveFromClientSideState(state);
};

const deriveFromSsrInitialState = (initialState: InitialState) => {
  const userId = initialState.userId;
  const user = noSerialize(initialState.user as any as UserResource);
  const sessionId = initialState.sessionId;
  const session = noSerialize(initialState.session as any as ActiveSessionResource);
  const organization = noSerialize(initialState.organization as any as OrganizationResource);
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
  const userId: string | null | undefined = state.user
    ? state.user.id
    : state.user;
  const user = state.user;
  const sessionId: string | null | undefined = state.session
    ? state.session.id
    : state.session;
  const session = state.session;
  const actor = session?.actor;
  const organization = state.organization;
  const orgId: string | null | undefined = state.organization
    ? state.organization.id
    : state.organization;
  const orgSlug = organization?.slug;
  const membership = organization
    ? user?.organizationMemberships?.find((om) => om.organization.id === orgId)
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
