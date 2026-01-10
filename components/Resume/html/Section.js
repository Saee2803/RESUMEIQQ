import resumeStyles from '../Styles';
import { Text, View } from './Renderer';

const styles = resumeStyles || {}; // 🔒 SAFETY NET

const Section = ({ title, children }) => {
  return (
    <View>
      {/* Section Title */}
      {title && (
        <>
          <Text style={styles.section_title || { fontSize: 14, fontWeight: 'bold' }}>
            {title}
          </Text>

          <Text
            style={styles.section_title_underline || {
              marginBottom: 6,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            }}
          />
        </>
      )}

      {/* Section Content */}
      <View>
        {children}
      </View>

      {/* Section bottom spacing */}
      <View
        style={styles.section_end || { marginBottom: 12 }}
      />
    </View>
  );
};

export default Section;
