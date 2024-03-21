import { Socket } from "socket.io";
import databaseHandler, { ReportClosingType, report_include } from "../databaseHandler/report"
import { NewReport } from "../types/report"
import { NewMaterial } from "../types/material"
import { Notification } from "../class/Notification"
import pdf_handler from "../tools/pdf_handler"
import { existsSync, mkdirSync } from "fs"
import { PrismaClient, Call } from "@prisma/client"
import { env } from "../env"
import normalize from "../tools/normalize"
import { getIoInstance } from "./socket"

const prisma = new PrismaClient()

const handleMidnight = async (report: ReportClosingType) => {
    if (report.stage !== 4) {
        closeReport(report.id)

        if (report.areaTrabalhada < report.call.talhao.area) {
            const new_report = await databaseHandler.create(report.call.id)
            const io = getIoInstance()
            io.emit("report:update", new_report)
        }
    }
}

export const checkMidnight = async (report: ReportClosingType) => {
    const now = new Date()
    const end_date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0)
    const delay = end_date.getTime() - now.getTime()
    setTimeout(() => handleMidnight(report), delay)
}

const newReport = async (socket: Socket, data: NewReport) => {
    console.log(data)

    try {
        const report = await databaseHandler.create(data.callId)
        socket.emit("report:creation:success", report)
    } catch (error) {
        console.log(error)
        socket.emit("report:creation:failed", { error: error })
    }
}

const approvedReport = async (socket: Socket, reportId: number) => {
    try {
        const report = await databaseHandler.approve(reportId)
        socket.emit("report:approved:success", report)

        const employees = report.call.kit?.employees.map((item) => item.user)
        if (employees)
            new Notification({
                action: "approve",
                target_id: report.id,
                target_key: "report",
                users: [...employees, report.call.producer.user],
            })
    } catch (error) {
        console.log(error)
        socket.emit("report:approved:failed", { error: error })
    }
}

const closeReport = async (reportId: number, socket?: Socket) => {
    try {
        const report = await databaseHandler.close(reportId)
        new Notification({
            action: "close",
            target_id: report.id,
            target_key: "report",
            users: await Notification.getAdmins(),
        })

        const output_dir = `static/reports/${report.id}`
        if (!existsSync(output_dir)) {
            mkdirSync(output_dir, { recursive: true })
        }

        const filename = normalize(
            `Relatório_${new Date(Number(report.date)).toLocaleDateString("pt-br")}_${report.call.producer.user.name}_${report.call.talhao.name}_${
                report.call.talhao.tillage.name
            }_${report.call.id}.pdf`
        )
            .replace(/\s/g, "-")
            .replace(/\//g, "-")

        const file_path = `${output_dir}/${filename}`
        const port = process.env.PORT
        const url = `${env == "dev" ? `http://localhost:${port}` : `https://agencyboz.com:${port}`}/${file_path}`

        console.log({ report, url })

        // report.call.kit.employees.forEach((item, index) => {
        //     const pilot = item.office == 'pilot'
        //     item.user.name = pilot ?
        // })

        await pdf_handler.fillForm({
            template_path: "src/templates/report_template.pdf",
            output_path: file_path,
            report,
        })

        const updated_report = await prisma.report.update({
            where: { id: report.id },
            data: { pdf_path: url },
            include: report_include,
        })

        if (socket) {
            socket.emit("report:closed:success", updated_report)
        } else {
            const io = getIoInstance()
            io.emit("report:closed", updated_report)
        }
    } catch (error) {
        console.log(error)
        socket?.emit("report:closed:failed", { error: error })
    }
}

const updateReport = async (
  socket: Socket,
  data: {
    reportId: number;
    totalPrice: number;
    areaTrabalhada: number;
    materials: NewMaterial[];
  }
) => {
  console.log(data);

  try {
    const report = await databaseHandler.update(data);

    socket.emit("report:update:success", report);
  } catch (error) {
    console.log(error);
    socket.emit("report:update:failed", { error: error });
  }
};

const findReport = async (socket: Socket, id: number) => {
  try {
    const report = await databaseHandler.find(id);
    socket.emit("report:find:success", report);
  } catch (error) {
    console.error(`Error fetching report for ID: ${id}. Error: ${error}`);
    socket.emit("report:find:error", { error: error });
  }
};

const listReport = async (socket: Socket) => {
    console.log("report:list")
  try {
    const report = await databaseHandler.list();
    socket.emit("report:list:success", report);
  } catch (error) {
    console.log(error);
    socket.emit("report:list:failed", { error: error });
  }
};

// cron.schedule("* * * * *", async () => {
//   console.log("Cron job started");
//   try {
//     const unclosedReports = await prisma.report.findMany({
//       where: { close: "" },
//     });
//     console.log(unclosedReports);
//     if (unclosedReports.length === 0) {
//       console.log("No unclosed reports found");
//     } else {
//       console.log("Unclosed reports found");
//     }

//     //   await prisma.report.create({
//     //     data: reportData,
//     //     // Include other necessary setup based on your Prisma model relations
//     //   });

//     //   console.log(`Report created for call ID: ${call.id}`);
//   } catch (error) {
//     console.error(`Error`, error);
//   }
// });

export default {
  newReport,
  updateReport,
  findReport,
  listReport,
  approvedReport,
  closeReport,
};
