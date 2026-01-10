/**
 * ATS Resume Intelligence Engine
 * Rule-based scoring system for resume optimization
 * Calculates scores 0-100 with detailed breakdown and improvement suggestions
 */

// Action verbs commonly found in strong resumes (ATS-friendly)
const ACTION_VERBS = [
    'achieved', 'accelerated', 'accepted', 'accomplished', 'coordinated', 'created',
    'delivered', 'designed', 'developed', 'directed', 'executed', 'expanded',
    'founded', 'generated', 'implemented', 'improved', 'increased', 'initiated',
    'launched', 'led', 'managed', 'optimized', 'organized', 'pioneered',
    'produced', 'proposed', 'reduced', 'refined', 'restructured', 'scaled',
    'solved', 'spearheaded', 'strengthened', 'streamlined', 'transformed', 'orchestrated',
];

// Metrics patterns (numbers, percentages, dollar amounts)
const METRICS_PATTERN = /\b(\d+(?:[,.]?\d+)?)\s*(%|x|times|increase|decrease|growth|improvement|reduction)\b/gi;
const PERCENTAGE_PATTERN = /\b\d+\s*%/g;
const CURRENCY_PATTERN = /\$\s*\d+[KMB]?|\d+\s*(?:million|billion|thousand)/gi;

/**
 * Evaluate contact section completeness
 * Returns score (0-15) based on filled fields
 */
function scoreContact(contactData) {
    let score = 0;
    const maxScore = 15;
    const requiredFields = { name: 1, email: 1, phone: 1 };
    const optionalFields = { linkedin: 2, github: 2, portfolio: 2 };

    // Check required fields
    let requiredFilled = 0;
    Object.entries(requiredFields).forEach(([field]) => {
        if (contactData[field]?.trim()) {
            score += requiredFields[field];
            requiredFilled++;
        }
    });

    // Check optional fields
    Object.entries(optionalFields).forEach(([field]) => {
        if (contactData[field]?.trim()) {
            score += optionalFields[field];
        }
    });

    return {
        score: Math.min(score, maxScore),
        maxScore,
        details: {
            hasName: !!contactData.name?.trim(),
            hasEmail: !!contactData.email?.trim(),
            hasPhone: !!contactData.phone?.trim(),
            hasLinkedIn: !!contactData.linkedin?.trim(),
            hasGitHub: !!contactData.github?.trim(),
            hasPortfolio: !!contactData.portfolio?.trim(),
        },
    };
}

/**
 * Evaluate summary section presence and quality
 * Returns score (0-10) based on length and content
 */
function scoreSummary(summaryData) {
    const text = summaryData.summary?.trim() || '';
    const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;

    let score = 0;
    const maxScore = 10;

    if (text.length === 0) {
        return { score: 0, maxScore, details: { hasSummary: false, wordCount: 0 } };
    }

    // 2-5 lines is ideal (roughly 30-100 words)
    if (wordCount >= 30 && wordCount <= 100) {
        score = maxScore;
    } else if (wordCount >= 15 && wordCount < 30) {
        score = 6;
    } else if (wordCount >= 100 && wordCount <= 150) {
        score = 8;
    } else if (wordCount > 0) {
        score = 3;
    }

    return {
        score: Math.min(score, maxScore),
        maxScore,
        details: {
            hasSummary: true,
            wordCount,
            isOptimalLength: wordCount >= 30 && wordCount <= 100,
        },
    };
}

/**
 * Evaluate education section completeness
 * Returns score (0-15) based on entries and field completeness
 */
function scoreEducation(educationData) {
    let score = 0;
    const maxScore = 15;

    if (!Array.isArray(educationData) || educationData.length === 0) {
        return { score: 0, maxScore, details: { hasEducation: false, entryCount: 0 } };
    }

    const entryCount = Math.min(educationData.length, 2); // Max 2 entries for scoring
    score += entryCount * 5;

    let completeEntries = 0;
    educationData.forEach(entry => {
        const hasRequiredFields = entry.degree?.trim() && entry.institution?.trim();
        if (hasRequiredFields) completeEntries++;
    });

    score += Math.min(completeEntries * 3, 5);

    return {
        score: Math.min(score, maxScore),
        maxScore,
        details: {
            hasEducation: entryCount > 0,
            entryCount,
            completeEntries,
        },
    };
}

