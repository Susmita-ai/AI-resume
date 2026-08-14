/* =====================================================
   API CONFIGURATION
===================================================== */

const API_URL =
    "http://127.0.0.1:8000/analyze-resume";


/* =====================================================
   ELEMENTS
===================================================== */

const fileInput =
    document.getElementById("fileInput");

const dropzone =
    document.getElementById("dropzone");

const fileInfo =
    document.getElementById("fileInfo");

const fileName =
    document.getElementById("fileName");

const fileSize =
    document.getElementById("fileSize");

const removeFile =
    document.getElementById("removeFile");

const analyzeBtn =
    document.getElementById("analyzeBtn");

const buttonText =
    document.getElementById("buttonText");

const loadingSpinner =
    document.getElementById("loadingSpinner");

const statusMessage =
    document.getElementById("statusMessage");

const pdfPreview =
    document.getElementById("pdfPreview");

const previewEmpty =
    document.getElementById("previewEmpty");

const previewStatus =
    document.getElementById("previewStatus");

const resultsSection =
    document.getElementById("resultsSection");


let selectedFile = null;
let previewURL = null;


/* =====================================================
   FILE SELECT
===================================================== */

dropzone.addEventListener(
    "click",
    () => {

        fileInput.click();

    }
);


fileInput.addEventListener(
    "change",
    event => {

        const file =
            event.target.files[0];

        if (file) {

            handleFile(file);

        }

    }
);


/* =====================================================
   HANDLE FILE
===================================================== */

function handleFile(file) {

    if (
        file.type !== "application/pdf" &&
        !file.name
            .toLowerCase()
            .endsWith(".pdf")
    ) {

        showError(
            "Please upload a PDF file."
        );

        return;
    }


    const maxSize =
        10 * 1024 * 1024;


    if (file.size > maxSize) {

        showError(
            "File size must be less than 10 MB."
        );

        return;
    }


    selectedFile = file;


    fileName.textContent =
        file.name;

    fileSize.textContent =
        formatFileSize(
            file.size
        );


    fileInfo.classList.remove(
        "hidden"
    );


    /*
       PDF PREVIEW
    */

    if (previewURL) {

        URL.revokeObjectURL(
            previewURL
        );

    }


    previewURL =
        URL.createObjectURL(file);


    pdfPreview.src =
        previewURL;


    pdfPreview.classList.remove(
        "hidden"
    );


    previewEmpty.classList.add(
        "hidden"
    );


    /*
       Status
    */

    previewStatus.textContent =
        "Ready";

    previewStatus.style.background =
        "#eaf8ef";

    previewStatus.style.color =
        "#16803c";


    /*
       Enable analysis
    */

    analyzeBtn.disabled =
        false;


    showSuccess(
        "Resume ready for analysis."
    );

}


/* =====================================================
   DRAG & DROP
===================================================== */

dropzone.addEventListener(
    "dragover",
    event => {

        event.preventDefault();

        dropzone.classList.add(
            "dragover"
        );

    }
);


dropzone.addEventListener(
    "dragleave",
    () => {

        dropzone.classList.remove(
            "dragover"
        );

    }
);


dropzone.addEventListener(
    "drop",
    event => {

        event.preventDefault();

        dropzone.classList.remove(
            "dragover"
        );


        const file =
            event.dataTransfer.files[0];


        if (file) {

            handleFile(file);

        }

    }
);


/* =====================================================
   REMOVE FILE
===================================================== */

removeFile.addEventListener(
    "click",
    () => {

        selectedFile = null;

        fileInput.value = "";


        fileInfo.classList.add(
            "hidden"
        );


        pdfPreview.classList.add(
            "hidden"
        );


        previewEmpty.classList.remove(
            "hidden"
        );


        previewStatus.textContent =
            "Waiting";

        previewStatus.style.background =
            "#f2f4f8";

        previewStatus.style.color =
            "#778196";


        analyzeBtn.disabled =
            true;


        showStatus("");

    }
);


/* =====================================================
   ANALYZE RESUME
===================================================== */

