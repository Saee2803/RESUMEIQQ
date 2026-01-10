/**
 * ListItem Component for HTML Resume Preview
 * Compact bullet point styling
 */
const ListItem = ({ children, styles }) => {
    const defaultStyles = {
        listItem: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '1px',
            paddingRight: '4px',
        },
        bullet: {
            width: '8px',
            fontSize: '9pt',
            flexShrink: 0,
        },
        listText: {
            flex: 1,
            fontSize: '9pt',
            lineHeight: '1.25',
            margin: 0,
        },
    };

    const itemStyle = styles?.listItem || defaultStyles.listItem;
    const bulletStyle = styles?.bullet || defaultStyles.bullet;
    const textStyle = styles?.listText || defaultStyles.listText;

    return (
        <div style={itemStyle}>
            <span style={bulletStyle}>•</span>
            <span style={textStyle}>{children}</span>
        </div>
    );
};

export default ListItem;
