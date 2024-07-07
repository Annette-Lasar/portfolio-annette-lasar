import { CandidateSkills } from './candidate-skills.interface';
import { Portfolio } from './portfolio.interface';

export interface Static {
    german_flag: string;
    english_flag: string;
    french_flag: string;
    favicon: string;
    candidate_logo: string;
    candidate_name: string;
    candidate_street: string;
    candidate_town: string;
    candidate_phone_number: string;
    ink_blot: string;
    email: string;
    arrow_dark: string;
    candidate_photo: string;
    candidate_skills: CandidateSkills[];
    portfolio: Portfolio;
    arrow_light: string;
    copyright: string;
    github_logo: string;
    email_logo: string;
    linkedin_logo: string;
}