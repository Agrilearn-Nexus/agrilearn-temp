import fs from "fs/promises";
import path from "path";
import { fileTypeFromBuffer } from "file-type";

export async function getTempFile(key: string) {
    const filePath = path.join("/tmp/uploads", key);

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
