import React, { Fragment, useState  } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {MdEdit, MdClose} from 'react-icons/md';
import {HiLocationMarker, HiOutlineMail,HiPhone} from 'react-icons/hi';
import { BsGithub, BsLinkedin, BsGlobe} from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';

function Profile() {

    const profile = useSelector(state => state.profile)
    const file = useSelector(state => state.file)
    const dispatch = useDispatch();
    const {manageProfile, manageFile} = bindActionCreators(actionCreators, dispatch);

    // const [file, setFile] = useState("./images/profile.jpg");
    function handleFile(e) {
        manageFile(URL.createObjectURL(e.target.files[0]));
        // setFile(URL.createObjectURL(e.target.files[0]));
    }
    // const [profile,setProfile] = useState({
    //     name: "Your Name",
    //     location: "City, Name",
    //     github: "",
    //     linkedin: "",
    //     website: "",
    // })

    const handleProfile = (e) => {
        manageProfile({
                    ...profile,
                    [e.target.name]:e.target.value
                })
        // setProfile((old)=>{
        //     return {
        //         ...old,
        //         [e.target.name]:e.target.value
        //     }
        // })
    }

  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileURL, setProfileURL] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAlertHide = () => {
        setProfileName("");
        setProfileURL("");
        setAlert(false)
    };
    const handleAlertShow = (Profile,Link) => {
        setProfileName(Profile);
        setProfileURL(Link);
        setAlert(true)
    };
  

  return (
    
    <Fragment>
        <Row className="justify-content-center">
            <Col md={8} sm={12} className="d-flex justify-content-between img-column">
                <img src={file} className="profile-image" alt="..."></img>
                
                <MdEdit size={30} className="rounded edit" onClick={handleShow}/>
            </Col>
        </Row>
        <Row className="justify-content-center mt-2">
            <Col md={4} sm={6}>
                <Col>
                    <h4>{profile.name}</h4>
                </Col>
                <Col className="d-flex justify-content-start">
                    <HiLocationMarker size={30} className="p-1"/><p className="p-1 m-0">{profile.location}</p>
                </Col>
            </Col>
            <Col md={4} sm={6} className="d-flex flex-wrap">
                <p className="p-1 m-0" onClick={()=>handleAlertShow("LinkedIn URL",profile.linkedin)}><BsLinkedin size={30} className="p-1"/>LinkedIn URL</p>
                <p className="p-1 m-0" onClick={()=>handleAlertShow("GitHub URL",profile.github)}><BsGithub size={30} className="p-1"/>GitHub URL</p>
                <p className="p-1 m-0" onClick={()=>handleAlertShow("Portfolio",profile.website)}><BsGlobe size={30} className="p-1"/>Portfolio</p>
                <p className="p-1 m-0" onClick={()=>handleAlertShow("Э-Мэйл хаяг",profile.email)}><HiOutlineMail size={30} className="p-1"/>Э-Мэйл хаяг</p>
                <p className="p-1 m-0" onClick={()=>handleAlertShow("Холбоо барих",profile.contact)}><HiPhone size={30} className="p-1"/>Холбоо барих</p>
            </Col>
            
        </Row>
        <Modal show={show} onHide={handleClose} centered backdrop="static">
            <Modal.Header>
                <Modal.Title>Дэлгэрэнгүй мэдээлэл</Modal.Title>
                <MdClose size={30} className="rounded edit" onClick={handleClose}/>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" name="name" size="sm" placeholder="Овог нэр" value={profile.name} onChange={handleProfile}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" name="location" size="sm" placeholder="City, Country" value={profile.location} onChange={handleProfile}/>
                    </Form.Group>
                    
                   
                    <Form.Group className="mb-3">
                        <Form.Control type="email" name="email" size="sm" placeholder="Э-Мэйл хаяг" value={profile.email} onChange={handleProfile}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="number" name="contact" size="sm" placeholder="Утасны дугаар" value={profile.contact} onChange={handleProfile}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" name="github" size="sm" placeholder="GitHub хаяг" value={profile.github} onChange={handleProfile}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" name="linkedin" size="sm" placeholder="LinkedIn хаяг" value={profile.linkedin} onChange={handleProfile}/>
                    </Form.Group>
                    <Form.Group controlId="formFileSm" className="mb-3">
                        <Form.Label>Profile зураг</Form.Label>
                        <Form.Control type="file" size="sm" onChange={handleFile}/>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <button type="submit" className="rounded edit px-2" onClick={handleClose}>
                    Хадгалах
                </button>
            </Modal.Footer>
        </Modal>
        <Modal show={alert} onHide={handleAlertHide}>
            <Modal.Header>
                <Modal.Title>{profileName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{profileURL}</Modal.Body>
        </Modal>
    </Fragment>
    
  )
}

export default Profile