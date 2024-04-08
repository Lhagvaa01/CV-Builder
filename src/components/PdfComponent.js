import React, { Fragment, useEffect, useState  } from 'react'
import { Stack } from 'react-bootstrap'
import {BsLinkedin,BsGithub,BsGlobe} from 'react-icons/bs'
import {GiGraduateCap} from 'react-icons/gi'
import {HiLocationMarker,HiOfficeBuilding,HiOutlineMail,HiPhone} from 'react-icons/hi'
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import axios from 'axios';
import { saveAs } from 'file-saver';
import QRCode from 'react-qr-code';
import { useSelector } from 'react-redux';
import { BsFilePerson } from "react-icons/bs";

function PdfComponent() {

  const profile = useSelector(state => state.profile)
  const name = profile.name.split(" ");
  const file = useSelector(state => state.file)
  const about = useSelector(state => state.about)
  const experienceList = useSelector(state => state.experienceList)
  const generalInfoList = useSelector(state => state.generalInfoList)
  const educationList = useSelector(state => state.educationList)
  const skills = useSelector(state => state.skills)



  const createAndDownloadPdf = () => {
    const data = {
      profile:profile,
      name:name,
      file:file,
      about:about,
      experienceList:experienceList,
      educationList:educationList,
      skills:skills
    }
    axios.post('http://localhost:5000/create-pdf', data)
      .then(() => axios.get(`http://localhost:5000/fetch-pdf?name=${encodeURIComponent(name[1])}`, { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, `CV-${name[1]}.pdf`);
      })
  }

  const saveAsPNG = (imgData, name) => {
    const a = document.createElement('a');
    a.href = imgData;
    a.download = `${name}.png`; 
    document.body.appendChild(a);
    a.click(); 
    document.body.removeChild(a);
  };

  

  
  const printDocument = (name) => {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, 595.28, 841.89);
        pdf.save(`CV-${name}-V1.pdf`);
        // saveAsPNG(imgData, `CV-${name}-V1`);
      })
      .catch((error) => {
        console.error('Error creating PDF:', error);
      });
  };

  const saveImg = (name) => {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        saveAsPNG(imgData, `CV-${name}-V1`);
      })
      .catch((error) => {
        console.error('Error creating PDF:', error);
      });
  };

  const sendEmail = () => {
    printDocument(name[1]);
    // Make a POST request to your Express backend
    axios.post('http://localhost:5000/create-pdf-and-send-email', { email, name })
      .then((response) => {
        console.log('Email sent successfully:', response.data);
        // Optionally, show a success message to the user
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        // Optionally, show an error message to the user
      });
  };
  

  const GetIcon = (icon) => {
    switch(icon.icon){
        case "HiOutlineMail":
          return <HiOutlineMail size={30}/>
        case "HiPhone":
          return <HiPhone size={30}/>
        case "BsLinkedin":
          return <BsLinkedin size={30}/>
        case "BsGithub":
          return <BsGithub size={30}/>
        case "BsGlobe":
          return <BsGlobe size={30}/>
        default:
          return "●"
    }
  }
  const GetLinks = () => {
    const list = [];
    if(profile.email){
      list.push({
        icon:"HiOutlineMail",
        link: profile.email,
      });
    }
    if(profile.contact){
      list.push({
        icon:"HiPhone",
        link: profile.contact,
      });
    }
    if(profile.linkedin){
      list.push({
        icon:"BsLinkedin",
        link: profile.linkedin,
      });
    }
    if(profile.github){
      list.push({
        icon:"BsGithub",
        link: profile.github,
      });
    }
    if(profile.website){
      list.push({
        icon:"BsGlobe",
        link: profile.website,
      });
    }

    return(
      list.map((item,id)=>{
        return(
          <div className={id%2===0 ? "d-flex aligh-items-start align-items-center bg-2 text-white p-3" : "d-flex aligh-items-start align-items-center bg-3 text-white p-3"} key={id}>
            <p className="m-0"><GetIcon icon={item.icon}/></p><span className="mx-2"></span><p className="m-0">{item.link}</p>
          </div>
        )
      })
    )

  }

  const [email, setEmail] = useState(profile.email);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const saveImgDjango = (name) => {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        canvas.toBlob((blob) => {
          const formData = new FormData();
          formData.append('name', name);
          formData.append('image', blob, `CV-${name}-V1.png`);
  
          fetch(`${url}/save-img/`, {
            method: 'POST',
            body: formData,
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to save image');
            }
            return response.json();
          })
          .then(data => {
            if (data && data.data && data.data.image) {
              setImageUrl(data.data.image);
            } else {
              console.error('Error saving image: Image URL not found in response');
            }
            
            console.log('Image saved successfully:', data);
          })
          .catch((error) => {
            console.error('Error saving image: ', error);
          });
        });
      })
      .catch((error) => {
        console.error('Error creating image:', error);
      });
  };
  
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    generateQRCode();
  }, [imageUrl]);

  

  const [qrCodeData, setQRCodeData] = useState('');
  const [url, setUrl] = useState('http://66.181.175.153:8080');

  const generateQRCode = () => {
    console.log(imageUrl);
    setQRCodeData(`${url}${imageUrl}`);
  };

  return (
    <Fragment>
      <div className="d-grid col-2 mx-auto mt-4">
          <button className="align-middle bg-dark text-white p-2 rounded" onClick={() => printDocument(name[1])}>Татах - Хувилбар №1</button>
          <button className="align-middle bg-dark text-white p-2 rounded mt-2" onClick={createAndDownloadPdf}>Татах - Хувилбар №2</button>
          <input
            className='mt-2'
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleInputChange}
          />
          <button className="align-middle bg-dark text-white p-2 rounded mt-2" onClick={sendEmail}>Мэйл илгээх</button>
          <button className="align-middle bg-dark text-white p-2 rounded mt-2" onClick={() => saveImg(name[1])}>Зургаар татах</button>

            <button className="align-middle bg-dark text-white p-2 rounded mt-2" onClick={() => saveImgDjango(name[1])}>QR Үүсгэх</button>
            
            {qrCodeData !== url && (
              <div>
                <h2>QR Code:</h2>
                <QRCode value={qrCodeData} />
              </div>
            )}
      </div>
      <div className="container d-flex justify-content-center p-4">
        <div className="row pdf bg-light" id="divToPrint" size="A4">

          <div className="d-flex align-items-center justify-content-center col-md-5 bg-1 p-0 py-2">
            <div>
              <div className="d-flex justify-content-center">
                <img src={file} className="pdf-profile-image" alt="..."></img>
              </div>

              <Stack className="text-center">
                <span className="font-bold m-0 firstname">{name[0]}</span>
                <span className="font-thin m-0">{name[1]}</span>
                  <p><HiLocationMarker size={20}/> {profile.location}</p>
                
              </Stack>
              <br></br>
              <GetLinks/>

              <br></br>
              <Stack className="p-3">
                <h4 className="title">Авьяас</h4>
                <div className="d-flex flex-wrap">
                {
                  skills.map((items, id) => {
                    return (
                      <p className="technology rounded" key={id}>{items}</p>
                    )
                  })
                }
                </div>
              </Stack>
            </div>

          </div>
          <div className="d-flex align-items-center col-md-7 p-0 py-4">
            <div>
              <div className="px-4 py-1">
                <h4 className="title">Миний тухай</h4>
                <p className="text-break">
                    {about}
                </p>
                <hr></hr>
              </div>

              <div className="px-4">
                <h4 className="title">Ерөнхий мэдээлэл</h4>
                {
                  generalInfoList.map((item,id)=>{
                    return(
                      <div className="d-flex justify-content-start py-1" key={id}>
                        <BsFilePerson size={30}/>
                        <div className="px-3">
                          <h4>{item.familyName}</h4>
                          <p className="m-0"><b>Эцэг/Эхийн нэр:</b> {item.parentsName}</p>
                          <p className="m-0"><b>Төрсөн огноо:</b> {item.birthDate}</p>
                          <p className="m-0"><b>Регистрийн дугаар:</b> {item.idNumber} •  <b>Хүйс:</b> {item.gender}</p>
                          <p className="m-0"><b>Гэрлэлтийн байдал:</b> {item.maritalStatus}</p>
                          <p className="m-0"><b>Жолооны үнэмлэх:</b> {item.driversLisence}</p>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    )
                  })
                }
                
                <hr></hr>
              </div>

              <div className="px-4">
                <h4 className="title">Туршлага</h4>
                {
                  experienceList.map((item,id)=>{
                    return(
                      <div className="d-flex justify-content-start py-1" key={id}>
                        <HiOfficeBuilding size={30}/>
                        <div className="px-3">
                          <h4>{item.title}</h4>
                          <p className="m-0">{item.company} • {item.startMonth} {item.startYear} {`${item.isWorking ? " - Present" : " - "+item.endMonth+" "+item.endYear }`}</p>
                          <p className="m-0">{item.location}</p>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    )
                  })
                }
                
                <hr></hr>
              </div>

              <div className="px-4">
                <h4 className="title">Боловсрол</h4>
                {
                  educationList.map((item,id)=>{
                    return(
                      <div className="d-flex justify-content-start py-1" key={id}>
                        <GiGraduateCap size={40}/>
                        <div className="px-3">
                          <h4>{item.institute}</h4>
                          <p className="m-0">{item.degree} • {item.fieldOfStudy}</p>
                          <p>{item.startYear} - {item.endYear} • Grade: {item.grade}</p>
                        </div>
                      </div>
                    )
                  })
                }
                
                
              </div>
            </div>

          </div>

        </div>

      </div>
      
    </Fragment>
  )
}

export default PdfComponent