import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MdAddCircleOutline, MdEdit, MdClose, MdDelete } from 'react-icons/md';
import { GiGraduateCap } from 'react-icons/gi';
import { BsFilePerson } from "react-icons/bs";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ImCheckmark, ImCross } from 'react-icons/im'
import Years from '../smallComponents/Years';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';
import Months from '../smallComponents/Months';

function GeneralInfo() {

  const generalInfoList = useSelector(state => state.generalInfoList)
  const dispatch = useDispatch();
  const {addGeneralInfo, editGeneralInfo, removeGeneralInfo} = bindActionCreators(actionCreators, dispatch);

  const [show, setShow] = useState(false);
  const [Alert, setAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleClose = () => {
    setValidated(false);
    setShow(false);
    setForm({
      id: "",
      familyName: "",
      parentsName: "",
      name: "",
      gender: "",
      birthDate: "",
      idNumber: "",
      maritalStatus: "",
      driversLisence: "",
      isEdit: false
    })
  }
  const handleShow = () => setShow(true);
  const handleAlertClose = () => setAlert(false);
  const handleAlert = (id) => {
    setDeleteId(id)
    setAlert(true);
  }


  // const [list, setList] = useState([]);
  const [form, setForm] = useState({
    id: "",
    familyName: "",
    parentsName: "",
    name: "",
    gender: "",
    birthDate: "",
    address: "",
    idNumber: "",
    maritalStatus: "",
    driversLisence: "",
    isEdit: false
  });
  const handleForm = (e) => {
    setForm((old) => {
      return {
        ...old,
        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
      }
    })
  }


  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const x = event.currentTarget;
    if (!x.checkValidity()) {
      setValidated(true);
    }
    else {
      if (form.isEdit) {
        editGeneralInfo(form)
        // list[form.id] = form;
        // setList(list);
      }
      else {
        addGeneralInfo(form);
        // const newList = list.concat({ ...form });
        // setList(newList);
      }
      setShow(false);
      setForm({
        id: "",
        familyName: "",
        parentsName: "",
        name: "",
        gender: "",
        birthDate: "",
        address: "",
        idNumber: "",
        maritalStatus: "",
        driversLisence: "",
        isEdit: false
      })
    }

  }

  const handleEdit = (id) => {
    const form = generalInfoList[id];
    form.isEdit = true;
    form.id = id
    setForm(form)
    setShow(true);
  }

  const handleDelete = (id) => {
    removeGeneralInfo(id);
    // list.splice(id, 1);
    // setList(list);
    setAlert(false);
  }
  

  const [bDateY, setBdateY] = useState("2000");
  const [bDateM, setBdateM] = useState("01");
  const [bDateD, setBdateD] = useState("01");

  const handleYearChange = event => {
    const { value } = event.target;
    setBdateY(value);
    setForm(prevForm => ({
        ...prevForm,
        birthDate: `${bDateY}:${bDateM}:${value}`
      }));
    handleForm(event);
  };
  const handleMonthChange = event => {
    const { value } = event.target;
    setBdateM(value);
    setForm(prevForm => ({
        ...prevForm,
        birthDate: `${bDateY}:${bDateM}:${value}`
      }));
    handleForm(event);
  };
  const handleDayChange = event => {
    const { value } = event.target;
    setBdateD(value);
    setForm(prevForm => ({
        ...prevForm,
        birthDate: `${bDateY}:${bDateM}:${value}`
      }));
    handleForm(event);
  };

  
//   const handleMonthChange = event => {
//     const { value } = event.target;
//     setBdate(prevState => ({ ...prevState, birthMonth: value, birthDate: `${form.birthDate.split(':')[0]}:${value}:${form.birthDay}` }));
//   };
  
//   const handleDayChange = event => {
//     const { value } = event.target;
//     setBdate(prevState => ({ ...prevState, birthDay: value, birthDate: `${form.birthDate.split(':')[0]}:${form.birthMonth}:${value}` }));
//   };

  return (
    <Row className="justify-content-center mt-2">
      <Col md={8} sm={12} className="d-flex justify-content-between align-items-center bg-light rounded">
        <h5 className="m-0">Ерөнхий мэдээлэл</h5>
        <MdAddCircleOutline size={30} className="rounded edit" onClick={handleShow} />
      </Col>
      <Col md={8} sm={12}>
        {
          generalInfoList.map((item, id) => {
            return (
              <Row className="border-bottom pt-3" key={id}>

                <Col md={10} className="d-flex justify-content-start">
                  <BsFilePerson  size={50} className="rounded color-blue bg-grey p-1 shadow-sm" />
                  <div className="px-3">
                    <h5 className="m-0">{item.familyName}</h5>
                    <p className="text-muted m-0">{item.birthDate} • {item.idNumber}</p>
                  </div>

                </Col>
                <Col md={2}>
                  <div className="d-flex flex-wrap justify-content-end">
                      <MdEdit size={30} className="rounded edit" onClick={() => {handleEdit(id)}}/>
                      <MdDelete size={30} className="rounded edit" onClick={() => {handleAlert(id)}}/>

                  </div>
                </Col>

              </Row>
            )
          })
        }

      </Col>
      <Modal show={show} onHide={handleClose} centered scrollable={true} backdrop="static">
        <Modal.Header>
          <Modal.Title>Ерөнхий мэдээлэл</Modal.Title>
          <MdClose size={30} className="rounded edit" onClick={handleClose} />
        </Modal.Header>

        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Ургийн овог</Form.Label>
              <Form.Control required type="text" name="familyName" size="sm" placeholder="Ex: Боржигон" value={form.familyName} onChange={handleForm} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Эцэг/эхийн нэр</Form.Label>
              <Form.Control required type="text" name="parentsName" size="sm" placeholder="Ex: Бат" value={form.parentsName} onChange={handleForm} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Хүйс</Form.Label>
              <Form.Control required type="text" name="gender" size="sm" placeholder="Ex: Эм" value={form.gender} onChange={handleForm} />
            </Form.Group>
            <Form.Group className="mb-3">
            <Col>
                <Row>
                <Form.Label>Төрсөн огноо</Form.Label>
                </Row>
                <Row>
                    <Col>
                        <select
                        title={bDateY}
                        name="birthDate"
                        value={bDateY}
                        onChange={handleYearChange}
                        className="form-select"
                        >
                        {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                            <option key={year} value={year}>
                            {year}
                            </option>
                        ))}
                        </select>
                    </Col>
                    <Col>
                        <select
                        title={bDateM}
                        name="birthMonth"
                        value={bDateM}
                        onChange={handleMonthChange}
                        className="form-select"
                        >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                            <option key={month} value={month}>
                            {month}
                            </option>
                        ))}
                        </select>
                    </Col>
                    <Col>
                        <select
                        title={bDateD}
                        name="birthDay"
                        value={bDateD}
                        onChange={handleDayChange}
                        className="form-select"
                        >
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                            <option key={day} value={day}>
                            {day}
                            </option>
                        ))}
                        </select>
                    </Col>
                </Row>
            </Col>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Оршин суугаа хаяг</Form.Label>
              <Form.Control required type="text" name="address" size="sm" placeholder="Ex: БГД 7-р хороо" value={form.address} onChange={handleForm} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Регистрийн дугаар</Form.Label>
              <Form.Control required type="text" name="idNumber" size="sm" placeholder="Ex: WE99999999" value={form.idNumber} onChange={handleForm} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Гэрлэлтийн байдал</Form.Label>
              <Form.Control required type="text" name="maritalStatus" size="sm" placeholder="Ex: Гэрлээгүй" value={form.maritalStatus} onChange={handleForm} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Жолооны үнэмлэх</Form.Label>
              <Form.Control required type="text" name="driversLisence" size="sm" placeholder="Ex: B" value={form.driversLisence} onChange={handleForm} />
            </Form.Group>
            <button type="submit" className="rounded edit px-2">
              Хадгалах
            </button>

          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={Alert} onHide={handleAlertClose} className="text-center" size="sm" centered>
        <Modal.Body>
          <h4>Are you sure ?</h4>
          <ImCheckmark size={30} className="rounded edit" onClick={() => { handleDelete(deleteId) }} />
          <ImCross size={25} className="rounded edit" onClick={handleAlertClose} />
        </Modal.Body>
      </Modal>
    </Row>
  )
}

export default GeneralInfo