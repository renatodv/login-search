import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { LoginContext } from "../../providers/LoginProvider";

const validationSchema = yup.object({
  login: yup.string().required("Login is required."),
});

const SearchLogin = () => {
  const { getResults } = React.useContext(LoginContext);
  const formik = useFormik({
    initialValues: {
      login: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      getResults(values.login);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <TextField
            fullWidth
            id="login"
            name="login"
            label="Login"
            value={formik.values.login}
            onChange={formik.handleChange}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
            variant="outlined"
            inputProps={{ "data-testid": "search-login-input" }}
          />
        </div>
        <br />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchLogin;
