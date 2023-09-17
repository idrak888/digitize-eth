import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Given wallet address, return user
    const { walletAddress } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        walletAddress,
      },
    });

    return res.status(200).json(user || null);
  } catch (e) {
    console.log(e);
    return res.status(200).json(null);
  }
}
