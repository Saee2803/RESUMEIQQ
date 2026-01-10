export default {
    contact: {
    name: 'Contact Information',
    fields: [
        { name: 'name', label: 'Full Name', placeholder: 'John Doe', required: true },
        { name: 'title', label: 'Professional Title', placeholder: 'Software Engineer' },
        { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john.doe@email.com' },
        { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 9876543210' },
        { name: 'location', label: 'Location', placeholder: 'Pune, India' },
        { name: 'linkedin', label: 'LinkedIn Profile', placeholder: 'linkedin.com/in/johndoe' },
        { name: 'github', label: 'GitHub Profile', placeholder: 'github.com/johndoe' },
        { name: 'portfolio', label: 'Portfolio Website', placeholder: 'https://johndoe.dev' },
    ],
},

    summary: {
        name: 'Professional Summary',
        fields: [
            {
                name: 'summary',
                label: 'Summary',
                type: 'textarea',
                placeholder: '2–3 line summary highlighting your experience, skills, and career focus...',

                span: true,
                rows: 5,
            },
        ],
    },
    education: {
        name: 'Education',
        multiple: true,
        fields: [
            { name: 'degree', label: 'Degree', placeholder: 'Bachelor of Computer Science' },
            { name: 'specialization', label: 'Specialization', placeholder: 'Computer Science' },
            { name: 'institution', label: 'Institution', placeholder: 'University Name' },
            { name: 'start', label: 'Start Date', type: 'month', placeholder: 'MM/YYYY' },
            { name: 'end', label: 'End Date', type: 'month', placeholder: 'MM/YYYY' },
            { name: 'location', label: 'Location', placeholder: 'City, Country' },
            { name: 'gpa', label: 'GPA', placeholder: '3.8/4.0' },
        ],
    },

    experience: {
    name: 'Professional Experience',
    multiple: true,
    fields: [
        { name: 'role', label: 'Job Title', span: true, placeholder: 'Software Engineer' },
        { name: 'company', label: 'Company Name', placeholder: 'ABC Technologies' },
        { name: 'location', label: 'Location', placeholder: 'Pune, India' },
        { name: 'start', label: 'Start Date', type: 'month' },
        { name: 'end', label: 'End Date', type: 'month' },
        {
            name: 'description',
            label: 'Key Responsibilities & Achievements',
            type: 'textarea',
            placeholder: '• Developed scalable features using React and Node.js\n• Improved system performance by 25%',
            span: true,
            rows: 5,
            multipoints: true,
        },
            ],
    },


    projects: {
        name: 'Projects',
        multiple: true,
        fields: [
            { name: 'title', label: 'Project Title', placeholder: 'Project Name' },
            { name: 'url', label: 'Project Url', placeholder: 'https://example.com/project' },
            {
                name: 'description',
                label: 'Project Description & Impact',

                type: 'textarea',
                placeholder: 'Explain the problem, your solution, tools used, and results achieved...',
                span: true,
                multipoints: true,
            },
        ],
    },

    skills: {
        name: 'Skills',
        fields: [
            {
                name: 'skills',
                label: 'Skills',
                type: 'textarea',
                placeholder: 'List your skills separated by commas...',
                span: true,
                rows: 3,
            },
        ],
    },

    certificates: {
        name: 'Certifications',
        multiple: true,
        fields: [
            { name: 'title', label: 'Certificate Title', placeholder: 'Certificate Name', span: true },
            { name: 'issuer', label: 'Issuing Organization', placeholder: 'Organization Name' },
            { name: 'date', label: 'Date Earned', type: 'month', placeholder: 'MM/DD/YYYY' },
        ],
    },

    languages: {
        name: 'Languages',
        multiple: true,
        fields: [
            { name: 'language', label: 'Language', placeholder: 'Language Name' },
            {
                name: 'proficiency',
                label: 'Proficiency',
                placeholder: 'e.g., Fluent, Intermediate, Beginner',
                type: 'select',
                options: [
                    {
                        
                        value: 'Elementary Proficiency',
                    },
                    {
                        
                        value: 'Limited Working Proficiency',
                    },
                    {
                        
                        value: 'Professional Working Proficiency',
                    },
                    {
                        
                        value: 'Full Professional Proficiency',
                    },
                    {
                        
                        value: 'Native or Bilingual Proficiency',
                    },
                ],
            },
        ],
    },
};
