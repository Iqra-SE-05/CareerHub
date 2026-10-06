const jobs = [

    {
        id: 1,
        title: "Frontend Developer",
        company: "TechNova",
        location: "Lahore",
        type: "Full Time",
        salary: "PKR 80K - 120K",
        category: "Technology",
        skills: ["HTML", "CSS", "JavaScript"],
        posted: 1
    },

    {
        id: 2,
        title: "UI/UX Designer",
        company: "BrightLabs",
        location: "Islamabad",
        type: "Full Time",
        salary: "PKR 70K - 110K",
        category: "Design",
        skills: ["Figma", "UI Design", "UX"],
        posted: 2
    },

    {
        id: 3,
        title: "Web Development Intern",
        company: "DigitalEdge",
        location: "Lahore",
        type: "Internship",
        salary: "PKR 25K - 40K",
        category: "Technology",
        skills: ["HTML", "CSS", "JavaScript"],
        posted: 3
    },

    {
        id: 4,
        title: "Digital Marketing Executive",
        company: "Nexa Solutions",
        location: "Karachi",
        type: "Full Time",
        salary: "PKR 60K - 90K",
        category: "Marketing",
        skills: ["SEO", "Social Media", "Google Ads"],
        posted: 4
    },

    {
        id: 5,
        title: "React Developer",
        company: "CloudCore",
        location: "Remote",
        type: "Remote",
        salary: "PKR 100K - 160K",
        category: "Technology",
        skills: ["React", "JavaScript", "API"],
        posted: 5
    },

    {
        id: 6,
        title: "Graphic Designer",
        company: "SoftPeak",
        location: "Lahore",
        type: "Part Time",
        salary: "PKR 40K - 65K",
        category: "Design",
        skills: ["Canva", "Photoshop", "Branding"],
        posted: 6
    },

    {
        id: 7,
        title: "Business Analyst",
        company: "TechNova",
        location: "Islamabad",
        type: "Full Time",
        salary: "PKR 90K - 130K",
        category: "Business",
        skills: ["Analytics", "Excel", "Business"],
        posted: 7
    },

    {
        id: 8,
        title: "Finance Assistant",
        company: "BrightLabs",
        location: "Lahore",
        type: "Full Time",
        salary: "PKR 55K - 80K",
        category: "Finance",
        skills: ["Excel", "Accounting", "Finance"],
        posted: 8
    }

];


let currentJobs = [...jobs];


// DISPLAY JOBS

function displayJobs(list) {

    const container = document.getElementById("jobsContainer");

    if (list.length === 0) {

        container.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:60px;background:white;border-radius:14px;">
                <h3>No jobs found</h3>
                <p style="margin-top:10px;color:#777;">
                    Try another keyword or location.
                </p>
            </div>
        `;

        return;
    }


    container.innerHTML = list.map(job => `

        <div class="job-card">

            <div class="job-top">

                <div class="company-logo">
                    ${job.company.charAt(0)}
                </div>

                <button
                    class="save-btn"
                    onclick="saveJob(${job.id})">
                    ♡
                </button>

            </div>


            <h3>${job.title}</h3>

            <p class="company-name">
                ${job.company}
            </p>


            <div class="job-meta">

                <span>📍 ${job.location}</span>

                <span>💼 ${job.type}</span>

                <span>🕒 ${job.posted} days ago</span>

            </div>


            <div class="skills">

                ${job.skills.map(skill =>
                    `<span>${skill}</span>`
                ).join("")}

            </div>


            <div class="job-bottom">

                <span class="salary">
                    ${job.salary}
                </span>

                <button
                    class="apply-btn"
                    onclick="openApplication(${job.id})">
                    Apply Now
                </button>

            </div>

        </div>

    `).join("");
}


// SEARCH

function searchJobs() {

    const keyword =
        document.getElementById("searchInput").value
        .toLowerCase();

    const location =
        document.getElementById("locationInput").value
        .toLowerCase();

    const type =
        document.getElementById("typeFilter").value;


    currentJobs = jobs.filter(job => {

        const matchesKeyword =
            job.title.toLowerCase().includes(keyword) ||
            job.company.toLowerCase().includes(keyword) ||
            job.skills.join(" ").toLowerCase().includes(keyword);

        const matchesLocation =
            job.location.toLowerCase().includes(location);

        const matchesType =
            type === "all" || job.type === type;


        return matchesKeyword &&
               matchesLocation &&
               matchesType;

    });


    displayJobs(currentJobs);

    document
        .getElementById("jobs")
        .scrollIntoView();
}


// CATEGORY FILTER

function filterCategory(category) {

    currentJobs =
        jobs.filter(job => job.category === category);

    displayJobs(currentJobs);

    document
        .getElementById("jobs")
        .scrollIntoView();
}


// SORT

function sortJobs() {

    const value =
        document.getElementById("sortJobs").value;


    if (value === "latest") {

        currentJobs.sort(
            (a, b) => a.posted - b.posted
        );

    }


    if (value === "salary") {

        currentJobs.sort(
            (a, b) =>
                parseInt(b.salary.match(/\d+/)[0]) -
                parseInt(a.salary.match(/\d+/)[0])
        );

    }


    displayJobs(currentJobs);
}


// SAVE JOB

function saveJob(id) {

    let saved =
        JSON.parse(
            localStorage.getItem("careerhubSavedJobs")
        ) || [];


    if (!saved.includes(id)) {

        saved.push(id);

        localStorage.setItem(
            "careerhubSavedJobs",
            JSON.stringify(saved)
        );

        alert("Job saved successfully!");

    } else {

        alert("This job is already saved.");

    }

}


// APPLICATION

let selectedJob = null;


function openApplication(id) {

    selectedJob =
        jobs.find(job => job.id === id);


    document.getElementById("applicationJob").textContent =
        selectedJob.title +
        " at " +
        selectedJob.company;


    document.getElementById("applicationModal").style.display =
        "flex";
}


function closeApplication() {

    document.getElementById("applicationModal").style.display =
        "none";
}


function submitApplication() {

    const name =
        document.getElementById("appName").value.trim();

    const email =
        document.getElementById("appEmail").value.trim();


    if (!name || !email) {

        alert("Please enter your name and email.");

        return;
    }


    let applications =
        JSON.parse(
            localStorage.getItem("careerhubApplications")
        ) || [];


    applications.push({

        jobId: selectedJob.id,

        jobTitle: selectedJob.title,

        company: selectedJob.company,

        candidate: name,

        email: email,

        date: new Date().toLocaleDateString(),

        status: "Applied"

    });


    localStorage.setItem(
        "careerhubApplications",
        JSON.stringify(applications)
    );


    alert(
        "Application submitted successfully!"
    );


    closeApplication();

}


// INITIAL LOAD

displayJobs(jobs);
