import { StyleSheet, Text, View } from '@react-pdf/renderer';

const Section = ({ title, styles: passedStyles, children }) => {
    // Default styles if none passed (for backwards compatibility)
    const defaultStyles = StyleSheet.create({
        section_title: {
            textTransform: 'uppercase',
            color: '#333',
            fontSize: 13,
        },

        section_title_underline: {
            height: 1,
            margin: '2px 0px 4px 0px',
            backgroundColor: '#888',
        },
        section_end: {
            height: 2,
            margin: '10px 0px',
            backgroundColor: '#eee',
        },
    });

    // Use passed styles or create a dynamic version based on them
    const sectionTitle = passedStyles?.section_title || defaultStyles.section_title;
    const sectionTitleUnderline = passedStyles?.section_title_underline || defaultStyles.section_title_underline;
    const sectionEnd = passedStyles?.section_end || defaultStyles.section_end;

    return (
        <View>
            {title && (
                <>
                    <Text style={sectionTitle}>{title}</Text>
                    <View style={sectionTitleUnderline}></View>
                </>
            )}

            {children}

            <View style={sectionEnd}></View>
        </View>
    );
};

export default Section;
