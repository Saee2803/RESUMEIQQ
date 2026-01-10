'use client';

import { getStylesByMode } from '../Styles';
import { useSelector } from 'react-redux';
import { selectRenderMode } from '@/store/slices/renderModeSlice';
import Section from './Section';
import ListItem from './ListItem';
import formatDate from '@/utils/formatDate';
import { Link, Text, View } from './Renderer';

const Header = ({ data, styleObj }) => {
    const contactLinks = [
        {
            name: data['phone'],
            value: data['phone'],
        },
        {
            name: data['email'],
            value: `mailto:${data['email']}`,
        },
        {
            name: 'LinkedIn',
            value: data['linkedin'],
        },
        {
            name: 'Github',
            value: data['github'],
        },
        {
            name: 'Blogs',
            value: data['blogs'],
        },
        {
            name: 'Twitter',
            value: data['twitter'],
        },
        {
            name: 'Portfolio',
            value: data['portfolio'],
        },
    ];

    return (
        <Section>
            <Text style={styleObj.header__name}>{data.name}</Text>
            <View style={styleObj.header__links}>
                {contactLinks
                    .filter(obj => obj.value)
                    .map(({ value, name }) => (
                        <Link key={name} src={value} style={styleObj.link}>
                            {name}
                        </Link>
                    ))}
            </View>
        </Section>
    );
};

const Education = ({ data, styleObj }) => (
    <Section title={'Education'}>
        {data.map(({ degree, institution, start, end, location, gpa }, i) => (
            <View key={i} style={styleObj.wrapper}>
                <View style={styleObj.title_wrapper}>
                    <Text style={styleObj.title}>{degree}</Text>
                    <Text style={styleObj.date}>
                        {formatDate(start)} - {formatDate(end)}
                    </Text>
                </View>

                <View style={styleObj.subTitle_wrapper}>
                    <Text>
                        {institution}
                        {gpa && <Text> ({gpa})</Text>}
                    </Text>

                    <Text style={styleObj.date}>{location}</Text>
                </View>

                {i !== data.length - 1 && <View style={styleObj.line} />}
            </View>
        ))}
    </Section>
);

const Projects = ({ data, styleObj }) => (
    <Section title={'Projects'}>
        {data.map((project, i) => (
            <View key={i}>
                <View style={styleObj.title_wrapper}>
                    <Text style={styleObj.title}>{project.title}</Text>
                </View>

                <View style={styleObj.subTitle_wrapper}>
                    <Link style={styleObj.link} src={project.url}>
                        {project.url}
                    </Link>
                </View>

                <View style={styleObj.lists}>
                    {project.description?.split('\n').map((responsibility, i) => (
                        <ListItem key={i}>{responsibility}</ListItem>
                    ))}
                </View>

                {i !== data.length - 1 && <View style={styleObj.line} />}
            </View>
        ))}
    </Section>
);

const Experience = ({ data, styleObj }) => (
    <Section title={'Experience'}>
        {data.map(({ role, start, end, company, location, description }, i) => (
            <View key={i} style={styleObj.wrapper}>
                <View style={styleObj.title_wrapper}>
                    <Text style={styleObj.title}>{role}</Text>
                    <Text style={styleObj.date}>
                        {formatDate(start)} - {formatDate(end)}
                    </Text>
                </View>

                <View style={styleObj.subTitle_wrapper}>
                    <Text>{company}</Text>
                    <Text>{location}</Text>
                </View>

                <View style={styleObj.lists}>
                    {description?.split('\n').map((responsibility, i) => (
                        <ListItem key={i}>{responsibility}</ListItem>
                    ))}
                </View>
                {i !== data.length - 1 && <View style={styleObj.line} />}
            </View>
        ))}
    </Section>
);

const Skills = ({ data, styleObj }) => (
    <Section title={'Skills'}>
        {data?.split('\n').map((line, i) => (
            <Text style={{ fontSize: 11 }}>{line}</Text>
        ))}
    </Section>
);

/**
 * Preview Component
 * Renders resume in HTML format with mode-based styling
 */
const Preview = () => {
    const resumeData = useSelector(state => state.resume);
    const mode = useSelector(selectRenderMode);
    const styleObj = getStylesByMode(mode);

    const { contact, education, experience, projects, summary, skills } = resumeData;

    return (
        <div className="h-[40rem] w-[28rem] md:block">
            <div style={styleObj.page}>
                <Header data={contact} styleObj={styleObj} />

                {summary?.summary && (
                    <Section title={'Summary'}>
                        <Text style={{ fontSize: 10 }}>{summary?.summary}</Text>
                    </Section>
                )}

                {education.length > 0 && <Education data={education} styleObj={styleObj} />}
                {experience.length > 0 && <Experience data={experience} styleObj={styleObj} />}
                {projects.length > 0 && <Projects data={projects} styleObj={styleObj} />}

                {skills?.skills?.length > 0 && <Skills data={skills.skills} styleObj={styleObj} />}
            </div>
        </div>
    );
};

export default Preview;
