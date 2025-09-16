import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export function getContentData(filename: string) {
  const contentDirectory = path.join(process.cwd(), "content");
  const fullPath = path.join(contentDirectory, `${filename}.yaml`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return yaml.load(fileContents);
}

export function getExtrasContentData(filename: string) {
  const contentDirectory = path.join(process.cwd(), "content", "extras");
  const fullPath = path.join(contentDirectory, `${filename}.yaml`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return yaml.load(fileContents);
}

export function getLegalContentData(filename: string) {
  const contentDirectory = path.join(process.cwd(), "content", "legal");
  const fullPath = path.join(contentDirectory, `${filename}.yaml`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return yaml.load(fileContents);
}
