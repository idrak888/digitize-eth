// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  const { name, walletAddress, email, physicalAddress, kycEsa } = req.body;

  if (!name || !walletAddress || !email || !physicalAddress || !kycEsa) {
    return res.status(401).json(false);
  }
  
  const newUser = await prisma.user.create({
    data: {
      name,
      walletAddress,
      email,
      physicalAddress,
      kycEsa,
    },
  });

  if (!newUser) {
    throw new Error("Error creating user");
  }

  return res.status(200).json(true);
}
