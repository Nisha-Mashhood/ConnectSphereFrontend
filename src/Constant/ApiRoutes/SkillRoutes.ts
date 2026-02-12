export const CATEGORY_BASE = '/category';
export const SUBCATEGORY_BASE = '/subcategory';
export const SKILLS_BASE = '/skills';

// Categories
export const CREATE_CATEGORY = `${CATEGORY_BASE}/create-category`;
export const GET_CATEGORIES = `${CATEGORY_BASE}/get-categories`;
export const FETCH_CATEGORIES = `${CATEGORY_BASE}/fetch-categories`;
export const UPDATE_CATEGORY = (id: string) => `${CATEGORY_BASE}/update-category/${id}`;
export const DELETE_CATEGORY = (id: string) => `${CATEGORY_BASE}/delete-category/${id}`;

// Subcategories
export const CREATE_SUBCATEGORY = `${SUBCATEGORY_BASE}/create-subcategory`;
export const GET_SUBCATEGORIES = (categoryId: string) =>
  `${SUBCATEGORY_BASE}/get-subcategories/${categoryId}`;
export const UPDATE_SUBCATEGORY = (id: string) => `${SUBCATEGORY_BASE}/update-subcategory/${id}`;
export const DELETE_SUBCATEGORY = (id: string) => `${SUBCATEGORY_BASE}/delete-subcategory/${id}`;

// Skills
export const CREATE_SKILL = `${SKILLS_BASE}/create-skill`;
export const GET_SKILLS = (subcategoryId: string) => `${SKILLS_BASE}/get-skills/${subcategoryId}`;
export const UPDATE_SKILL = (id: string) => `${SKILLS_BASE}/update-skill/${id}`;
export const DELETE_SKILL = (id: string) => `${SKILLS_BASE}/delete-skill/${id}`;
export const GET_ALL_SKILLS = `${SKILLS_BASE}/get-allSkills`;