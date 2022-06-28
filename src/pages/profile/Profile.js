import React from 'react'
import styled from 'styled-components'
import BlankDisplayPicture from '../../images/blank-dp.png'
import { colors } from '../../Style.style'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useSelector } from 'react-redux/es/exports';
import { ClipLoader } from 'react-spinners';

function Profile() {
    const data = useSelector(data => data)
    const user = data.user
    const notes = data.notes.length
  return (
    <Wrapper>
        <div className="background"></div>
        { user ? <div className="details">
            <div className="main-info">
                <div className="top-part">
                    <div className="avatar-container"><img src={BlankDisplayPicture} /></div>
                    <h2>{user.userName ? user.userName : <i>"Please set your name first"</i>}</h2>
                    <p><b>{(user.city || user.country) ? `${user.city}, ${user.country}` : <i>"Add your location first"</i>}</b></p>
                </div>
                <div className="bottom-part">
                    <div className="phone"><PhoneInTalkIcon /><span>+{user.countryCode+user.phoneNumber}</span></div>
                    <div className="divider"></div>
                    <div className="email"><MailOutlineIcon /><span>{user.emailId ? user.emailId : <i>"Please add your email first"</i>}</span></div>
                </div>
            </div>
            <div className="about-yourself">
                <h2>About Yourself</h2>
                <p>Tell us something about yourself</p>
            </div>
            <div className="info-box">
                <div className="box"><span>0</span><span>BOOKMARKS</span></div>
                <div className="box"><span>{notes}</span><span>NOTES</span></div>
            </div>
        </div> : <ClipLoader />}
    </Wrapper>
  )
}
const Wrapper = styled.div`
    width: 100%;
    * {
        margin: 0;
        padding: 0;
    }
    .background {
        height: 400px;
        background-color: ${colors.base};
    }
    .details {
        width: 90%;
        max-width: 800px;
        margin: 0 auto;
        background-color: white;
        margin-top: -230px;
        border-radius: 6px;
        .main-info {
            width: 100%;
            box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.09);
            border-radius: 6px;
            .top-part {
                margin-bottom: 30px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .avatar-container {
                    height: 150px;
                    width: 150px;
                    margin-top: -80px;
                    background-color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;
                    overflow: hidden;
                    box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.09);
                    & > img {
                        height: 95%;
                        width: 95%;
                        border-radius: 50%;
                    }                    
                }                
                & > h2 {
                    margin-top: 15px;
                }
            }
            .bottom-part {
                width: 100%;
                display: flex;
                align-items: center;
                border-top: 1px solid black;
                & > div:not(.divider) {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100px;
                    font-weight: bold;
                    & > svg {
                        transform: scale(1.2);
                    }
                    & > span {
                        color: ${colors.gray};
                        font-size: 1rem;
                    }
                    
                }  
                & > .divider {
                    width: 1px;
                    height: 80px;
                    background-color: black;
                }              
            }
        }
        .about-yourself {
            width: 100%;
            box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.09);
            border-radius: 6px;
            padding: 20px;
            margin-top: 10px;
            position: relative;
            &::before {
                content: "";
                display: block;
                position: absolute;
                left: 20px;
                top: 0px;
                height: 7px;
                width: 150px;
                background-color: ${colors.base};
                border-bottom-left-radius: 20px;
                border-bottom-right-radius: 20px;
            }
            & > h2 {
                font-size: 1.2rem;
                margin-bottom: 10px;
            }
            & > p {
                color: ${colors.gray};
                font-weight: bold;
                font-size: 0.8rem;
            }

        }
        .info-box {
            margin-top: 10px;
            width: 100%;
            display: flex;
            gap: 20px;
            & > .box {
                flex: 1;
                box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.09);
                border-radius: 6px;
                height: 100px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-weight: bold;
                font-size: 1.2rem;
            }
        }
    }
`

export default Profile