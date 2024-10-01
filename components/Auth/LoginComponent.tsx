import { ErrorMessage, Formik, Form as FormikForm } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as Yup from 'yup';
import useLoginHook from '../../hooks/AuthHooks/useLoginHook';
import logo from '../../public/assets/images/logo.png';
import LoginStyles from '../../styles/components/login.module.scss';

const validation = Yup.object().shape({
  usr: Yup.string().email(' Enter valid email').required(' Email field is required'),
  pwd: Yup.string().required(' Password field is required').min(6, ' Password is too short - should be 6 chars minimum.'),
});

function LoginComponent() {
  const { passwordHidden, togglePasswordIcon, fetchToken, loginBtnLoader } = useLoginHook();
  return (
    <Formik
      initialValues={{
        usr: '',
        pwd: '',
      }}
      validationSchema={validation}
      onSubmit={(values: any) => {
        fetchToken(values);
      }}
    >
      {({ handleChange, handleBlur, values }) => (
        <FormikForm>
          <div className="form-wrapper" id="wrapper-login">
            <div className="content-wrapper" id="content-signin">
              <div className="row mx-4 mx-sm-0">
                <div className={`offset-lg-4 offset-md-3 offset-sm-2 col-sm-8 col-12  col-lg-4 col-md-6 ${LoginStyles.main_column}`}>
                  <div className="row px-4">
                    <div className="col-12">
                      <div className="img">
                        <Link href="/" className="navbar-brand">
                          <Image src={logo} alt="logo" width={230} className="img-fluid mx-auto d-block mb-4 h-auto" priority={true} />
                        </Link>
                      </div>
                      <Form.Group controlId="formEmail">
                        <Form.Label>Email ID </Form.Label>
                        <Form.Control
                          onChange={handleChange}
                          type="text"
                          name="usr"
                          placeholder="Enter Email"
                          className={`${LoginStyles.emailfield}`}
                          onBlur={handleBlur}
                        />
                        <div className={`${LoginStyles.empty} mt-1`}>
                          <ErrorMessage name="usr" />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row px-4 mt-1 ">
                    <div className="col-12 mt-2">
                      <Form.Group controlId="formPassword">
                        <Form.Label>Password </Form.Label>
                        <InputGroup>
                          <Form.Control
                            onChange={handleChange}
                            type={passwordHidden ? 'password' : 'text'}
                            name="pwd"
                            placeholder="Enter Password"
                            onBlur={handleBlur}
                          />
                          <InputGroup.Text id="basic-addon2">
                            <span className={``}>
                              {passwordHidden ? (
                                <FaEyeSlash onClick={(e: any) => togglePasswordIcon(e)} />
                              ) : (
                                <FaEye onClick={(e: any) => togglePasswordIcon(e)} />
                              )}
                            </span>
                          </InputGroup.Text>
                        </InputGroup>
                        <div className={`${LoginStyles.empty} mt-1`}>
                          <ErrorMessage name="pwd" />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row px-4 mt-3">
                    <div className="col-12 d-flex justify-content-center">
                      <button type="submit" className={`${LoginStyles.btn_login} rounded w-100 mb-3 mt-2`}>
                        {loginBtnLoader ? (
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                          <span>LOGIN</span>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="not_an_account">
                      <span className="color-black">New to Summit?</span> <Link href="/register">Create an account</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
}

export default LoginComponent;
