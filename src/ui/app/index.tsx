import Body from "ui/components/body";
import Footer from "ui/components/footer";
import Header from "ui/components/header";

import { storeContext } from "ui/contexts/store";
import userContext from "ui/contexts/user";

import { Pages } from "ui/pages";

export function App({ user, store }: { user: any; store: any }) {
  return (
    <userContext.Provider value={user}>
      <storeContext.Provider value={store}>
        <Header />
        <Body>
          <Pages />
        </Body>
        <Footer />
      </storeContext.Provider>
    </userContext.Provider>
  );
}

export default App;
