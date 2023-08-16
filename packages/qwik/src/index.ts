export * from "./hooks";
export * from "./contexts";

// export function clerkAuthQrl(
//   authOptions: QRL<(ev: RequestEventBase) => QwikAuthConfig>
// ) {
//   const authenticateRequest = $(async function (ev: RequestEventBase) {
//     const auth = await authOptions(ev);
//     const cookieToken = ev.cookie.get(constants.Cookies.Session)?.value;
//     const headerToken = ev.headers
//       .get("authorization")
//       ?.replace("Bearer ", "");

//     const requestState = await createClerkClient(auth).authenticateRequest({
//       secretKey: auth.secretKey || ev.env.get("CLERK_SECRET_API_KEY") || "",
//       frontendApi:
//         auth.frontendApi || ev.env.get("PUBLIC_CLERK_FRONTEND_API") || "",
//       publishableKey:
//         auth.publishableKey,
//       cookieToken,
//       headerToken,
//       clientUat: ev.cookie.get(constants.Cookies.ClientUat)?.value,
//       host: ev.headers.get("host") as string,
//       origin: ev.headers.get("origin") || undefined,
//       forwardedHost: ev.headers.get("x-forwarded-host") || undefined,
//       forwardedPort: ev.headers.get("x-forwarded-port") || undefined,
//       referrer: ev.headers.get("referer") || undefined,
//       userAgent: ev.headers.get("user-agent") || undefined,
//       domain: auth.domain || (ev.env.get("PUBLIC_CLERK_DOMAIN") as string),
//       signInUrl: auth.signInUrl || ev.env.get("PUBLIC_CLERK_SIGN_IN_URL"),
//     });

//     return requestState;
//   });

//   const onRequest = async (req: RequestEvent) => {
//     const auth = await authOptions(req);
//     const requestState = await authenticateRequest(req);

//     console.log("authOptions nnnew", auth);
//     if (requestState.isUnknown) {
//       οbservabilityHeadersFromRequestState(requestState, req);
//       throw req.text(401, "");
//     }

//     if (requestState.isInterstitial) {
//       οbservabilityHeadersFromRequestState(requestState, req);
//       console.log("interstitialUrl", requestState);

//       const interstitialUrl = await createClerkClient(auth).remotePublicInterstitialUrl({
//         apiUrl: auth.apiUrl || "https://api.clerk.dev",
//         frontendApi: auth.frontendApi || "",
//         publishableKey: auth.publishableKey || "",
//         pkgVersion: "v1",
//         proxyUrl: requestState.proxyUrl as any,
//         isSatellite: requestState.isSatellite as any,
//         domain: requestState.domain as any,
//         signInUrl: requestState.signInUrl as any,
//         debugData: debugRequestState(requestState),
//       })

//       throw req.redirect(302, interstitialUrl);
//     }

//     req.sharedMap.set(constants.Attributes.AuthStatus, requestState.status);
//     req.sharedMap.set(constants.Attributes.AuthMessage, requestState.message || "");
//     req.sharedMap.set(constants.Attributes.AuthReason, requestState.reason || "");

//     throw await req.next();
//   };

//   return {
//     onRequest,
//   };
// }

// export const clerkAuth$ = implicit$FirstArg(clerkAuthQrl);

// export * from "@clerk/backend";
