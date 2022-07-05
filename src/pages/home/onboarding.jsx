import React, { Component } from 'react';
import reactDom from 'react-dom';
import PaidMessage from '../../getpaid';
// `    `


export default function Onboarding (){
    return(
        <React.Fragment>
        <div className ={`row`}>
            <div className = {`col-md-6 col-sm-8`}>
                <div className = {`new-quran`}>
                <h6>The Clear</h6>
                <h1>Quran&trade;</h1>
                <h4>Translated By</h4>
                <h3>Dr.Mustafa Khattab</h3>
                <PaidMessage />
                </div>
            </div>
        </div>
        

        </React.Fragment>
    );
}