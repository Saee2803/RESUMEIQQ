'use client';

import { selectRenderMode } from '@/store/slices/renderModeSlice';
import formatDate from '@/utils/formatDate';
import { useSelector } from 'react-redux';

/* ============================================
   INLINE STYLES FOR HTML PREVIEW
   Matches PDF output for consistency
   ============================================ */

const getHtmlStyles = (mode) => {
    const isATS = mode === 'ATS';
    
    return {
        page: {
            fontFamily: isATS ? 'Helvetica, Arial, sans-serif' : 'Times New Roman, serif',
            fontSize: isATS ? '9.5pt' : '10pt',
            lineHeight: isATS ? '1.3' : '1.35',
            color: isATS ? '#000' : '#1a1a1a',
            padding: isATS ? '24px 28px' : '28px 32px',
            backgroundColor: '#fff',
            minHeight: '100%',
        },
        header__name: {
            fontSize: isATS ? '16pt' : '18pt',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '3px',
            textTransform: isATS ? 'uppercase' : 'none',
            letterSpacing: isATS ? '1px' : '0.5px',
        },
        header__links: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            fontSize: isATS ? '8.5pt' : '9pt',
            gap: isATS ? '4px' : '6px',
            marginBottom: '4px',
        },
        header__separator: {
            color: isATS ? '#666' : '#888',
        },
        link: {
            color: isATS ? '#000' : '#1e40af',
            textDecoration: 'none',
        },
        section: {
            marginTop: isATS ? '6px' : '8px',
        },
        section_title: {
            fontSize: isATS ? '10pt' : '11pt',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginBottom: isATS ? '1px' : '2px',
            letterSpacing: isATS ? '0.5px' : '0.75px',
            borderBottom: isATS ? '0.75px solid #000' : '1px solid #1e40af',
            paddingBottom: isATS ? '1px' : '2px',
        },
        section_end: {
            marginBottom: isATS ? '4px' : '6px',
        },
        wrapper: {
            marginBottom: isATS ? '3px' : '4px',
            marginTop: isATS ? '3px' : '4px',
        },
        title_wrapper: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        title_inline: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            flex: 1,
            flexWrap: 'wrap',
            gap: '2px',
        },
        title: {
            fontWeight: 'bold',
            fontSize: isATS ? '9.5pt' : '10.5pt',
        },
        company: {
            fontSize: isATS ? '9pt' : '9.5pt',
            color: isATS ? '#333' : '#444',
        },
        location: {
            fontSize: isATS ? '8.5pt' : '9pt',
            color: isATS ? '#444' : '#555',
        },
        date: {
            fontSize: isATS ? '8.5pt' : '9pt',
            color: isATS ? '#333' : '#555',
            textAlign: 'right',
            minWidth: '80px',
            whiteSpace: 'nowrap',
        },
        lists: {
            marginLeft: isATS ? '8px' : '10px',
            marginTop: isATS ? '2px' : '3px',
            paddingLeft: '0',
        },
        listItem: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: isATS ? '1px' : '1.5px',
            paddingRight: isATS ? '4px' : '6px',
        },
        bullet: {
            width: isATS ? '8px' : '10px',
            fontSize: isATS ? '9pt' : '9.5pt',
            flexShrink: 0,
        },
        listText: {
            flex: 1,
            fontSize: isATS ? '9pt' : '9.5pt',
            lineHeight: isATS ? '1.25' : '1.3',
            margin: 0,
        },
        summary: {
            fontSize: isATS ? '9pt' : '9.5pt',
            lineHeight: isATS ? '1.35' : '1.4',
            textAlign: 'justify',
            margin: 0,
        },
        skillsContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
        },
        skillLine: {
            fontSize: isATS ? '9pt' : '9.5pt',
            lineHeight: isATS ? '1.35' : '1.4',
            marginBottom: '1px',
        },
        skillBullet: {
            fontSize: isATS ? '9pt' : '9.5pt',
        },
        skillCategory: {
            fontWeight: 'bold',
            fontSize: isATS ? '9pt' : '9.5pt',
        },
        skillItems: {
            fontWeight: 'normal',
            fontSize: isATS ? '9pt' : '9.5pt',
        },
        skillText: {
            fontSize: isATS ? '9pt' : '9.5pt',
        },
        skillRow: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            fontSize: isATS ? '9pt' : '9.5pt',
            lineHeight: isATS ? '1.3' : '1.35',
        },
        inlineLink: {
            fontSize: isATS ? '8.5pt' : '9pt',
            color: isATS ? '#000' : '#1e40af',
            textDecoration: 'none',
        },
        languagesContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: isATS ? '12px' : '14px',
        },
        languageItem: {
            display: 'flex',
            flexDirection: 'row',
            gap: isATS ? '3px' : '4px',
        },
        languageName: {
            fontWeight: 'bold',
            fontSize: isATS ? '9pt' : '9.5pt',
        },
        languageLevel: {
            fontSize: isATS ? '8.5pt' : '9pt',
            color: isATS ? '#444' : '#555',
        },
        certRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: isATS ? '2px' : '3px',
        },
        certLeft: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
        },
        certTitle: {
            fontWeight: 'bold',
            fontSize: isATS ? '9pt' : '10pt',
        },
        certIssuer: {
            fontSize: isATS ? '8.5pt' : '9pt',
            color: isATS ? '#333' : '#444',
            marginLeft: '8px',
        },
        subtitle: {
            fontSize: isATS ? '9pt' : '9.5pt',
            color: isATS ? '#333' : '#444',
        },
    };
};

