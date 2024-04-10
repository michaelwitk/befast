import { PrismaClient } from '@prisma/client'

BigInt.prototype.toJSON = function () {
  return String(this)
}

export const prisma = new PrismaClient()
