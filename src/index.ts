import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';
import members from './routes/members.js';
import tiers from './routes/tiers.js';
import attendance from './routes/attendance.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL?.split(',') || '*' }));
app.use(express.json());

export const prisma = new PrismaClient();

app.get('/', (_req, res) => res.json({ status: 'GymHub API (Postgres)', time: new Date() }));
app.use('/users', members);
app.use('/tiers', tiers);
app.use('/attendance', attendance);

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`GymHub API listening on ${port}`));