analyzeBtn.addEventListener(
    "click",
    async () => {

        if (!selectedFile) {

            showError(
                "Please select a resume first."
            );

            return;
        }


        const formData =
            new FormData();


        /*
           IMPORTANT:
           FastAPI expects:
           file
        */

        formData.append(
            "file",
            selectedFile
        );


        startLoading();


        try {

            const response =
                await fetch(
                    API_URL,
                    {
                        method: "POST",
                        body: formData
                    }
                );


            const responseText =
                await response.text();


            let result;


            try {

                result =
                    JSON.parse(
                        responseText
                    );

            } catch {

                throw new Error(
                    responseText ||
                    "Invalid server response."
                );

            }


            if (!response.ok) {

                throw new Error(
                    result.detail ||
                    result.message ||
                    `Server error ${response.status}`
                );

            }


            renderResults(
                result
            );


            showSuccess(
                "Resume analysis completed successfully."
            );


        } catch (error) {

            console.error(
                error
            );


            showError(
                getErrorMessage(
                    error
                )
            );

        } finally {

            stopLoading();

        }

    }
);


/* =====================================================
   RENDER RESULTS
===================================================== */

function renderResults(response) {

    /*
       Supports:

       {
          success: true,
          data: {...}
       }

       OR

       {...}
    */

    const data =
        response.data ||
        response;


    /*
       NAME
    */

    const name =
        getValue(
            data,
            [
                "name",
                "Name"
            ],
            "Candidate"
        );


    document.getElementById(
        "candidateName"
    ).textContent =
        name;


    /*
       EMAIL
    */

    const email =
        getValue(
            data,
            [
                "email",
                "Email"
            ],
            "Not available"
        );


    document.getElementById(
        "emailValue"
    ).textContent =
        email;


    /*
       PHONE
    */

    const phone =
        getValue(
            data,
            [
                "phone",
                "Phone",
                "mobile",
                "Mobile"
            ],
            "Not available"
        );


    document.getElementById(
        "phoneValue"
    ).textContent =
        phone;


    /*
       JOB ROLE
    */

    const role =
        getValue(
            data,
            [
                "predicted_job_role",
                "Predicted Job Role",
                "job_role",
                "Job Role"
            ],
            "Not predicted"
        );


    document.getElementById(
        "predictedRole"
    ).textContent =
        role;


    /*
       SCORE
    */

    let score =
        getValue(
            data,
            [
                "resume_score",
                "Resume Score",
                "ai_score",
                "AI Score (0-100)"
            ],
            0
        );


    score =
        Number(score);


    if (Number.isNaN(score)) {

        score = 0;

    }


    score =
        Math.max(
            0,
            Math.min(
                100,
                score
            )
        );


    updateScore(
        score
    );


    /*
       SKILLS
    */

    const skills =
        convertToArray(
            getValue(
                data,
                [
                    "skills",
                    "Skills"
                ],
                []
            )
        );


    renderSkills(
        skills
    );


    /*
       EDUCATION
    */

    const education =
        convertToArray(
            getValue(
                data,
                [
                    "education",
                    "Education"
                ],
                []
            )
        );


    renderEducation(
        education
    );


    /*
       OTHER INFORMATION
    */

    renderAdditionalInfo(
        data
    );


    /*
       SHOW RESULTS
    */

    resultsSection.classList.remove(
        "hidden"
    );


    setTimeout(
        () => {

            resultsSection.scrollIntoView(
                {
                    behavior:
                        "smooth"
                }
            );

        },
        150
    );

}


/* =====================================================
   SCORE
===================================================== */

function updateScore(score) {

    const ring =
        document.getElementById(
            "scoreRing"
        );

    const value =
        document.getElementById(
            "scoreValue"
        );

    const message =
        document.getElementById(
            "scoreMessage"
        );


    let current = 0;


    const timer =
        setInterval(
            () => {

                current += 1;


                if (
                    current >= score
                ) {

                    current =
                        score;

                    clearInterval(
                        timer
                    );

                }


                value.textContent =
                    Math.round(
                        current
                    );

            },
            12
        );


    ring.style.setProperty(
        "--score",
        score
    );


    if (score >= 80) {

        message.textContent =
            "Excellent";

    } else if (score >= 60) {

        message.textContent =
            "Good";

    } else if (score >= 40) {

        message.textContent =
            "Needs Improvement";

    } else {

        message.textContent =
            "Needs Attention";

    }

}


/* =====================================================
   SKILLS
===================================================== */

function renderSkills(
    skills
) {

    const container =
        document.getElementById(
            "skillsContainer"
        );


    if (!skills.length) {

        container.innerHTML =
            `
            <span class="skill">
                No skills detected
            </span>
            `;

        return;
    }


    container.innerHTML =
        skills
            .map(
                skill => {

                    return `
                        <span class="skill">
                            ${escapeHTML(
                                skill
                            )}
                        </span>
                    `;

                }
            )
            .join("");

}


/* =====================================================
   EDUCATION
===================================================== */

