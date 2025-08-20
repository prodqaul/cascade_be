import { Request, Response } from "express";
import { sendResponse } from "../utils/httpRceptions";
import { read_function, insert_function } from "../utils/db_methods";

interface CategoryAttributes {
  id?: string;
  categoryName: string;
}

// Create Category
export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { categoryName } = req.body;

    if (!categoryName) {
      sendResponse(res, 400, "BAD REQUEST", "categoryName is required");
      return;
    }

    const existingCategory = await read_function<CategoryAttributes | null>(
      "Category" as any,
      "findOne",
      { where: { categoryName } }
    );

    if (existingCategory) {
      sendResponse(res, 409, "CONFLICT", "Category already exists");
      return;
    }

    const newCategory = await insert_function<CategoryAttributes>(
      "Category" as any,
      "create",
      { categoryName }
    );

    sendResponse(
      res,
      201,
      "SUCCESS",
      "Category created successfully",
      newCategory
    );
  } catch (error) {
    console.log("Error creating category:", error);
    sendResponse(res, 500, "ERROR", "Internal server error");
  }
};

// Get all Categories
export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await read_function<CategoryAttributes[]>(
      "Category" as any,
      "findAll"
    );
    sendResponse(
      res,
      200,
      "SUCCESS",
      "Categories fetched successfully",
      categories
    );
  } catch (error) {
    sendResponse(res, 500, "ERROR", "Internal server error");
  }
};

// Get single Category by ID
export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await read_function<CategoryAttributes | null>(
      "Category" as any,
      "findOne",
      { where: { id } }
    );

    if (!category) {
      sendResponse(res, 404, "NOT FOUND", "Category not found");
      return;
    }

    sendResponse(
      res,
      200,
      "SUCCESS",
      "Category fetched successfully",
      category
    );
  } catch (error) {
    sendResponse(res, 500, "ERROR", "Internal server error");
  }
};

// Update Category
export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;

    const category = await read_function<CategoryAttributes | null>(
      "Category" as any,
      "findOne",
      { where: { id } }
    );

    if (!category) {
      sendResponse(res, 404, "NOT FOUND", "Category not found");
      return;
    }

    await insert_function<CategoryAttributes>(
      "Category" as any,
      "update",
      { categoryName },
      { where: { id } }
    );

    sendResponse(res, 200, "SUCCESS", "Category updated successfully");
  } catch (error) {
    sendResponse(res, 500, "ERROR", "Internal server error");
  }
};

// Delete Category
export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const category = await read_function<CategoryAttributes | null>(
      "Category" as any,
      "findOne",
      { where: { id } }
    );

    if (!category) {
      sendResponse(res, 404, "NOT FOUND", "Category not found");
      return;
    }

    await read_function<any>("Category" as any, "destroy", { where: { id } });
    sendResponse(res, 200, "SUCCESS", "Category deleted successfully");
  } catch (error) {
    sendResponse(res, 500, "ERROR", "Internal server error");
  }
};