/**
 * Evaluate experience section quality
 * Returns score (0-30) based on entries, content, and metrics
 */
function scoreExperience(experienceData) {
    let score = 0;
    const maxScore = 30;

    if (!Array.isArray(experienceData) || experienceData.length === 0) {
        return {
            score: 0,
            maxScore,
            details: { hasExperience: false, entryCount: 0, avgBulletsPerEntry: 0, entriesWithMetrics: 0 },
        };
    }

    // Base score for having entries (max 2 entries for scoring)
    const entryCount = Math.min(experienceData.length, 3);
    score += entryCount * 5;

    let totalBullets = 0;
    let entriesWithMetrics = 0;
    let completeness = 0;

    experienceData.slice(0, 3).forEach(entry => {
        // Check completeness
        if (entry.role?.trim() && entry.company?.trim()) {
            completeness++;
        }

        // Count bullet points
        const bullets = (entry.description || '').split('\n').filter(line => line.trim().length > 0).length;
        totalBullets += bullets;

        // Detect metrics
        if (METRICS_PATTERN.test(entry.description) || PERCENTAGE_PATTERN.test(entry.description)) {
            entriesWithMetrics++;
        }
    });

    // Bonus for detailed descriptions
    score += Math.min(completeness * 3, 5);

    // Bonus for metrics in descriptions
    score += Math.min(entriesWithMetrics * 3, 8);

    const avgBulletsPerEntry = entryCount > 0 ? Math.round((totalBullets / entryCount) * 10) / 10 : 0;

    return {
        score: Math.min(score, maxScore),
        maxScore,
        details: {
            hasExperience: entryCount > 0,
            entryCount,
            avgBulletsPerEntry,
            entriesWithMetrics,
        },
    };
}

/**
 * Evaluate projects section
 * Returns score (0-15) based on entries and quality
 */
function scoreProjects(projectsData) {
    let score = 0;
    const maxScore = 15;

    if (!Array.isArray(projectsData) || projectsData.length === 0) {
        return { score: 0, maxScore, details: { hasProjects: false, entryCount: 0 } };
    }

    const entryCount = Math.min(projectsData.length, 2);
    score += entryCount * 5;

    let completeProjects = 0;
    projectsData.slice(0, 2).forEach(project => {
        if (project.title?.trim() && project.description?.trim()) {
            completeProjects++;
        }
    });

    score += completeProjects * 3;

    return {
        score: Math.min(score, maxScore),
        maxScore,
        details: { hasProjects: entryCount > 0, entryCount, completeProjects },
    };
}

/**
 * Evaluate skills section
 * Returns score (0-15) based on skill count and formatting
 */
function scoreSkills(skillsData) {
    let score = 0;
    const maxScore = 15;

    if (!skillsData || typeof skillsData !== 'object' || Object.keys(skillsData).length === 0) {
        return { score: 0, maxScore, details: { hasSkills: false, skillCount: 0 } };
    }

    let totalSkills = 0;
    let categoriesWithSkills = 0;

    Object.entries(skillsData).forEach(([category, skills]) => {
        if (Array.isArray(skills) && skills.length > 0) {
            categoriesWithSkills++;
            const validSkills = skills.filter(s => s?.trim());
            totalSkills += validSkills.length;
        } else if (typeof skills === 'string' && skills.trim()) {
            categoriesWithSkills++;
            // Count comma-separated skills
            totalSkills += skills.split(',').filter(s => s.trim()).length;
        }
    });

    // 1 point per skill, max 10; 5 points for having categories
    score = Math.min(totalSkills, 10) + (categoriesWithSkills > 0 ? 5 : 0);

    return {
        score: Math.min(score, maxScore),
        maxScore,
        details: {
            hasSkills: totalSkills > 0,
            skillCount: totalSkills,
            categoriesWithSkills,
        },
    };
}

