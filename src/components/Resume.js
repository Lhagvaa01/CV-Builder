import React, { Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import Profile from './Profile';
import About from './About';
import GeneralInfo from './GeneralInfo';
import FamilyInfo from './FamilyInfo';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import { NavLink } from 'react-router-dom';

function Resume() {
  return (
    <Fragment>

      <Container fluid className="p-0 top-image"></Container>
      <Container>

        <Profile></Profile>

        <About></About>

        <GeneralInfo></GeneralInfo>

        <FamilyInfo></FamilyInfo>

        <Experience></Experience>

        <Education></Education>

        <Skills></Skills>

        <div className="d-grid col-2 mx-auto my-4 text-center">
          <NavLink className="nav-link align-middle bg-dark text-white p-2 rounded" to="/preview">Үүсгэх</NavLink>
        </div>
        <div className="d-grid col-2 mx-auto my-4 text-center">
          <NavLink className="nav-link align-middle bg-dark text-white p-2 rounded" to="/preview2">Үүсгэх 2</NavLink>
        </div>

      </Container>
    </Fragment>
  )
}

export default Resume