import { StyleSheet } from "@react-pdf/renderer";

/* ================= ATS MODE ================= */

const atsStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.2,
    color: "#000",
  },

  header__name: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },

  header__links: {
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 9,
    gap: 6,
    marginBottom: 6,
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
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 2,
  },

  section_title_underline: {
    borderBottomWidth: 0.5,
    marginBottom: 4,
  },

  section_end: {
    marginBottom: 6,
  },

  /* ===== CONTENT ===== */
  wrapper: {
    marginBottom: 4,
  },

  title_wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  subTitle_wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 9,
  },

  title: {
    fontWeight: "bold",
    fontSize: 10,
  },

  date: {
    fontSize: 9,
  },

  lists: {
    marginLeft: 6,
    marginTop: 2,
  },

  line: {
    borderBottomWidth: 0.5,
    marginVertical: 3,
  },
});

/* ================= RECRUITER MODE ================= */

const recruiterStyles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Times-Roman",
    fontSize: 11,
    lineHeight: 1.6,
    color: "#0f172a",
  },

  header__name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
    color: "#000",
    letterSpacing: 0.5,
  },

  header__links: {
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 10,
    gap: 18,
    marginBottom: 16,
    color: "#444",
  },

  link: {
    color: "#1e40af",
    textDecoration: "none",
  },

  /* ===== SECTION ===== */
  section: {
    marginTop: 18,
  },

  section_title: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  section_title_underline: {
    borderBottomWidth: 2,
    borderBottomColor: "#1e40af",
    marginBottom: 10,
  },

  section_end: {
    marginBottom: 18,
  },

  /* ===== CONTENT ===== */
  wrapper: {
    marginBottom: 12,
  },

  title_wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },

  subTitle_wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    marginBottom: 3,
    color: "#475569",
  },

  title: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#1e293b",
  },

  date: {
    fontSize: 10,
    color: "#64748b",
    fontStyle: "italic",
  },

  lists: {
    marginLeft: 14,
    marginTop: 8,
  },

  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    marginVertical: 10,
  },
});

/* ================= MODE SWITCH ================= */

export const getStylesByMode = (mode) => {
  return mode === "ATS" ? atsStyles : recruiterStyles;
};