/**
 * Detect action verbs and their frequency in experience/projects
 * Returns score (0-10) based on usage
 */
function scoreActionVerbs(resumeData) {
    let score = 0;
    const maxScore = 10;
    let totalActionVerbs = 0;

    const textToAnalyze = [
        ...((resumeData.experience || []).map(e => e.description || '')),
        ...((resumeData.projects || []).map(p => p.description || '')),
    ].join(' ').toLowerCase();

    ACTION_VERBS.forEach(verb => {
        const matches = textToAnalyze.match(new RegExp(`\\b${verb}\\b`, 'g'));
        if (matches) totalActionVerbs += matches.length;
    });

    // 1 point per 2 action verbs, max 10
    score = Math.min(Math.floor(totalActionVerbs / 2), maxScore);

    return {
        score,
        maxScore,
        details: { actionVerbCount: totalActionVerbs, hasActionVerbs: totalActionVerbs > 0 },
    };
}

/**
 * Check for common formatting issues
 * Returns score (0-5) based on issues found
 */
function scoreFormatting(resumeData) {
    let score = 5; // Start with max
    const maxScore = 5;
    const issues = [];

    // Empty sections
    const emptyExperience = !resumeData.experience || resumeData.experience.length === 0;
    const emptyEducation = !resumeData.education || resumeData.education.length === 0;

    if (emptyExperience && emptyEducation) {
        score -= 5;
        issues.push('Missing both experience and education');
    } else if (emptyExperience) {
        score -= 2;
        issues.push('Missing professional experience');
    }

    // Missing dates in experience
    const experienceWithoutDates = (resumeData.experience || []).filter(e => !e.start || !e.end).length;
    if (experienceWithoutDates > 0) {
        score -= Math.min(experienceWithoutDates, 2);
        issues.push(`${experienceWithoutDates} experience entries missing dates`);
    }

    // Missing titles
    const experienceWithoutTitle = (resumeData.experience || []).filter(e => !e.role).length;
    if (experienceWithoutTitle > 0) {
        score -= 1;
        issues.push(`${experienceWithoutTitle} experience entries missing job title`);
    }

    return {
        score: Math.max(score, 0),
        maxScore,
        details: { issues },
    };
}

/**
 * Generate improvement suggestions based on scoring breakdown
 */
