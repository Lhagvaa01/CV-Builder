import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MdAddCircleOutline, MdEdit, MdClose, MdDelete } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";
import { BsFilePerson } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ImCheckmark, ImCross } from "react-icons/im";
import Years from "../smallComponents/Years";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import Months from "../smallComponents/Months";

function FamilyInfo() {
  const familyInfoList = useSelector((state) => state.familyInfoList);
  const dispatch = useDispatch();
  const { addFamilyInfo, editFamilyInfo, removeFamilyInfo } =
    bindActionCreators(actionCreators, dispatch);

  const [show, setShow] = useState(false);
  const [Alert, setAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleClose = () => {
    setValidated(false);
    setShow(false);
    setForm({
      id: "",
      taniiHenBoloh: "",
      owogNer: "",
      tursunOgnoo: "",
      mergejil: "",
      ajiliinNer: "",
      albanTushaal: "",
      utas: "",
      isEdit: false,
    });
  };
  const handleShow = () => setShow(true);
  const handleAlertClose = () => setAlert(false);
  const handleAlert = (id) => {
    setDeleteId(id);
    setAlert(true);
  };

  // const [list, setList] = useState([]);
  const [form, setForm] = useState({
    id: "",
    taniiHenBoloh: "",
    owogNer: "",
    tursunOgnoo: "",
    mergejil: "",
    ajiliinNer: "",
    albanTushaal: "",
    utas: "",
    isEdit: false,
  });
  const handleForm = (e) => {
    setForm((old) => {
      return {
        ...old,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      };
    });
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const x = event.currentTarget;
    if (!x.checkValidity()) {
      setValidated(true);
    } else {
      if (form.isEdit) {
        editFamilyInfo(form);
        // list[form.id] = form;
        // setList(list);
      } else {
        addFamilyInfo(form);
        // const newList = list.concat({ ...form });
        // setList(newList);
      }
      setShow(false);
      setForm({
        id: "",
        taniiHenBoloh: "",
        owogNer: "",
        tursunOgnoo: "",
        mergejil: "",
        ajiliinNer: "",
        albanTushaal: "",
        utas: "",
        isEdit: false,
      });
    }
  };

  const handleEdit = (id) => {
    const form = familyInfoList[id];
    form.isEdit = true;
    form.id = id;
    setForm(form);
    setShow(true);
  };

  const handleDelete = (id) => {
    removeFamilyInfo(id);
    // list.splice(id, 1);
    // setList(list);
    setAlert(false);
  };

  const [bDateY, setBdateY] = useState("2000");

  const handleYearChange = (event) => {
    const { value } = event.target;
    setBdateY(value);
    setForm((prevForm) => ({
      ...prevForm,
      tursunOgnoo: `${bDateY}`,
    }));
    handleForm(event);
  };

  return (
    <Row className="justify-content-center mt-2">
      <Col
        md={8}
        sm={12}
        className="d-flex justify-content-between align-items-center bg-light rounded"
      >
        <h5 className="m-0">Гэр бүлийн байдал</h5>
        <MdAddCircleOutline
          size={30}
          className="rounded edit"
          onClick={handleShow}
        />
      </Col>
      <Col md={8} sm={12}>
        {familyInfoList.map((item, id) => {
          return (
            <Row className="border-bottom pt-3" key={id}>
              <Col md={10} className="d-flex justify-content-start">
                <BsFilePerson
                  size={50}
                  className="rounded color-blue bg-grey p-1 shadow-sm"
                />
                <div className="px-3">
                  <h5 className="m-0">{item.taniiHenBoloh}</h5>
                  <p className="text-muted m-0">
                    {item.owogNer} • {item.utas}
                  </p>
                </div>
              </Col>
              <Col md={2}>
                <div className="d-flex flex-wrap justify-content-end">
                  <MdEdit
                    size={30}
                    className="rounded edit"
                    onClick={() => {
                      handleEdit(id);
                    }}
                  />
                  <MdDelete
                    size={30}
                    className="rounded edit"
                    onClick={() => {
                      handleAlert(id);
                    }}
                  />
                </div>
              </Col>
            </Row>
          );
        })}
      </Col>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        scrollable={true}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Гэр бүлийн байдал</Modal.Title>
          <MdClose size={30} className="rounded edit" onClick={handleClose} />
        </Modal.Header>

        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Таны хэн болох</Form.Label>
              <Form.Control
                required
                type="text"
                name="taniiHenBoloh"
                size="sm"
                placeholder="Ex: Аав"
                value={form.taniiHenBoloh}
                onChange={handleForm}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Овог, нэр</Form.Label>
              <Form.Control
                required
                type="text"
                name="owogNer"
                size="sm"
                placeholder="Ex: Бат"
                value={form.owogNer}
                onChange={handleForm}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Col>
                <Row>
                  <Form.Label>Төрсөн он</Form.Label>
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
                      {Array.from(
                        { length: 100 },
                        (_, i) => new Date().getFullYear() - i
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Мэргэжил</Form.Label>
              <Form.Control
                required
                type="text"
                name="mergejil"
                size="sm"
                placeholder="Ex: Тогооч"
                value={form.mergejil}
                onChange={handleForm}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Одоо ажиллаж байгаа байгууллагын нэр</Form.Label>
              <Form.Control
                required
                type="text"
                name="ajiliinNer"
                size="sm"
                placeholder="Ex: Таван богд"
                value={form.ajiliinNer}
                onChange={handleForm}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Одоо эрхэлж буй албан тушаал</Form.Label>
              <Form.Control
                required
                type="text"
                name="albanTushaal"
                size="sm"
                placeholder="Ex: Инженер"
                value={form.albanTushaal}
                onChange={handleForm}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Утас</Form.Label>
              <Form.Control
                required
                type="text"
                name="utas"
                size="sm"
                placeholder="Ex: 99889988"
                value={form.utas}
                onChange={handleForm}
              />
            </Form.Group>

            <button type="submit" className="rounded edit px-2">
              Хадгалах
            </button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={Alert}
        onHide={handleAlertClose}
        className="text-center"
        size="sm"
        centered
      >
        <Modal.Body>
          <h4>Are you sure ?</h4>
          <ImCheckmark
            size={30}
            className="rounded edit"
            onClick={() => {
              handleDelete(deleteId);
            }}
          />
          <ImCross
            size={25}
            className="rounded edit"
            onClick={handleAlertClose}
          />
        </Modal.Body>
      </Modal>
    </Row>
  );
}

export default FamilyInfo;
