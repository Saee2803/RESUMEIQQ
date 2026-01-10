import formatDate from '@/utils/formatDate';
import { Document, Link, Page, Text, View } from '@react-pdf/renderer';
import { getStylesByMode } from '../Styles';
import ListItem from './ListItem';
import Section from './Section';

/* ---------------- HEADER ---------------- */

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
        <View>
            <Text style={styles.header__name}>{data.name}</Text>
            <View style={styles.header__links}>
                {contactLinks.map(({ value, name }, i) => (
                    <View key={name} style={{ flexDirection: 'row' }}>
                        <Link src={value} style={styles.link}>
                            {name}
                        </Link>
                        {i < contactLinks.length - 1 && (
                            <Text style={styles.header__separator}>    </Text>
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
};

/* ---------------- SUMMARY ---------------- */

const Summary = ({ data, styles }) => (
    <Section title="Summary" styles={styles}>
        <Text style={styles.summary}>{data}</Text>
    </Section>
);

/* ---------------- SKILLS - Bold category, normal items ---------------- */

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
            <View style={styles.skillsContainer}>
                {skillGroups.map((group, i) => (
                    <Text key={i} style={styles.skillLine}>
                        <Text style={styles.skillBullet}>•  </Text>
                        {group.category ? (
                            <>
                                <Text style={styles.skillCategory}>{group.category}:</Text>
                                <Text style={styles.skillItems}> {group.items}</Text>
                            </>
                        ) : (
                            <Text style={styles.skillItems}>{group.items}</Text>
                        )}
                    </Text>
                ))}
            </View>
        </Section>
    );
};

/* ---------------- EXPERIENCE - Compact professional format ---------------- */

const Experience = ({ data, styles }) => (
    <Section title="Experience" styles={styles}>
        {data.map(({ role, start, end, company, location, description }, i) => (
            <View key={i} style={styles.wrapper}>
                {/* Role + Company on same line | Dates aligned right */}
                <View style={styles.title_wrapper}>
                    <View style={styles.title_inline}>
                        <Text style={styles.title}>{role}</Text>
                        {company && <Text style={styles.company}>, {company}</Text>}
                        {location && <Text style={styles.location}>, {location}</Text>}
                    </View>
                    <Text style={styles.date}>
                        {formatDate(start)} – {formatDate(end) || 'Present'}
                    </Text>
                </View>

                {/* Bullet points - compact */}
                {description && (
                    <View style={styles.lists}>
                        {description
                            .split('\n')
                            .filter(Boolean)
                            .slice(0, 4) // Limit to 4 bullets max
                            .map((item, idx) => (
                                <ListItem key={idx} styles={styles}>{item.replace(/^[•\-\*]\s*/, '')}</ListItem>
                            ))}
                    </View>
                )}
            </View>
        ))}
    </Section>
);

/* ---------------- PROJECTS - Compact with inline links ---------------- */

const Projects = ({ data, styles }) => (
    <Section title="Projects" styles={styles}>
        {data.map((project, i) => (
            <View key={i} style={styles.wrapper}>
                {/* Project Title + Link on same line */}
                <View style={styles.title_wrapper}>
                    <View style={styles.title_inline}>
                        <Text style={styles.title}>{project.title}</Text>
                        {project.url && (
                            <>
                                <Text style={styles.subtitle}>  -  </Text>
                                <Link style={styles.inlineLink} src={project.url}>
                                    {project.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                                </Link>
                            </>
                        )}
                    </View>
                </View>

                {/* Description bullets - limit to 2-3 */}
                {project.description && (
                    <View style={styles.lists}>
                        {project.description
                            .split('\n')
                            .filter(Boolean)
                            .slice(0, 3) // Limit to 3 bullets
                            .map((line, idx) => (
                                <ListItem key={idx} styles={styles}>{line.replace(/^[•\-\*]\s*/, '')}</ListItem>
                            ))}
                    </View>
                )}
            </View>
        ))}
    </Section>
);

/* ---------------- EDUCATION - Compact single-line format ---------------- */

const Education = ({ data, styles }) => (
    <Section title="Education" styles={styles}>
        {data.map(({ degree, institution, start, end, location, gpa }, i) => (
            <View key={i} style={{ marginBottom: i < data.length - 1 ? 3 : 0 }}>
                {/* Degree | Institution | Location on ONE line, Dates right */}
                <View style={styles.title_wrapper}>
                    <View style={styles.title_inline}>
                        <Text style={styles.title}>{degree}</Text>
                        {institution && <Text style={styles.company}>, {institution}</Text>}
                        {location && <Text style={styles.location}>, {location}</Text>}
                        {gpa && <Text style={styles.subtitle}> ({gpa})</Text>}
                    </View>
                    <Text style={styles.date}>
                        {formatDate(start)} – {formatDate(end)}
                    </Text>
                </View>
            </View>
        ))}
    </Section>
);

/* ---------------- CERTIFICATIONS - Name + Org left, Date right ---------------- */

const Certificates = ({ data, styles }) => (
    <Section title="Certifications" styles={styles}>
        {data.map(({ title, issuer, date }, i) => (
            <View key={i} style={styles.certRow}>
                <View style={styles.certLeft}>
                    <Text style={styles.certTitle}>{title}</Text>
                    {issuer && <Text style={styles.certIssuer}>{issuer}</Text>}
                </View>
                {date && <Text style={styles.date}>{formatDate(date)}</Text>}
            </View>
        ))}
    </Section>
);

/* ---------------- LANGUAGES - Inline horizontal format ---------------- */

const Languages = ({ data, styles }) => (
    <Section title="Languages" styles={styles}>
        <View style={styles.languagesContainer}>
            {data.map(({ language, proficiency }, i) => (
                <View key={i} style={styles.languageItem}>
                    <Text style={styles.languageName}>{language}</Text>
                    {proficiency && <Text style={styles.languageLevel}>({proficiency})</Text>}
                </View>
            ))}
        </View>
    </Section>
);

/* ---------------- MAIN RESUME ---------------- 
   SECTION ORDER (as specified):
   1. Contact (Header)
   2. Summary
   3. Skills
   4. Experience
   5. Projects
   6. Education
   7. Certifications
   8. Languages
*/

const Resume = ({ data, mode }) => {
    const styles = getStylesByMode(mode);

    const {
        contact,
        summary,
        skills,
        experience = [],
        projects = [],
        education = [],
        certificates = [],
        languages = [],
    } = data;

    return (
        <Document language="en">
            <Page size="A4" style={styles.page}>
                {/* 1. Contact/Header */}
                <Header data={contact} styles={styles} />

                {/* 2. Summary */}
                {summary?.summary && <Summary data={summary.summary} styles={styles} />}

                {/* 3. Skills */}
                {skills?.skills && <Skills data={skills.skills} styles={styles} />}

                {/* 4. Experience */}
                {experience.length > 0 && <Experience data={experience} styles={styles} />}

                {/* 5. Projects */}
                {projects.length > 0 && <Projects data={projects} styles={styles} />}

                {/* 6. Education */}
                {education.length > 0 && <Education data={education} styles={styles} />}

                {/* 7. Certifications */}
                {certificates.length > 0 && <Certificates data={certificates} styles={styles} />}

                {/* 8. Languages */}
                {languages.length > 0 && <Languages data={languages} styles={styles} />}
            </Page>
        </Document>
    );
};

export default Resume;
