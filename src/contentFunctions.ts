import { createServerFn } from "@tanstack/react-start";
import * as fs from "fs/promises";
import * as path from "path";
import defaultContent from "../content.json";

const contentFilePath = path.resolve(process.cwd(), "content.json");

export const getContent = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const data = await fs.readFile(contentFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // fs.readFile will fail on Vercel due to serverless constraints.
    // Fall back to the statically bundled JSON file.
    return defaultContent;
  }
});

export const updateContent = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    try {
      await fs.writeFile(contentFilePath, JSON.stringify(data, null, 2), "utf-8");
      return { success: true };
    } catch (error) {
      console.error("Failed to write content.json", error);
      return { success: false, error: String(error) };
    }
  });

export const uploadImage = createServerFn({ method: "POST" })
  .validator((data: { base64Data: string; filename: string }) => data)
  .handler(async ({ data }) => {
    try {
      const publicPath = path.resolve(process.cwd(), "public");
      // Ensure public directory exists
      await fs.mkdir(publicPath, { recursive: true });
      
      const fileName = `${Date.now()}-${data.filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const filePath = path.resolve(publicPath, fileName);
      
      // Base64 string might have prefix like "data:image/jpeg;base64,"
      const base64Content = data.base64Data.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Content, "base64");
      
      await fs.writeFile(filePath, buffer);
      
      return { success: true, url: `/${fileName}` };
    } catch (error) {
      console.error("Failed to upload image", error);
      return { success: false, error: String(error) };
    }
  });
