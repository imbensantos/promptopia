import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Promptopia",
  description: "Store & Share AI Prompts",
  icons: {
    icon: '/assets/images/logo.svg'
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
  }
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true} // this is to prevent browser extensions from causing a server/client mismatch
      >
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
