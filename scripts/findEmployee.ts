import { User, PrismaClient } from "@prisma/client";
require("dotenv").config();

const prisma = new PrismaClient();

const findEmployee = async () => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    console.log(`\nDados dos Employees:\n`);
    employees.forEach((employee, index) => {
      console.log(
        `Employee: ${index + 1}:\nID: ${employee.id}\nName: ${
          employee.user.name
        }\nUserID: ${employee.userid}\n`
      );
    });
  } catch (error) {
    console.error("Erro ao buscar lista de credenciais dos usuários:", error);
  } finally {
    await prisma.$disconnect(); // Disconnect from the Prisma client
  }
};

findEmployee();
