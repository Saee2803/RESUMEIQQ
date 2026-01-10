/**
 * JD Matching Engine
 * Lightweight NLP-inspired matching between Job Description and Resume
 * Uses tokenization, keyword extraction, and weighted scoring
 * Client-side only, no external APIs
 */

/**
 * Common stop words to filter out (non-meaningful words)
 */
const STOP_WORDS = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'is', 'are', 'am', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
    'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can',
    'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
    'what', 'which', 'who', 'when', 'where', 'why', 'how', 'all', 'each', 'every',
    'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only',
    'own', 'same', 'so', 'than', 'too', 'very', 'as', 'if', 'just', 'by', 'your',
    'our', 'their', 'my', 'his', 'her', 'its', 'about', 'into', 'through', 'during',
    'before', 'after', 'above', 'below', 'up', 'down', 'out', 'off', 'over', 'under',
    'again', 'further', 'then', 'once', 'year', 'years', 'time', 'work', 'working',
    'worked', 'works', 'experience', 'experiences', 'able', 'etc', 'including'
]);

/**
 * Tokenize and normalize text
 * - Convert to lowercase
 * - Remove punctuation
 * - Split into words
 * - Filter stop words
 * Returns array of meaningful tokens
 */
function tokenize(text) {
    if (!text || typeof text !== 'string') return [];
    
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, ' ') // Remove punctuation
        .split(/\s+/)
        .filter(word => word.length > 2 && !STOP_WORDS.has(word));
}

/**
 * Extract keywords with frequency
 * Returns object: { keyword: frequency }
 * Higher frequency = higher importance
 */
function extractKeywords(text) {
    const tokens = tokenize(text);
    const keywords = {};

    tokens.forEach(token => {
        keywords[token] = (keywords[token] || 0) + 1;
    });

    return keywords;
}

/**
 * Merge multiple sections of resume data
 * Creates a unified text block for matching
 */
function extractResumeContent(resumeData) {
    let content = '';

    // Skills section - highest weight
    if (resumeData.skills?.skills) {
        content += resumeData.skills.skills + '\n';
    }

    // Experience descriptions - high weight
    if (Array.isArray(resumeData.experience)) {
        resumeData.experience.forEach(exp => {
            if (exp.role) content += exp.role + ' ';
            if (exp.company) content += exp.company + ' ';
            if (exp.description) content += exp.description + '\n';
        });
    }

    // Project descriptions
    if (Array.isArray(resumeData.projects)) {
        resumeData.projects.forEach(proj => {
            if (proj.title) content += proj.title + ' ';
            if (proj.description) content += proj.description + '\n';
        });
    }

    // Summary
    if (resumeData.summary?.summary) {
        content += resumeData.summary.summary + '\n';
    }

    // Education
    if (Array.isArray(resumeData.education)) {
        resumeData.education.forEach(edu => {
            if (edu.degree) content += edu.degree + ' ';
            if (edu.specialization) content += edu.specialization + ' ';
            if (edu.institution) content += edu.institution + '\n';
        });
    }

    return content;
}

/**
 * Calculate weighted keyword matching
 * Skills get higher weight than summary
 * Returns: { matchedKeywords, matchPercentage, details }
 */
function calculateKeywordMatches(jdText, resumeData) {
    const jdKeywords = extractKeywords(jdText);
    const resumeContent = extractResumeContent(resumeData);
    const resumeKeywords = extractKeywords(resumeContent);

    // Extract skills from resume for weighting
    const skillsText = resumeData.skills?.skills || '';
    const skillsKeywords = new Set(tokenize(skillsText));

    const matched = {};
    const missing = { ...jdKeywords };
    let totalWeight = 0;
    let matchedWeight = 0;

    // Check which JD keywords are in resume
    Object.entries(jdKeywords).forEach(([keyword, frequency]) => {
        const weight = skillsKeywords.has(keyword) ? 3 : 1; // Skills weighted 3x
        totalWeight += frequency * weight;

        if (resumeKeywords[keyword]) {
            matchedWeight += frequency * weight;
            matched[keyword] = {
                resumeFreq: resumeKeywords[keyword],
                jdFreq: frequency,
                inSkills: skillsKeywords.has(keyword),
            };
            delete missing[keyword];
        }
    });

    const matchPercentage = totalWeight > 0 ? Math.round((matchedWeight / totalWeight) * 100) : 0;

    return {
        matchedKeywords: matched,
        missingKeywords: missing,
        matchPercentage,
        totalJDKeywords: Object.keys(jdKeywords).length,
        matchedCount: Object.keys(matched).length,
        metrics: {
            totalWeight,
            matchedWeight,
        },
    };
}

/**
 * Generate actionable improvement suggestions
 * Based on missing keywords and content gaps
 */
