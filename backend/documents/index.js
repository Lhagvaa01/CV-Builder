module.exports = ({
    profile,
    name,
    about,
    experienceList,
    educationList,
    skills
}) => {
    let fullName = '';
    if (Array.isArray(name) && name.length >= 2) {
        fullName = `${name[0]} ${name[1]}`;
    } else if (typeof name === 'string') {
        fullName = name;
    }

    let mySkills = skills.map(skill => `<p class="technology rounded float-left my-1">${skill}</p>`).join('');

    let myExperience = experienceList.map(element => `
        <div>
            <h3 class="float-left text-secondary">• </h3> <h3 class="ps-3 text-secondary">${element.title}</h3>
            <p class="m-0 ps-3">${element.company} • ${element.startMonth} ${element.startYear}${element.isWorking ? " - Present" : " - "+element.endMonth+" "+element.endYear}</p>
            <p class="m-0 ps-3">${element.location}</p>
            <p class=" ps-3">${element.description}</p>
        </div>
    `).join('');

    let myEducation = educationList.map(element => `
        <div>
            <h3 class="float-left text-secondary">• </h3> <h3 class="ps-3 text-secondary">${element.institute}</h3>
            <p class="m-0 ps-3">${element.degree} • ${element.fieldOfStudy} </p>
            <p class="ps-3">${element.startYear} - ${element.endYear} • Голч дүн: ${element.grade}</p>
        </div>
    `).join('');
    
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <style>
                html,
                body {
                    font-family: "Poppins", sans-serif;
                    font-size: 1.2em;
                }
                .fs-small {
                    font-size: 1em;
                }
                .font-bold{
                    font-size: 1.3em;
                    font-weight: 600;
                }
                .float-left {
                    float:left;
                }
                .technology {
                    padding: 2px 8px;
                    margin-right: 15px;
                    display: flex;
                    align-items: center;
                    background-color: #fff;
                }
                .ls-2 {
                    letter-spacing: 2px;
                }
            </style>
            <title>Resume</title>
        </head>
        <body>
            <div>
                <div class="px-4">
                    <h2 class="mx-4 font-bold mt-4">${fullName}</h2>
                </div>
                <hr>
                <div class="px-4">
                    <div class="col-5 float-left bg-light p-4">
                        <h3 class="mb-3 ls-2">• Өөрийн мэдээлэл</h3>
                        <h4 class="m-0 text-secondary">Төрсөн нутаг:</h4>
                        <p class="m-0 mb-2">${profile.location}</p>
                        <h4 class="m-0 text-secondary">Холбоо барих:</h4>
                        <p class="m-0 mb-2">${profile.contact}</p>
                        <h4 class="m-0 text-secondary">Э-Мэйл хаяг:</h4>
                        <p class="m-0">${profile.email}</p>
                        <hr>
                        <h3 class="mb-3 ls-2">• Social Линк</h3>
                        <h4 class="m-0 text-secondary">LinkedIn:</h4>
                        <p class="m-0 mb-2">${profile.linkedin}</p>
                        <h4 class="m-0 text-secondary">GitHub:</h4>
                        <p class="m-0 mb-2">${profile.github}</p>
                        <h4 class="m-0 text-secondary">Website:</h4>
                        <p class="m-0">${profile.website}</p>
                        <hr>
                        <h3 class="mb-3 ls-2">• Авьяас</h3>
                        <div class="d-flex flex-wrap">${mySkills}</div>
                    </div>
                    <div class="col-7 float-left p-4">
                        <h3 class="mb-3 ls-2">• Өөрийн товч танилцуулга</h3>
                        <p class="m-0">${about}</p>
                        <hr>
                        <h3 class="mb-3 ls-2">• Ажлын Туршлага</h3>
                        ${myExperience}
                        <hr>
                        <h3 class="mb-3 ls-2">• Боловсрол</h3>
                        ${profile.file}
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
};
