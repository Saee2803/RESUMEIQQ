/**
 * Section Component for HTML Resume Preview
 * Compact, professional styling
 */
const Section = ({ title, styles, children }) => {
    const defaultStyles = {
        section: { marginTop: '6px' },
        section_title: {
            fontSize: '10pt',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginBottom: '1px',
            letterSpacing: '0.5px',
            borderBottom: '0.75px solid #000',
            paddingBottom: '1px',
        },
        section_end: { marginBottom: '4px' },
    };

    const sectionStyle = styles?.section || defaultStyles.section;
    const titleStyle = styles?.section_title || defaultStyles.section_title;
    const endStyle = styles?.section_end || defaultStyles.section_end;

    return (
        <div style={sectionStyle}>
            {title && <div style={titleStyle}>{title}</div>}
            <div>{children}</div>
            <div style={endStyle} />
        </div>
    );
};

export default Section;
