import { Router } from 'express';
import { prisma } from '../index.js';
const r = Router();
r.get('/', async (_req, res) => res.json(await prisma.membershipTier.findMany({ orderBy: { tierLevel: 'asc' } })));
r.post('/', async (req, res) => {
  const { name, priceMonth, benefits=[], tierLevel=0 } = req.body;
  const tier = await prisma.membershipTier.create({ data: { name, priceMonth, benefits, tierLevel } });
  res.status(201).json(tier);
});
export default r;
