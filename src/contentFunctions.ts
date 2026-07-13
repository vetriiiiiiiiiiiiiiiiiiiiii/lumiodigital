import { createServerFn } from "@tanstack/react-start";
import * as fs from "fs/promises";
import * as path from "path";

const contentFilePath = path.resolve(process.cwd(), "content.json");

export const getContent = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const data = await fs.readFile(contentFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to read content.json", error);
    return null;
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
