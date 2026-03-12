import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) return null;

    const decoded: { id: string } = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as { id: string };
    return decoded.id;
  } catch (error: any) {
    console.error("Error decoding token:", error);
    return null;
  }
};
