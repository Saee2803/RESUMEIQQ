import { Text, View } from '@react-pdf/renderer';

const Section = ({ title, styles: passedStyles, children }) => {
    // Use section title style from passed styles (compact spacing)
    const sectionTitleStyle = passedStyles?.section_title || {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        marginBottom: 2,
        borderBottomWidth: 0.75,
        borderBottomColor: '#000',
        paddingBottom: 1,
    };

    const sectionEndStyle = passedStyles?.section_end || {
        marginBottom: 4,
    };

    return (
        <View style={passedStyles?.section}>
            {title && (
                <Text style={sectionTitleStyle}>{title}</Text>
            )}
            {children}
            <View style={sectionEndStyle} />
        </View>
    );
};

export default Section;
