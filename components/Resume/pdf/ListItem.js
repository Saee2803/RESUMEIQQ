import { Text, View } from '@react-pdf/renderer';

const ListItem = ({ children, styles }) => {
    // Use passed styles or defaults for compact bullet points
    const listItemStyle = styles?.listItem || {
        flexDirection: 'row',
        marginBottom: 1,
        paddingRight: 4,
    };

    const bulletStyle = styles?.bullet || {
        width: 8,
        fontSize: 9,
    };

    const textStyle = styles?.listText || {
        flex: 1,
        fontSize: 9,
        lineHeight: 1.25,
    };

    return (
        <View style={listItemStyle}>
            <Text style={bulletStyle}>•</Text>
            <Text style={textStyle}>{children}</Text>
        </View>
    );
};

export default ListItem;
