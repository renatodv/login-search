import Typography from "@material-ui/core/Typography";

import SearchLogin from "../components/SearchLogin";
import LoginResults from "../components/LoginResults.tsx";

/**
 * Index page to load all the required components.
 */
const IndexPage = () => {
  return (
    <>
      <Typography variant="h4">Search for github logins</Typography>
      <br />
      <SearchLogin />
      <br />
      <LoginResults />
      <br />
    </>
  );
};

export default IndexPage;
