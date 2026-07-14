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