/* ============================================
   SECTION COMPONENT
   ============================================ */

const Section = ({ title, styles, children }) => (
    <div style={styles.section}>
        {title && <div style={styles.section_title}>{title}</div>}
        {children}
        <div style={styles.section_end} />
    </div>
);

/* ============================================
   LIST ITEM COMPONENT
   ============================================ */

const ListItem = ({ styles, children }) => (
    <div style={styles.listItem}>
        <span style={styles.bullet}>•</span>
        <span style={styles.listText}>{children}</span>
    </div>
);

/* ============================================
   HEADER COMPONENT
   ============================================ */

const Header = ({ data, styles }) => {
    const contactLinks = [
        { name: data.phone, value: data.phone },
        { name: data.email, value: `mailto:${data.email}` },
        { name: 'LinkedIn', value: data.linkedin },
        { name: 'GitHub', value: data.github },
        { name: 'Portfolio', value: data.portfolio },
        { name: 'Blogs', value: data.blogs },
        { name: 'Twitter', value: data.twitter },
    ].filter(obj => obj.value);

    return (
        <div>
            <div style={styles.header__name}>{data.name}</div>
            <div style={styles.header__links}>
                {contactLinks.map(({ value, name }, i) => (
                    <span key={name}>
                        <a href={value} style={styles.link}>{name}</a>
                        {i < contactLinks.length - 1 && (
                            <span style={styles.header__separator}>    </span>
                        )}
                    </span>
                ))}
            </div>
        </div>
    );
};

/* ============================================
   SUMMARY COMPONENT
   ============================================ */

const Summary = ({ data, styles }) => (
    <Section title="Summary" styles={styles}>
        <p style={styles.summary}>{data}</p>
    </Section>
);

/* ============================================
   SKILLS COMPONENT - Bold category, normal items
   ============================================ */

const Skills = ({ data, styles }) => {
    // Parse skills into category + items format
    const parseSkills = (skillsText) => {
        const lines = skillsText.split('\n').filter(line => line.trim().length > 0);
        return lines.map(line => {
            // Remove any existing bullet at start
            const cleanLine = line.replace(/^[•\-\*]\s*/, '').trim();
            if (!cleanLine) return null;
            
            // Check if line has a category (e.g., "Programming: JavaScript, Python")
            const colonIndex = cleanLine.indexOf(':');
            if (colonIndex > 0 && colonIndex < 40) {
                return {
                    category: cleanLine.substring(0, colonIndex).trim(),
                    items: cleanLine.substring(colonIndex + 1).trim()
                };
            }
            // No category, treat entire line as items
            return { category: null, items: cleanLine };
        }).filter(Boolean);
    };

    const skillGroups = parseSkills(data);

    return (
        <Section title="Skills" styles={styles}>
            <div style={styles.skillsContainer}>
                {skillGroups.map((group, i) => (
                    <div key={i} style={styles.skillLine}>
                        <span style={styles.skillBullet}>•  </span>
                        {group.category ? (
                            <>
                                <span style={styles.skillCategory}>{group.category}:</span>
                                <span style={styles.skillItems}> {group.items}</span>
                            </>
                        ) : (
                            <span style={styles.skillItems}>{group.items}</span>
                        )}
                    </div>
                ))}
            </div>
        </Section>
    );
};

/* ============================================
   EXPERIENCE COMPONENT
   ============================================ */

const Experience = ({ data, styles }) => (
    <Section title="Experience" styles={styles}>
        {data.map(({ role, start, end, company, location, description }, i) => (
            <div key={i} style={styles.wrapper}>
                <div style={styles.title_wrapper}>
                    <div style={styles.title_inline}>
                        <span style={styles.title}>{role}</span>
                        {company && <span style={styles.company}>, {company}</span>}
                        {location && <span style={styles.location}>, {location}</span>}
                    </div>
                    <span style={styles.date}>
                        {formatDate(start)} – {formatDate(end) || 'Present'}
                    </span>
                </div>
                {description && (
                    <div style={styles.lists}>
                        {description
                            .split('\n')
                            .filter(Boolean)
                            .slice(0, 4)
                            .map((item, idx) => (
                                <ListItem key={idx} styles={styles}>
                                    {item.replace(/^[•\-\*]\s*/, '')}
                                </ListItem>
                            ))}
                    </div>
                )}
            </div>
        ))}
    </Section>
);

