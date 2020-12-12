import React, { useState } from "react";
import ChangeRegiserWindowCmp from "./ChangeRegiserWindowCmp";
import RegisterWindowCmp from "./RegisterWindowCmp";

export default function LoginPageCmp() {
  let [loginWindow, setloginWindow] = useState(true);

  return (
    <section className='login_page'>
      {loginWindow ? (
        <div className="login_window windows">     
          <RegisterWindowCmp
            button_name="LOGIN"
            title="Login"
            request="/login"
          />
          <ChangeRegiserWindowCmp
            text_window="Enter your personal detalis and start"
            button_name="SIGN UP"
            changeButton={() => {
              setloginWindow(false);
            }}
          />
        </div>
      ) : (
        <div className="create_account_window windows">
          <RegisterWindowCmp
            button_name="SIGN UP"
            title="Create Accounnt"
            request="/sign_up"
          />
          <ChangeRegiserWindowCmp
            text_window="To keep connected with us please login with your personal info"
            button_name="LOGIN"
            changeButton={() => {
              setloginWindow(true);
            }}
          />
        </div>
      )}
    </section>
  );
}
