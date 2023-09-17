import { NextApiRequest, NextApiResponse } from "next";

type InputBody = {
  walletAddress: string;
  imageUrl: string;
  itemName: string;
  psaGrade: string;
  certificateNumber: string; 
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { walletAddress, imageUrl, itemName, psaGrade, certificateNumber } = req.body;
  
}
