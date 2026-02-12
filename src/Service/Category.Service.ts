import { axiosInstance } from "../lib/axios";
import { handleError } from "./ErrorHandler";

import {
  CREATE_CATEGORY,
  GET_CATEGORIES,
  FETCH_CATEGORIES,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CREATE_SUBCATEGORY,
  GET_SUBCATEGORIES,
  UPDATE_SUBCATEGORY,
  DELETE_SUBCATEGORY,
  CREATE_SKILL,
  GET_SKILLS,
  UPDATE_SKILL,
  DELETE_SKILL,
  GET_ALL_SKILLS,
} from "../Constant/ApiRoutes/SkillRoutes";

// Categories
export const createCategory = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(CREATE_CATEGORY, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const fetchCategoriesService = async (params: {
  search?: string;
  page?: number;
  limit?: number;
} = {}) => {
  try {
    const { search, page = 1, limit = 10 } = params;
    const response = await axiosInstance.get(GET_CATEGORIES, {
      params: { search, page, limit },
    });
    const { categories, total } = response.data.data;
    return { items: categories, total };
  } catch (error) {
    handleError(error);
    return { items: [], total: 0 };
  }
};

export const getCategoriesService = async () => {
  try {
    const response = await axiosInstance.get(FETCH_CATEGORIES);
    return response.data.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const updateCategory = async (editingCategoryId: string, formData: FormData) => {
  try {
    const response = await axiosInstance.put(
      UPDATE_CATEGORY(editingCategoryId),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const response = await axiosInstance.delete(DELETE_CATEGORY(id));
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

// Subcategories
export const createSubCategory = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(CREATE_SUBCATEGORY, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchSubCategoriesService = async (
  categoryId: string,
  params: { search?: string; page?: number; limit?: number } = {}
) => {
  try {
    const { search, page = 1, limit = 10 } = params;
    const response = await axiosInstance.get(GET_SUBCATEGORIES(categoryId), {
      params: { search, page, limit },
    });
    const { subcategories, total } = response.data.data;
    return { items: subcategories, total };
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updateSubCategory = async (
  editingSubCategoryId: string,
  formData: FormData
) => {
  try {
    const response = await axiosInstance.put(
      UPDATE_SUBCATEGORY(editingSubCategoryId),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteSubCategory = async (id: string) => {
  try {
    const response = await axiosInstance.delete(DELETE_SUBCATEGORY(id));
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

// Skills
export const createSkill = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(CREATE_SKILL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchSkillsService = async (
  subcategoryId: string,
  params: { search?: string; page?: number; limit?: number } = {}
) => {
  try {
    const { search, page = 1, limit = 10 } = params;
    const response = await axiosInstance.get(GET_SKILLS(subcategoryId), {
      params: { search, page, limit },
    });
    const { skills, total } = response.data.data;
    return { items: skills, total };
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updateSkill = async (editingSkillId: string, formData: FormData) => {
  try {
    const response = await axiosInstance.put(
      UPDATE_SKILL(editingSkillId),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteSkill = async (id: string) => {
  try {
    const response = await axiosInstance.delete(DELETE_SKILL(id));
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllSkills = async () => {
  try {
    const response = await axiosInstance.get(GET_ALL_SKILLS);
    return response.data.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};