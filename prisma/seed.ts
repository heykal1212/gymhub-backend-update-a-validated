import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const basic = await prisma.membershipTier.create({ data: { name: 'Basic', priceMonth: 800, benefits: ['Gym floor'], tierLevel: 0 } });
  const plus  = await prisma.membershipTier.create({ data: { name: 'Plus',  priceMonth: 1200, benefits: ['Gym floor','Classes'], tierLevel: 1 } });
  const pro   = await prisma.membershipTier.create({ data: { name: 'Pro',   priceMonth: 1800, benefits: ['All access','PT discount'], tierLevel: 2 } });

  await prisma.user.upsert({ where: { email: 'dorms.kernel_4y@icloud.com' }, update: { role: Prisma.Role.admin }, create: { name: 'Owner', email: 'dorms.kernel_4y@icloud.com', role: Prisma.Role.admin } });
  await prisma.user.upsert({ where: { email: 'dorms.kernel_4y+staff@icloud.com' }, update: { role: Prisma.Role.staff }, create: { name:'Front Desk', email:'dorms.kernel_4y+staff@icloud.com', role: Prisma.Role.staff } });
  await prisma.user.upsert({ where: { email: 'dorms.kernel_4y+trainer@icloud.com' }, update: { role: Prisma.Role.trainer }, create: { name:'Coach', email:'dorms.kernel_4y+trainer@icloud.com', role: Prisma.Role.trainer } });
  await prisma.user.upsert({ where: { email: 'dorms.kernel_4y+member@icloud.com' }, update: { role: Prisma.Role.member }, create: { name:'Demo Member', email:'dorms.kernel_4y+member@icloud.com', role: Prisma.Role.member } });

  console.log('Seed complete', { tiers:[basic.name, plus.name, pro.name] });
}

main().then(()=>process.exit(0)).catch(e=>{ console.error(e); process.exit(1); });