function generateSuggestions(jdText, resumeData, matchResult) {
    const suggestions = [];
    const { missingKeywords, matchPercentage } = matchResult;

    // Get top missing skills
    const topMissing = Object.entries(missingKeywords)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([keyword]) => keyword);

    // Suggestion 1: Add missing skills
    if (topMissing.length > 0) {
        const skillsList = topMissing.slice(0, 3).join(', ');
        suggestions.push({
            type: 'skills',
            priority: 'high',
            text: `Add these keywords to your skills section: ${skillsList}`,
            action: 'Open Skills tab and add the listed keywords',
        });
    }

    // Suggestion 2: Enhance experience descriptions
    const hasExperience = Array.isArray(resumeData.experience) && resumeData.experience.length > 0;
    if (!hasExperience) {
        suggestions.push({
            type: 'experience',
            priority: 'high',
            text: 'Add professional experience with detailed achievements',
            action: 'Open Experience tab and fill in your work history',
        });
    } else {
        const avgLength = resumeData.experience.reduce((sum, exp) => {
            return sum + (exp.description || '').length;
        }, 0) / resumeData.experience.length;

        if (avgLength < 100) {
            suggestions.push({
                type: 'experience',
                priority: 'medium',
                text: 'Expand your experience descriptions with more keywords from the job description',
                action: 'Add more details about achievements, technologies used, and impact',
            });
        }
    }

    // Suggestion 3: Add projects if missing
    const hasProjects = Array.isArray(resumeData.projects) && resumeData.projects.length > 0;
    if (!hasProjects && matchPercentage < 60) {
        suggestions.push({
            type: 'projects',
            priority: 'medium',
            text: 'Add relevant projects to demonstrate practical experience',
            action: 'Open Projects tab and add 2-3 relevant projects',
        });
    }

    // Suggestion 4: Match percentage based
    if (matchPercentage < 40) {
        suggestions.push({
            type: 'general',
            priority: 'high',
            text: 'Low match score - review the job description and tailor your resume more closely',
            action: 'Identify core requirements in the JD and highlight matching experience',
        });
    } else if (matchPercentage < 70) {
        suggestions.push({
            type: 'general',
            priority: 'medium',
            text: 'Moderate match - add more specific keywords from the job description',
            action: 'Focus on required skills and technologies mentioned in the JD',
        });
    } else {
        suggestions.push({
            type: 'general',
            priority: 'low',
            text: 'Strong match! Your resume aligns well with the job description',
            action: 'Review and refine any remaining gaps',
        });
    }

    return suggestions;
}

/**
 * Main matching function
 * Compares JD with resume and returns comprehensive analysis
 */
export function analyzeJDMatch(jdText, resumeData) {
    if (!jdText || !jdText.trim()) {
        return {
            matchPercentage: 0,
            matchedKeywords: {},
            missingKeywords: {},
            suggestions: [],
            error: 'Job description is empty',
        };
    }

    if (!resumeData || typeof resumeData !== 'object') {
        return {
            matchPercentage: 0,
            matchedKeywords: {},
            missingKeywords: {},
            suggestions: [
                {
                    type: 'general',
                    priority: 'high',
                    text: 'Resume data is incomplete - fill in your resume sections first',
                    action: 'Add skills, experience, or project details',
                },
            ],
            error: 'Resume data missing',
        };
    }

    try {
        const matchResult = calculateKeywordMatches(jdText, resumeData);
        const suggestions = generateSuggestions(jdText, resumeData, matchResult);

        return {
            matchPercentage: matchResult.matchPercentage,
            matchedKeywords: matchResult.matchedKeywords,
            missingKeywords: matchResult.missingKeywords,
            matchedCount: matchResult.matchedCount,
            totalJDKeywords: matchResult.totalJDKeywords,
            suggestions,
            timestamp: Date.now(),
        };
    } catch (error) {
        console.error('Error in JD matching:', error);
        return {
            matchPercentage: 0,
            matchedKeywords: {},
            missingKeywords: {},
            suggestions: [],
            error: 'Error analyzing job description',
        };
    }
}

/**
 * Get top keywords from JD (for display)
 * Returns array of { keyword, frequency }
 */
export function getTopJDKeywords(jdText, limit = 20) {
    if (!jdText) return [];

    const keywords = extractKeywords(jdText);
    return Object.entries(keywords)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([keyword, freq]) => ({ keyword, frequency: freq }));
}

/**
 * Get matched keywords sorted by importance
 * Returns array of { keyword, matched: true/false }
 */
export function getSortedKeywords(matchResult, limit = 15) {
    const { matchedKeywords, missingKeywords } = matchResult;
    const all = [];

    Object.entries(matchedKeywords).forEach(([keyword, data]) => {
        all.push({ keyword, matched: true, frequency: data.jdFreq, inSkills: data.inSkills });
    });

    Object.entries(missingKeywords).forEach(([keyword, freq]) => {
        all.push({ keyword, matched: false, frequency: freq, inSkills: false });
    });

    return all.sort((a, b) => {
        // Priority: matched + in skills, then matched, then high frequency missing
        const aScore = (a.matched ? 100 : 0) + (a.inSkills ? 50 : 0) + a.frequency;
        const bScore = (b.matched ? 100 : 0) + (b.inSkills ? 50 : 0) + b.frequency;
        return bScore - aScore;
    }).slice(0, limit);
}
