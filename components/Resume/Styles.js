import { StyleSheet } from "@react-pdf/renderer";

/* ================= ATS MODE ================= 
   Professional, compact, ATS-safe styling
   Target: 1-1.5 pages maximum
*/

const atsStyles = StyleSheet.create({
  page: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 28,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.3,
    color: "#000",
  },

  /* ===== HEADER ===== */
  header__name: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 3,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  header__links: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    fontSize: 8.5,
    gap: 4,
    marginBottom: 2,
  },

  header__separator: {
    color: "#666",
  },

  link: {
    color: "#000",
    textDecoration: "none",
  },

  /* ===== SECTION ===== */
  section: {
    marginTop: 6,
  },

  section_title: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 1,
    letterSpacing: 0.5,
    borderBottomWidth: 0.75,
    borderBottomColor: "#000",
    paddingBottom: 1,
  },

  section_title_underline: {
    display: "none",
  },

  section_end: {
    marginBottom: 4,
  },

  /* ===== CONTENT ITEMS ===== */
  wrapper: {
    marginBottom: 3,
    marginTop: 3,
  },

  title_wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  /* Combined title + subtitle on same line */
  title_inline: {
    flexDirection: "row",
    alignItems: "baseline",
    flex: 1,
    flexWrap: "wrap",
  },

  subTitle_wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 9,
    marginTop: 0,
  },

  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
  },

  subtitle: {
    fontSize: 9,
    color: "#333",
  },

  company: {
    fontSize: 9,
    color: "#333",
  },

  date: {
    fontSize: 8.5,
    color: "#333",
    textAlign: "right",
    minWidth: 80,
  },

  location: {
    fontSize: 8.5,
    color: "#444",
  },

  /* ===== BULLETS ===== */
  lists: {
    marginLeft: 8,
    marginTop: 2,
  },

  listItem: {
    flexDirection: "row",
    marginBottom: 1,
    paddingRight: 4,
  },

  bullet: {
    width: 8,
    fontSize: 9,
  },

  listText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.25,
  },

  /* ===== SKILLS ===== */
  skillsContainer: {
    flexDirection: "column",
    gap: 1,
  },

  skillLine: {
    fontSize: 9,
    lineHeight: 1.35,
    marginBottom: 1,
  },

  skillBullet: {
    fontSize: 9,
  },

  skillCategory: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
  },

  skillItems: {
    fontFamily: "Helvetica",
    fontSize: 9,
  },

  skillText: {
    fontSize: 9,
  },

  skillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 9,
    lineHeight: 1.3,
  },

  skillCategory: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
  },

  skillItems: {
    fontSize: 9,
  },

  /* ===== INLINE LINK ===== */
  inlineLink: {
    fontSize: 8.5,
    color: "#000",
    textDecoration: "none",
  },

  /* ===== SUMMARY ===== */
  summary: {
    fontSize: 9,
    lineHeight: 1.35,
    textAlign: "justify",
  },

  /* ===== LANGUAGES ===== */
  languagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  languageItem: {
    flexDirection: "row",
    gap: 3,
  },

  languageName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
  },

  languageLevel: {
    fontSize: 8.5,
    color: "#444",
  },

  /* ===== CERTIFICATIONS ===== */
  certRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },

  certLeft: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  certTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
  },

  certIssuer: {
    fontSize: 8.5,
    color: "#333",
    marginLeft: 8,
  },

  line: {
    display: "none",
  },
});

/* ================= RECRUITER MODE ================= 
   Clean, professional, slightly more spacious
   Still targets 1-1.5 pages
*/

const recruiterStyles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 32,
    fontFamily: "Times-Roman",
    fontSize: 10,
    lineHeight: 1.35,
    color: "#1a1a1a",
  },

  /* ===== HEADER ===== */
  header__name: {
    fontSize: 18,
    fontFamily: "Times-Bold",
    textAlign: "center",
    marginBottom: 4,
    letterSpacing: 0.5,
  },

  header__links: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    fontSize: 9,
    gap: 6,
    marginBottom: 4,
    color: "#333",
  },

  header__separator: {
    color: "#888",
  },

  link: {
    color: "#1e40af",
    textDecoration: "none",
  },

  /* ===== SECTION ===== */
  section: {
    marginTop: 8,
  },

  section_title: {
    fontSize: 11,
    fontFamily: "Times-Bold",
    textTransform: "uppercase",
    marginBottom: 2,
    letterSpacing: 0.75,
    borderBottomWidth: 1,
    borderBottomColor: "#1e40af",
    paddingBottom: 2,
  },

  section_title_underline: {
    display: "none",
  },

  section_end: {
    marginBottom: 6,
  },

  /* ===== CONTENT ITEMS ===== */
  wrapper: {
    marginBottom: 4,
    marginTop: 4,
  },

  title_wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title_inline: {
    flexDirection: "row",
    alignItems: "baseline",
    flex: 1,
    flexWrap: "wrap",
  },

  subTitle_wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 9.5,
    marginTop: 1,
  },

  title: {
    fontFamily: "Times-Bold",
    fontSize: 10.5,
    color: "#1a1a1a",
  },

  subtitle: {
    fontSize: 9.5,
    color: "#444",
  },

  company: {
    fontSize: 9.5,
    color: "#444",
  },

  date: {
    fontSize: 9,
    color: "#555",
    textAlign: "right",
    minWidth: 85,
  },

  location: {
    fontSize: 9,
    color: "#555",
  },

  /* ===== BULLETS ===== */
  lists: {
    marginLeft: 10,
    marginTop: 3,
  },

  listItem: {
    flexDirection: "row",
    marginBottom: 1.5,
    paddingRight: 6,
  },

  bullet: {
    width: 10,
    fontSize: 9.5,
  },

  listText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.3,
  },

  /* ===== SKILLS ===== */
  skillsContainer: {
    flexDirection: "column",
    gap: 1,
  },

  skillLine: {
    fontSize: 9.5,
    lineHeight: 1.4,
    marginBottom: 1,
  },

  skillBullet: {
    fontSize: 9.5,
  },

  skillCategory: {
    fontFamily: "Times-Bold",
    fontSize: 9.5,
  },

  skillItems: {
    fontFamily: "Times-Roman",
    fontSize: 9.5,
  },

  skillText: {
    fontSize: 9.5,
  },

  skillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 9.5,
    lineHeight: 1.35,
  },

  skillItems: {
    fontFamily: "Times-Roman",
    fontSize: 9.5,
  },

  /* ===== INLINE LINK ===== */
  inlineLink: {
    fontSize: 9,
    color: "#1e40af",
    textDecoration: "none",
  },

  /* ===== SUMMARY ===== */
  summary: {
    fontSize: 9.5,
    lineHeight: 1.4,
    textAlign: "justify",
  },

  /* ===== LANGUAGES ===== */
  languagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },

  languageItem: {
    flexDirection: "row",
    gap: 4,
  },

  languageName: {
    fontFamily: "Times-Bold",
    fontSize: 9.5,
  },

  languageLevel: {
    fontSize: 9,
    color: "#555",
  },

  /* ===== CERTIFICATIONS ===== */
  certRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 3,
  },

  certLeft: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  certTitle: {
    fontFamily: "Times-Bold",
    fontSize: 10,
  },

  certIssuer: {
    fontSize: 9,
    color: "#444",
    marginLeft: 8,
  },

  line: {
    display: "none",
  },
});

/* ================= MODE SWITCH ================= */

export const getStylesByMode = (mode) => {
  return mode === "ATS" ? atsStyles : recruiterStyles;
};
