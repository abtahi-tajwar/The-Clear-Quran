import React from 'react'
import Navbar from '../../components/Navbar'
import styled from 'styled-components'
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux/es/exports';
import { Buttonbtn } from '../../Style.style';
import ConfirmationPopup from '../../components/ConfirmationPopup'
import axios from 'axios';
import { routes } from '../../routes';
import { useDispatch } from 'react-redux/es/exports';
import { update as userUpdate } from '../../redux/userSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';


function EditProfile() {
  const user = useSelector(data => data.user)
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(false)
  const [ confirmationPopup, setConfirmationPopup ] = React.useState({
      isOpen: false,
      text: "",
      error: false
  })
  React.useEffect(() => {
    if (user) {
      setInput({
        name: user.userName,
        email: user.emailId,
        about: user.aboutUs,
        address: user.address,
        city: user.city,
        country: user.country,
        zipcode: user.zipcode
      })
    }
  }, [])
  const [input, setInput] = React.useState({
    name: "",
    email: "",
    about: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: ""
  })
  const handleInput = e => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const updateUserInfo = () => {
    setLoading(true)
    axios.post(routes.updateUser, {
      userId: user.userId,
      userName: input.name,
      emailId: input.email,
      aboutUs: input.about,
      city: input.city,
      state: input.state,
      country: input.country,
      address: input.address,
      profilePicture: ""
    }).then(res => {
      setLoading(false)
      console.log(res.data)
      if(res.data.status === "Success") {
        // localStorage.setItem("user", res.data.response);
        dispatch(userUpdate(input))
        setConfirmationPopup({
          isOpen: true,
          text: "Profile Update",
          error: false
        })
      } else {
        setConfirmationPopup({
          isOpen: true,
          text: "Something went wrong",
          error: true
        })
      }
    })
  }
  
  return (
    <div>
      <Navbar />
      <Container>
        <Link className="go-back-btn" to="/profile"><ArrowBackIcon /> Go Back</Link>
        <h1 className="page-title">Edit Profile</h1>
        <TextField 
          id="outlined-basic" 
          label="Name" 
          variant="standard" 
          name="name"
          onChange={handleInput}
          value={input.name}
        />
        <TextField 
          id="outlined-basic" 
          label="Email" 
          variant="standard" 
          name="email"
          onChange={handleInput}
          value={input.email}
        />
        <TextField 
          id="outlined-basic" 
          label="About" 
          multiline
          rows={4}
          variant="standard" 
          name="about"
          onChange={handleInput}
          value={input.about}
        />
        <TextField 
          id="outlined-basic" 
          label="Address" 
          variant="standard" 
          name="address"
          onChange={handleInput}
          value={input.address}
        />
        <TextField 
          id="outlined-basic" 
          label="City" 
          variant="standard" 
          name="city"
          onChange={handleInput}
          value={input.city}
        />
        <TextField 
          id="outlined-basic" 
          label="State" 
          variant="standard" 
          name="state"
          onChange={handleInput}
          value={input.state}
        />
        <TextField 
          id="outlined-basic" 
          label="Country" 
          variant="standard" 
          name="country"
          onChange={handleInput}
          value={input.country}
        />
        <TextField 
          id="outlined-basic" 
          label="Zip" 
          variant="standard" 
          name="zip"
          onChange={handleInput}
          value={input.zip}
        />
        <Buttonbtn style={{ marginTop: '30px'}} disabled={loading} onClick={updateUserInfo}>Update</Buttonbtn>
      </Container>
      <ConfirmationPopup show={confirmationPopup.isOpen} text={confirmationPopup.text} error={confirmationPopup.error} />
    </div>
  )
}
const Container = styled.div`
  width: 90%;
  max-width: 960px;
  margin: 0 auto;
  margin-top: 30px;
  .go-back-btn {
    background: transparent;
    text-decoration: none;
    padding: 10px 15px;
    border: none;
    outline: none;
    transition: background .2s ease-out;
    border-radius: 4px;
    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }
  }
  .MuiFormControl-root {
    width: 100%;
  }
  h1 {
    text-align: center;
    margin-bottom: 30px;
  }
`

export default EditProfile