function generateSuggestions(breakdown) {
    const suggestions = [];

    // Contact suggestions
    if (!breakdown.contact.details.hasEmail) {
        suggestions.push({
            category: 'Contact Information',
            priority: 'high',
            text: 'Add your email address to make it easy for recruiters to contact you',
            points: 5,
        });
    }
    if (!breakdown.contact.details.hasPhone) {
        suggestions.push({
            category: 'Contact Information',
            priority: 'high',
            text: 'Add your phone number for direct recruiter outreach',
            points: 5,
        });
    }
    if (!breakdown.contact.details.hasLinkedIn && !breakdown.contact.details.hasGitHub) {
        suggestions.push({
            category: 'Contact Information',
            priority: 'medium',
            text: 'Add LinkedIn or GitHub profile URL to boost credibility',
            points: 4,
        });
    }

    // Summary suggestions
    if (!breakdown.summary.details.hasSummary) {
        suggestions.push({
            category: 'Professional Summary',
            priority: 'medium',
            text: 'Add a 2-3 line professional summary highlighting your key strengths and experience level',
            points: 10,
        });
    } else if (!breakdown.summary.details.isOptimalLength) {
        suggestions.push({
            category: 'Professional Summary',
            priority: 'low',
            text: 'Keep your summary between 30-100 words for optimal ATS scanning',
            points: 3,
        });
    }

    // Experience suggestions
    if (breakdown.experience.details.entryCount === 0) {
        suggestions.push({
            category: 'Professional Experience',
            priority: 'high',
            text: 'Add at least one professional experience entry to strengthen your resume',
            points: 30,
        });
    } else if (breakdown.experience.details.avgBulletsPerEntry < 2) {
        suggestions.push({
            category: 'Professional Experience',
            priority: 'high',
            text: 'Add 3-5 bullet points per job with specific achievements and results',
            points: 10,
        });
    }

    // Metrics suggestions
    if (breakdown.experience.details.entryCount > 0 && breakdown.experience.details.entriesWithMetrics === 0) {
        suggestions.push({
            category: 'Experience Details',
            priority: 'high',
            text: 'Include quantifiable metrics (%, numbers, growth) in your experience bullets. Example: "Increased sales by 25%"',
            points: 8,
        });
    }

    // Action verbs suggestions
    if (!breakdown.actionVerbs.details.hasActionVerbs) {
        suggestions.push({
            category: 'Language',
            priority: 'high',
            text: 'Use strong action verbs (e.g., "Led", "Optimized", "Scaled") to start bullet points',
            points: 5,
        });
    } else if (breakdown.actionVerbs.details.actionVerbCount < 5) {
        suggestions.push({
            category: 'Language',
            priority: 'medium',
            text: 'Use more action verbs to make your experience descriptions stronger and more impactful',
            points: 3,
        });
    }

    // Skills suggestions
    if (breakdown.skills.details.skillCount === 0) {
        suggestions.push({
            category: 'Skills',
            priority: 'high',
            text: 'Add technical and soft skills organized by category (e.g., Programming, Tools, Languages)',
            points: 15,
        });
    } else if (breakdown.skills.details.skillCount < 5) {
        suggestions.push({
            category: 'Skills',
            priority: 'medium',
            text: 'Expand your skills list to include 10+ relevant technical and soft skills',
            points: 5,
        });
    }

    // Formatting suggestions
    if (breakdown.formatting.details.issues.length > 0) {
        breakdown.formatting.details.issues.forEach(issue => {
            suggestions.push({
                category: 'Formatting',
                priority: 'medium',
                text: issue,
                points: 1,
            });
        });
    }

    // Sort by priority and points
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    suggestions.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority] || b.points - a.points);

    return suggestions;
}

/**
 * Main scoring function - orchestrates all rule evaluations
 * Returns complete ATS score and breakdown
 */
export function calculateATSScore(resumeData) {
    // Evaluate each section
    const contact = scoreContact(resumeData.contact || {});
    const summary = scoreSummary(resumeData.summary || {});
    const education = scoreEducation(resumeData.education);
    const experience = scoreExperience(resumeData.experience);
    const projects = scoreProjects(resumeData.projects);
    const skills = scoreSkills(resumeData.skills || {});
    const actionVerbs = scoreActionVerbs(resumeData);
    const formatting = scoreFormatting(resumeData);

    // Compile breakdown
    const breakdown = {
        contact,
        summary,
        education,
        experience,
        projects,
        skills,
        actionVerbs,
        formatting,
    };

    // Calculate total score
    const totalScore = Math.round(
        contact.score +
        summary.score +
        education.score +
        experience.score +
        projects.score +
        skills.score +
        actionVerbs.score +
        formatting.score,
    );

    const maxTotalScore = 100;

    // Generate suggestions
    const suggestions = generateSuggestions(breakdown);

    return {
        score: Math.min(totalScore, maxTotalScore),
        maxScore: maxTotalScore,
        breakdown,
        suggestions,
        timestamp: Date.now(),
    };
}

/**
 * Determine score grade (A, B, C, D, F) for UI display
 */
export function getScoreGrade(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
}

/**
 * Determine score color for visual feedback
 */
export function getScoreColor(score) {
    if (score >= 85) return '#10b981'; // green
    if (score >= 70) return '#3b82f6'; // blue
    if (score >= 50) return '#f59e0b'; // amber
    return '#ef4444'; // red
}
