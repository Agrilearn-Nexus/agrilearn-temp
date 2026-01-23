import fs from "fs/promises";
import path from "path";
import { existsSync, mkdirSync } from "fs";
import { fileTypeFromBuffer } from "file-type";

const TEMP_DIR = path.join(process.cwd(), "tmp/uploads");

if (!existsSync(TEMP_DIR)) {
    mkdirSync(TEMP_DIR, { recursive: true });
}

export async function saveTempFile(key: string, file: File) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(TEMP_DIR, key);

    await fs.writeFile(filePath, buffer);
    return filePath;
}

export async function deleteTempFile(key: string) {
    const filePath = path.join(TEMP_DIR, key);
    try {
        await fs.unlink(filePath);
    } catch (error) {
        console.warn(`Failed to cleanup temp file ${key}:`, error);
    }
}

export async function getTempFile(key: string) {
    const filePath = path.join(TEMP_DIR, key);
    const buffer = await fs.readFile(filePath);
    const type = await fileTypeFromBuffer(buffer);

    if (!type) {
        throw new Error("Unable to detect file type");
    }

    return {
        buffer,
        mimeType: type.mime,
        extension: type.ext,
    };
}