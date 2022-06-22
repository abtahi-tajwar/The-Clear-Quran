// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
export default function Masjid() {
  const astyle = {
    textAlign: `center`,
  };
  return (
    <div className={`masjid-container`}>
      <div className={`row`}>
        <div className={`col-md-12 col-sm-12`}>
          <a className={`home-tile`}>
            <i className={`fa fa-user-o`} aria-hidden="true"></i>
            <br />
            <span>profile</span>
          </a>
          <Link className={`home-tile`} to="/surah">
            <i className={`fa fa-file-text-o`} aria-hidden="true"></i>
            <br />
            <span>surah</span>
          </Link>
        </div>
      </div>
      <div className={`row`}>
        <div className={`col-md-12 col-sm-12`}>
          <div className="home-tile-row">
            <a className={`home-tile`}>
              <i className={`fa fa-file-text-o`} aria-hidden="true"></i>
              <br />
              <span>notes</span>
            </a>
            <a className={`home-tile`}>
              <i className={`fa fa-bookmark-o`} aria-hidden="true"></i>
              <br />
              <span>bookm.</span>
            </a>
            <a className={`home-tile`}>
              <i className={`fa fa-search`} aria-hidden="true"></i>
              <br />
              <span>search</span>
            </a>
          </div>
        </div>
      </div>
      <div className={`row`}>
        <div className={`col-md-12 col-sm-12`}>
          <a
            href={`https://alfurqaanfoundation.givingfuel.com/furqaan-project`}
            className={`home-tile`}
          >
            <i className={`fa fa-gift`} aria-hidden="true"></i>
            <br />
            <span>donate</span>
          </a>
          <a href={`https://theclearquran.org/`} className={`home-tile`}>
            <i className={`fa fa-shopping-cart`} aria-hidden="true"></i>
            <br />
            <span>buy</span>
          </a>
          <Link className={`home-tile`} to="/contact">
            <i className={`fa fa-phone`} aria-hidden="true"></i>
            <br />
            <span>contact</span>
          </Link>
          <a className={`home-tile`}>
            <i className={`fa fa-user-circle`} aria-hidden="true"></i>
            <br />
            <span>about</span>
          </a>
        </div>
      </div>

      {/* <div class="row">
            <div className={`col-md-12 col-sm-12`}>
                <div className={`contact-form-login`}>
                    <h4  style= {astyle}>Log in</h4>
                    <form asp-controller="Login" asp-action="Index" method="post" id="login-form">
                            <div id="recaptcha-container"></div>
                            <div id="firebaseui-auth-container"></div>
                            <div className={`form-group`}>
                                <label for="phoneNumber">Phone Number:</label>
                                <div className={`input-phone`}></div>
                            </div>

                            <div className={`form-group`} id="divOTPBtn" style={astyle}>
                                <button type="button" id="get-otp-btn-login" className={`btn tcq-button`} onclick="sendOTP()">Get OTP</button>
                            </div>

                            <div className={`form-group hidden`} id="divOTP">
                                <label for="password">OTP:</label>
                                <input type="password" className={`form-control`} id="otp" placeholder="Enter otp" name="otp" required/>
                            </div>
                            <div style={astyle}>
                                <button type="button" className={`btn btn-default hidden tcq-button`} id="contact-us-btn" onclick="confirmOTP()">Sign in</button>
                            </div>
                            <input type="hidden" asp-for="CountryCode" id="hiddenCountryCode" />
                            <input type="hidden" asp-for="PhoneNumber" id="hiddenPhoneNumber" />

                            <div id="divSubmitBtn">
                            </div>
                    </form>
                </div>
            </div>
        </div> */}
    </div>
  );
}
