import React, { Component } from "react";
import reactDom from "react-dom";
import PaidMessage from "../../getpaid";
// `    `

export default function Onboarding() {
  return (
    <>
      <div className={`row`}>
        <div className={`col-md-6 col-sm-8`}>
          <div className={`new-quran`}>
            <h6>The Clear</h6>
            <h1>Quran</h1>
            <h4>Translated By</h4>
            <h3>Dr.Mustafa Khattab</h3>
            <PaidMessage />
          </div>
        </div>
        <div class="col-md-2 col-sm-4">
          <div class="circle">
            <div class="share">
              <i class="fa fa-share-alt" aria-hidden="true"></i>
            </div>
            <ul>
              <li>
                <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://18.195.60.150:82/&amp;src=sdkpreparse">
                  <i class="fa fa-facebook" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://twitter.com/intent/tweet?url=http://18.195.60.150:82/&text=The%20Clear%20Quran">
                  <i class="fa fa-twitter" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.linkedin.com/shareArticle?mini=true&url=http://18.195.60.150:82/&title=The%20Clear%20Quran">
                  <i class="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://google.com/">
                  <i class="fa fa-google" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
