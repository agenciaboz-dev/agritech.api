// import { CloseCall, OpenCall } from "../definitions/call";
import { PrismaClient } from "@prisma/client";
import { NewReport } from "../definitions/report";

const prisma = new PrismaClient();

const create = async (data: NewReport) => {
  console.log(data);

  const report = await prisma.report.create({
    data: {
      call: { connect: { id: data.callId } },

      areaTrabalhada: data.areaTrabalhada,
      date: new Date().getTime().toString(),
      hour: new Date().getTime().toString(),

      operation: {
        create: {
          service: data.operation.service,
          culture: data.operation.culture,
          areaMap: data.operation.areaMap,
          equipment: data.operation.equipment,
          model: data.operation.model,
        },
      },
      material: {
        create: data.material.map((material) => ({
          talhao: material.talhao,
          area: material.area,
          product: material.product,
          dosage: material.dosage,
          classification: material.classification,
          total: material.total,
          removed: material.removed,
          applied: material.applied,
          returned: material.returned,
          comments: material.comments,
        })),
      },
      techReport: {
        create: {
          date: data.techReport.date,
          init: data.techReport.init,
          finish: data.techReport.finish,
          comments: data.techReport.comments,
          flight: {
            create: data.techReport.flight.map((flight) => ({
              humidity: flight.humidity,
              temperature: flight.temperature,
              wind_velocity: flight.wind_velocity,
              height: flight.height,
              faixa: flight.faixa,
              flight_velocity: flight.flight_velocity,
              tank_volume: flight.tank_volume,
              rate: flight.rate,
              performance: flight.performance,
            })),
          },
        },
      },
      treatment: {
        create: {
          products: {
            create: data.treatment.products.map((product) => ({
              name: product.name,
              dosage: product.dosage,
              unit: product.unit,
            })),
          },
        },
      },
    },
    include: {
      operation: true,
      treatment: { include: { products: true } },
      material: true,
      techReport: { include: { flight: true } },
    },
  });
  console.log(report);

  return report;
};

const update = async (data: NewReport) => {
  console.log(data);

  const report = await prisma.report.update({
    where: { id: data.id },
    data: {
      areaTrabalhada: data.areaTrabalhada,
      // Update operation if available
      operation: {
        update: {
          where: { id: data.operation.id },
          data: {
            service: data.operation.service,
            culture: data.operation.culture,
            areaMap: data.operation.areaMap,
            equipment: data.operation.equipment,
            model: data.operation.model,
          },
        },
      },
      // Update material if available
      material: {
        updateMany: data.material.map((material) => ({
          where: { id: material.id },
          data: {
            talhao: material.talhao,
            area: material.area,
            product: material.product,
            dosage: material.dosage,
            classification: material.classification,
            total: material.total,
            removed: material.removed,
            applied: material.applied,
            returned: material.returned,
            comments: material.comments,
          },
        })),
      },
      // Update techReport if available
      techReport: {
        update: {
          where: { id: data.techReport.id },
          data: {
            date: data.techReport.date,
            init: data.techReport.init,
            finish: data.techReport.finish,
            comments: data.techReport.comments,
            // Update nested flight if available
            flight: {
              updateMany: data.techReport.flight.map((flight) => ({
                where: { id: flight.id },
                data: {
                  humidity: flight.humidity,
                  temperature: flight.temperature,
                  wind_velocity: flight.wind_velocity,
                  height: flight.height,
                  faixa: flight.faixa,
                  flight_velocity: flight.flight_velocity,
                  tank_volume: flight.tank_volume,
                  rate: flight.rate,
                  performance: flight.performance,
                },
              })),
            },
          },
        },
      },
      // Update treatment if available
      treatment: {
        update: {
          where: { id: data.treatment.id },
          data: {
            // Update products if available
            products: {
              updateMany: data.treatment.products.map((product) => ({
                where: { id: product.id },
                data: {
                  name: product.name,
                  dosage: product.dosage,
                  unit: product.unit,
                },
              })),
            },
          },
        },
      },
    },
    include: {
      operation: true,
      treatment: { include: { products: true } },
      material: true,
      techReport: { include: { flight: true } },
    },
  });

  console.log(report);
  return report;
};

const find = async (id: number) => {
  return await prisma.report.findUnique({
    where: { id },
    include: {
      operation: true,
      treatment: true,
      material: true,
      techReport: true,
    },
  });
};

const list = async () => {
  return await prisma.report.findMany({
    include: {
      operation: true,
      treatment: true,
      material: true,
      techReport: true,
    },
  });
};

const createNewReportAtMidnight = async (data: NewReport) => {
  console.log(data);
  // Get the current date
  const currentDate = new Date();

  // Calculate the date for the previous day
  const previousDay = new Date(currentDate);
  previousDay.setDate(previousDay.getDate() - 1);

  try {
    // Check if a report for the previous day already exists
    const existingReport = await prisma.report.findFirst({
      where: {
        AND: [
          { callId: data.callId },
          { date: previousDay.toISOString().slice(0, 10) },
        ],
      },
    });

    // If no report exists for the previous day, create a new report
    if (!existingReport) {
      // Create a new report
      const lateReport = await create(data);
      console.log(
        "New report created at midnight for the previous day:",
        lateReport
      );
      return lateReport;
    } else {
      console.log(
        "Report for the previous day already exists. No action needed."
      );
    }
  } catch (error) {
    console.error(`Error creating report for the previous day: ${error}`);
  }
};

export default {
  create,
  update,
  find,
  list,
  createNewReportAtMidnight,
};
