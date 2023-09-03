import { ClerkContextProvider } from "./contexts";
import Test from './components/test'

export default () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <ClerkContextProvider
          afterSignInUrl="/"
          appearance={{
            layout: {
              privacyPageUrl: '/privacy',
              helpPageUrl: '/help',
            }
          }}>
          <Test></Test>
        </ClerkContextProvider>
      </body>
    </>
  );
};
