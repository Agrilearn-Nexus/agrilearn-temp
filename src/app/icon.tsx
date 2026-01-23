import { ImageResponse } from "next/og"
import fs from "fs"
import path from "path"

export const size = {
    width: 32,
    height: 32,
}

export const contentType = "image/png"

export default async function Icon() {
    const logoPath = path.join(process.cwd(), "public/logo.jpeg")
    const logoBuffer = fs.readFileSync(logoPath)
    const logoBase64 = `data:image/jpeg;base64,${logoBuffer.toString("base64")}`

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent",
                    borderRadius: "6px",
                }}
            >
                <img
                    src={logoBase64}
                    width="28"
                    height="28"
                    style={{
                        objectFit: "contain",
                        borderRadius: "50%",
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    )
}
