import { Router } from 'express';
import { prisma } from '../index.js';
const r = Router();
r.get('/', async (_req, res) => res.json(await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })));
r.post('/', async (req, res) => {
  const { name, email, role='member', phone } = req.body;
  const user = await prisma.user.create({ data: { name, email, role, phone } });
  res.status(201).json(user);
});
export default r;
