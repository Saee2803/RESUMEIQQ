import { Page, Text, View, Document, Link } from '@react-pdf/renderer';
import Section from './Section';
import ListItem from './ListItem';
import { getStylesByMode } from '../Styles';
import formatDate from '@/utils/formatDate';

/* ---------------- HEADER ---------------- */

const Header = ({ data, styles }) => {
    const contactLinks = [
        { name: data.phone, value: data.phone },
        { name: data.email, value: `mailto:${data.email}` },
        { name: 'LinkedIn', value: data.linkedin },
        { name: 'Github', value: data.github },
        { name: 'Blogs', value: data.blogs },
        { name: 'Twitter', value: data.twitter },
        { name: 'Portfolio', value: data.portfolio },
    ];

    return (
        <Section>
            <Text style={styles.header__name}>{data.name}</Text>
            <View style={styles.header__links}>
                {contactLinks
                    .filter(obj => obj.value)
                    .map(({ value, name }) => (
                        <Link key={name} src={value} style={styles.link}>
                            {name}
                        </Link>
                    ))}
            </View>
        </Section>
    );
};

/* ---------------- SECTIONS ---------------- */

const Education = ({ data, styles }) => (
    <Section title="Education" styles={styles}>
        {data.map(({ degree, institution, start, end, location, gpa }, i) => (
            <View key={i} style={styles.wrapper}>
                <View style={styles.title_wrapper}>
                    <Text style={styles.title}>{degree}</Text>
                    <Text style={styles.date}>
                        {formatDate(start)} - {formatDate(end)}
                    </Text>
                </View>

                <View style={styles.subTitle_wrapper}>
                    <Text>
                        {institution}
                        {gpa && <Text> ({gpa})</Text>}
                    </Text>
                    <Text style={styles.date}>{location}</Text>
                </View>

                {i !== data.length - 1 && <View style={styles.line} />}
            </View>
        ))}
    </Section>
);

const Experience = ({ data, styles }) => (
    <Section title="Experience" styles={styles}>
        {data.map(({ role, start, end, company, location, description }, i) => (
            <View key={i} style={styles.wrapper}>
                <View style={styles.title_wrapper}>
                    <Text style={styles.title}>{role}</Text>
                    <Text style={styles.date}>
                        {formatDate(start)} - {formatDate(end)}
                    </Text>
                </View>

                <View style={styles.subTitle_wrapper}>
                    <Text>{company}</Text>
                    <Text>{location}</Text>
                </View>

                <View style={styles.lists}>
                    {description?.split('\n').map((item, idx) => (
                        <ListItem key={idx}>{item}</ListItem>
                    ))}
                </View>

                {i !== data.length - 1 && <View style={styles.line} />}
            </View>
        ))}
    </Section>
);

const Projects = ({ data, styles }) => (
    <Section title="Projects" styles={styles}>
        {data.map((project, i) => (
            <View key={i}>
                <Text style={styles.title}>{project.title}</Text>

                {project.url && (
                    <Link style={styles.link} src={project.url}>
                        {project.url}
                    </Link>
                )}

                <View style={styles.lists}>
                    {project.description
                        ?.split('\n')
                        .filter(Boolean)
                        .map((line, idx) => (
                            <ListItem key={idx}>{line}</ListItem>
                        ))}
                </View>

                {i !== data.length - 1 && <View style={styles.line} />}
            </View>
        ))}
    </Section>
);

const Skills = ({ data, styles }) => (
    <Section title="Skills" styles={styles}>
        {data.split('\n').map((line, i) => (
            <Text key={i} style={{ fontSize: 11 }}>
                {line}
            </Text>
        ))}
    </Section>
);

const Certificates = ({ data, styles }) => (
    <Section title="Certifications" styles={styles}>
        {data.map(({ title, issuer, date }, i) => (
            <View key={i} style={styles.wrapper}>
                <View style={styles.title_wrapper}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.date}>{formatDate(date)}</Text>
                </View>
                <Text>{issuer}</Text>
                {i !== data.length - 1 && <View style={styles.line} />}
            </View>
        ))}
    </Section>
);

const Languages = ({ data, styles }) => (
    <Section title="Languages" styles={styles}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {data.map(({ language, proficiency }, i) => (
                <View key={i}>
                    <Text style={{ fontSize: 12 }}>{language}</Text>
                    <Text style={{ fontSize: 10, color: '#777' }}>{proficiency}</Text>
                </View>
            ))}
        </View>
    </Section>
);

/* ---------------- MAIN RESUME ---------------- */

const Resume = ({ data, mode }) => {
    const styles = getStylesByMode(mode);

    const {
        contact,
        summary,
        education = [],
        experience = [],
        projects = [],
        skills,
        certificates = [],
        languages = [],
    } = data;

    return (
        <Document language="en">
            <Page size="A4" style={styles.page}>
                <Header data={contact} styles={styles} />

                {summary?.summary && (
                    <Section title="Summary" styles={styles}>
                        <Text style={{ fontSize: 10 }}>{summary.summary}</Text>
                    </Section>
                )}

                {education.length > 0 && <Education data={education} styles={styles} />}
                {experience.length > 0 && <Experience data={experience} styles={styles} />}
                {projects.length > 0 && <Projects data={projects} styles={styles} />}
                {skills?.skills && <Skills data={skills.skills} styles={styles} />}
                {certificates.length > 0 && <Certificates data={certificates} styles={styles} />}
                {languages.length > 0 && <Languages data={languages} styles={styles} />}
            </Page>
        </Document>
    );
};

export default Resume;