function renderEducation(
    education
) {

    const list =
        document.getElementById(
            "educationList"
        );


    if (!education.length) {

        list.innerHTML =
            `
            <li>
                No education information detected.
            </li>
            `;

        return;
    }


    list.innerHTML =
        education
            .map(
                item => {

                    return `
                        <li>
                            ${escapeHTML(
                                item
                            )}
                        </li>
                    `;

                }
            )
            .join("");

}


/* =====================================================
   ADDITIONAL INFO
===================================================== */

function renderAdditionalInfo(
    data
) {

    const container =
        document.getElementById(
            "additionalInfo"
        );


    const ignored =
        new Set(
            [
                "name",
                "Name",
                "email",
                "Email",
                "phone",
                "Phone",
                "mobile",
                "Mobile",
                "skills",
                "Skills",
                "education",
                "Education",
                "resume_score",
                "Resume Score",
                "ai_score",
                "AI Score (0-100)",
                "predicted_job_role",
                "Predicted Job Role",
                "job_role",
                "Job Role"
            ]
        );


    const entries =
        Object.entries(
            data
        )
        .filter(
            ([key, value]) => {

                return (
                    !ignored.has(key) &&
                    value !== null &&
                    value !== undefined &&
                    value !== ""
                );

            }
        )
        .slice(
            0,
            8
        );


    if (!entries.length) {

        container.innerHTML =
            `
            <div class="info-item">

                <span>
                    Status
                </span>

                <strong>
                    No additional information
                </strong>

            </div>
            `;

        return;
    }


    container.innerHTML =
        entries
            .map(
                ([key, value]) => {

                    if (
                        Array.isArray(value)
                    ) {

                        value =
                            value.join(
                                ", "
                            );

                    }


                    return `
                        <div class="info-item">

                            <span>
                                ${escapeHTML(
                                    key
                                )}
                            </span>

                            <strong>
                                ${escapeHTML(
                                    value
                                )}
                            </strong>

                        </div>
                    `;

                }
            )
            .join("");

}


/* =====================================================
   HELPERS
===================================================== */

function getValue(
    object,
    keys,
    fallback
) {

    for (
        const key of keys
    ) {

        if (
            object &&
            object[key] !== undefined &&
            object[key] !== null &&
            object[key] !== ""
        ) {

            return object[key];

        }

    }

    return fallback;

}


function convertToArray(
    value
) {

    if (
        Array.isArray(value)
    ) {

        return value.filter(
            Boolean
        );

    }


    if (
        typeof value === "string"
    ) {

        return value
            .split(
                /[,;|]/
            )
            .map(
                x => x.trim()
            )
            .filter(
                Boolean
            );

    }


    return [];

}


function formatFileSize(
    bytes
) {

    if (!bytes) {

        return "0 KB";

    }


    const mb =
        bytes /
        (1024 * 1024);


    if (mb < 1) {

        return (
            Math.round(
                bytes / 1024
            )
            +
            " KB"
        );

    }


    return (
        mb.toFixed(2)
        +
        " MB"
    );

}


/* =====================================================
   LOADING
===================================================== */

function startLoading() {

    analyzeBtn.disabled =
        true;

    buttonText.textContent =
        "Analyzing...";

    loadingSpinner.classList.remove(
        "hidden"
    );

    showStatus(
        "AI is analyzing your resume..."
    );

}


function stopLoading() {

    analyzeBtn.disabled =
        !selectedFile;

    buttonText.textContent =
        "Analyze Resume";

    loadingSpinner.classList.add(
        "hidden"
    );

}


/* =====================================================
   STATUS
===================================================== */

function showStatus(
    message
) {

    statusMessage.textContent =
        message;

    statusMessage.className =
        "status-message";

}


function showSuccess(
    message
) {

    statusMessage.textContent =
        message;

    statusMessage.className =
        "status-message status-success";

}


function showError(
    message
) {

    statusMessage.textContent =
        message;

    statusMessage.className =
        "status-message status-error";

}


/* =====================================================
   ERROR
===================================================== */

function getErrorMessage(
    error
) {

    if (
        error.message
            .includes(
                "Failed to fetch"
            )
    ) {

        return (
            "Cannot connect to FastAPI. " +
            "Make sure your backend is running."
        );

    }


    return (
        error.message ||
        "Something went wrong."
    );

}


/* =====================================================
   SECURITY
===================================================== */

function escapeHTML(
    value
) {

    return String(value)
        .replace(
            /[&<>"']/g,
            character => {

                const entities = {

                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#039;"

                };

                return entities[
                    character
                ];

            }
        );

}