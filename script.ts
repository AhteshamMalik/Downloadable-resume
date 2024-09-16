// Interface for the form data
interface ResumeData {
    name: string;
    email: string;
    phone: string;
    education: string;
    experience: string;
    skills: string;
}

// Function to generate the resume
function generateResume(data: ResumeData): string {
    return `
        <div>
            <h2 contenteditable="true" class="editable" data-field="name">${data.name}</h2>
            <p><strong>Email:</strong> <span contenteditable="true" class="editable" data-field="email">${data.email}</span></p>
            <p><strong>Phone:</strong> <span contenteditable="true" class="editable" data-field="phone">${data.phone}</span></p>
            <h3>Education</h3>
            <p contenteditable="true" class="editable" data-field="education">${data.education}</p>
            <h3>Work Experience</h3>
            <p contenteditable="true" class="editable" data-field="experience">${data.experience}</p>
            <h3>Skills</h3>
            <p contenteditable="true" class="editable" data-field="skills">${data.skills}</p>
        </div>
    `;
}

// Function to update the resume data when editing is done
function updateResumeData(field: string, value: string, data: ResumeData) {
    switch (field) {
        case 'name':
            data.name = value;
            break;
        case 'email':
            data.email = value;
            break;
        case 'phone':
            data.phone = value;
            break;
        case 'education':
            data.education = value;
            break;
        case 'experience':
            data.experience = value;
            break;
        case 'skills':
            data.skills = value;
            break;
    }
}

// Handling form submission
document.getElementById('resumeForm')?.addEventListener('submit', (event) => {
    event.preventDefault();

    // Capture form data
    const formData = new FormData(event.target as HTMLFormElement);
    const data: ResumeData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        education: formData.get('education') as string,
        experience: formData.get('experience') as string,
        skills: formData.get('skills') as string,
    };

    // Generate the resume
    const resumeOutput = document.getElementById('resumeOutput');
    if (resumeOutput) {
        resumeOutput.innerHTML = generateResume(data);

        // Add event listeners to editable elements
        const editableElements = resumeOutput.querySelectorAll('.editable');
        editableElements.forEach(element => {
            element.addEventListener('blur', (event) => {
                const target = event.target as HTMLElement;
                const field = target.getAttribute('data-field');
                if (field) {
                    const value = target.innerText;
                    updateResumeData(field, value, data);
                }
            });
        });
    }
});
