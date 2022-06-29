import React from 'react'
import styled from 'styled-components'
import Navbar from '../../components/Navbar'
import { Container } from '../../Style.style'
import TextField from '@mui/material/TextField';
import { Buttonbtn } from '../../Style.style';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { routes } from '../../routes';
import { useSelector } from 'react-redux/es/exports';
import ConfirmationPopup from '../../components/ConfirmationPopup';

function Contact() {
    const form = React.useRef();
    const user = useSelector(data => data.user)
    const userId = user ? user.userId : -1
    const [input, setInput] = React.useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })
    const [loading, setLoading] = React.useState(false)
    const [ confirmationPopup, setConfirmationPopup ] = React.useState({
        isOpen: false,
        text: "",
        error: false
    })
    const handleInput = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleSend = e => {
        e.preventDefault()
        setLoading(true)
        axios.post(routes.contactUs, {
            UserId: userId,
            Name: input.name,
            PhoneNumber: input.phone,
            email: input.email,
            description: input.message
        }).then(res => {
            setLoading(false)
            if(res.data.status === 'Success') {
                setConfirmationPopup({
                    isOpen: true,
                    text: "Thanks for reaching us out! You'll get response soon inshallah",
                    error: false
                })
                setInput({
                    name: "",
                    email: "",
                    phone: "",
                    message: ""
                })
            } else {
                setConfirmationPopup({
                    isOpen: true,
                    text: "Sorry! Something went wrong.",
                    error: true
                })
            }
        })
        // emailjs.sendForm('clearqurantest_101', 'template_juo37fb', form.current, 'NxWbGthDPCvRUE81g')
        //     .then((result) => {
        //         console.log(result.text);
        //     }, (error) => {
        //         console.log(error.text);
        // });
    }
  return (
    <Wrapper>
        <Navbar />
        <div className="contact-page-container">
            <h2>Contact Us</h2>
            <form ref={form} onSubmit={handleSend} className="contact-form-container">
                <TextField 
                    id="standard-basic" 
                    label="Name" 
                    variant="standard"
                    name="name"
                    value={input.name}
                    onChange={handleInput}
                />
                <TextField 
                    id="standard-basic" 
                    label="Email" 
                    variant="standard"
                    name="email"
                    value={input.email}
                    onChange={handleInput}
                />
                <input type="hidden" name="to_name" value="Abtahi Tajwar" />
                <TextField 
                    id="standard-basic" 
                    label="Phone" 
                    variant="standard"
                    name="phone"
                    value={input.phone}
                    onChange={handleInput}
                />
                <TextField
                    id="standard-multiline-static"
                    label="Your message to us"
                    multiline
                    rows={4}
                    variant="standard"
                    name="message"
                    value={input.message}
                    onChange={handleInput}
                />
                <Buttonbtn type="submit" disabled={loading} value="Send">Send</Buttonbtn>
            </form>                       
        </div>
        <ConfirmationPopup show={confirmationPopup.isOpen} text={confirmationPopup.text} error={confirmationPopup.error} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
    width: 100%;
    .contact-page-container {
        max-width: 90%;
        width: 500px;        
        margin: 0 auto;
        margin-top: 100px;
        text-align: center;
        box-shadow: 0px 3px 11px rgba(0, 0, 0, 0.08);
        padding: 30px;
    }
    .contact-form-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
`

export default Contact