/* ============================================
   PROJECTS COMPONENT
   ============================================ */

const Projects = ({ data, styles }) => (
    <Section title="Projects" styles={styles}>
        {data.map((project, i) => (
            <div key={i} style={styles.wrapper}>
                <div style={styles.title_wrapper}>
                    <div style={styles.title_inline}>
                        <span style={styles.title}>{project.title}</span>
                        {project.url && (
                            <>
                                <span style={styles.subtitle}>  -  </span>
                                <a style={styles.inlineLink} href={project.url}>
                                    {project.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                                </a>
                            </>
                        )}
                    </div>
                </div>
                {project.description && (
                    <div style={styles.lists}>
                        {project.description
                            .split('\n')
                            .filter(Boolean)
                            .slice(0, 3)
                            .map((line, idx) => (
                                <ListItem key={idx} styles={styles}>
                                    {line.replace(/^[•\-\*]\s*/, '')}
                                </ListItem>
                            ))}
                    </div>
                )}
            </div>
        ))}
    </Section>
);

/* ============================================
   EDUCATION COMPONENT - Compact single line
   ============================================ */

const Education = ({ data, styles }) => (
    <Section title="Education" styles={styles}>
        {data.map(({ degree, institution, start, end, location, gpa }, i) => (
            <div key={i} style={{ marginBottom: i < data.length - 1 ? '3px' : '0' }}>
                <div style={styles.title_wrapper}>
                    <div style={styles.title_inline}>
                        <span style={styles.title}>{degree}</span>
                        {institution && <span style={styles.company}>, {institution}</span>}
                        {location && <span style={styles.location}>, {location}</span>}
                        {gpa && <span style={styles.subtitle}> ({gpa})</span>}
                    </div>
                    <span style={styles.date}>
                        {formatDate(start)} – {formatDate(end)}
                    </span>
                </div>
            </div>
        ))}
    </Section>
);

/* ============================================
   CERTIFICATIONS COMPONENT
   ============================================ */

const Certificates = ({ data, styles }) => (
    <Section title="Certifications" styles={styles}>
        {data.map(({ title, issuer, date }, i) => (
            <div key={i} style={styles.certRow}>
                <div style={styles.certLeft}>
                    <span style={styles.certTitle}>{title}</span>
                    {issuer && <span style={styles.certIssuer}>{issuer}</span>}
                </div>
                {date && <span style={styles.date}>{formatDate(date)}</span>}
            </div>
        ))}
    </Section>
);

/* ============================================
   LANGUAGES COMPONENT
   ============================================ */

const Languages = ({ data, styles }) => (
    <Section title="Languages" styles={styles}>
        <div style={styles.languagesContainer}>
            {data.map(({ language, proficiency }, i) => (
                <div key={i} style={styles.languageItem}>
                    <span style={styles.languageName}>{language}</span>
                    {proficiency && <span style={styles.languageLevel}>({proficiency})</span>}
                </div>
            ))}
        </div>
    </Section>
);

/* ============================================
   MAIN PREVIEW COMPONENT
   
   SECTION ORDER:
   1. Contact (Header)
   2. Summary
   3. Skills
   4. Experience
   5. Projects
   6. Education
   7. Certifications
   8. Languages
   ============================================ */

const Preview = () => {
    const resumeData = useSelector(state => state.resume);
    const mode = useSelector(selectRenderMode);
    const styles = getHtmlStyles(mode);

    const { 
        contact, 
        summary, 
        skills,
        experience, 
        projects, 
        education,
        certificates,
        languages,
    } = resumeData;

    return (
        <div className="h-[40rem] w-[28rem] md:block overflow-auto bg-white">
            <div style={styles.page}>
                {/* 1. Contact/Header */}
                <Header data={contact} styles={styles} />

                {/* 2. Summary */}
                {summary?.summary && <Summary data={summary.summary} styles={styles} />}

                {/* 3. Skills */}
                {skills?.skills && <Skills data={skills.skills} styles={styles} />}

                {/* 4. Experience */}
                {experience?.length > 0 && <Experience data={experience} styles={styles} />}

                {/* 5. Projects */}
                {projects?.length > 0 && <Projects data={projects} styles={styles} />}

                {/* 6. Education */}
                {education?.length > 0 && <Education data={education} styles={styles} />}

                {/* 7. Certifications */}
                {certificates?.length > 0 && <Certificates data={certificates} styles={styles} />}

                {/* 8. Languages */}
                {languages?.length > 0 && <Languages data={languages} styles={styles} />}
            </div>
        </div>
    );
};

export default Preview;
