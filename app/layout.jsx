import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Promptopia",
  description: "Store & Share AI Prompts",
  icons: {
    icon: '/assets/images/logo.svg'
  }
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body
        className="sm:h-screen"
        suppressHydrationWarning={true} // this is to prevent browser extensions from causing a server/client mismatch
      >
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app sm:h-full">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
