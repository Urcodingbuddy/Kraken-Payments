// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'; // For hashing the password

const prisma = new PrismaClient();

async function main() {
    // Hash the password
    const hashedPassword = await bcrypt.hash('123', 10); // Use your desired password

    // Create a user
    const user = await prisma.user.create({
        data: {
            email: '123@mail.com',
            name: '123',
            number: '123123',
            password: hashedPassword,
            auth_type: 'credentials', // Set authentication type
            Balance: {
                create: {
                    amount: 100, // Set the initial amount
                    locked: 0,   // Set the locked amount
                },
            },
        },
    });

    console.log(`User created: ${user.name}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
