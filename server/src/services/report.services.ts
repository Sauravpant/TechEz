import { Report } from "../models/report.model";
import { Technician } from "../models/technician.model";
import { IUser } from "../models/user.model";
import { ReportTechnician, TechnicianReports, UserReports } from "../types/report.types";
import { AppError } from "../utils/app-error";
import logger from "../utils/logger";

export const reportTechnicianService = async (userId: string, technicianId: string, data: ReportTechnician):Promise<void> => {
  const technician = await Technician.findById(technicianId);
  if (!technician) {
    throw new Error("Technician not found or inactive.");
  }
  const reportExists = await Report.findOne({ reportedUser: technicianId, reporter: userId });
  if (reportExists) {
    throw new Error("You have already reported this technician.");
  }
  await Report.create({
    reporter: userId,
    reportedUser: technician.user,
    reason: data.reason,
    details: data.description,
  });
};

export const getTechnicianReportsService = async (technicianId: string): Promise<TechnicianReports[]> => {
  logger.info("Fetching reports for technician ID:", technicianId);
  const reports = await Report.find({ reportedUser: technicianId }).populate<{ reporter: IUser }>("reporter", "_id name profilePictureUrl phone");
  const totalReports = reports.length;
  const result: TechnicianReports[] = reports.map((report) => ({
    id: report._id.toString(),
    reason: report.reason,
    details: report.details,
    createdAt: report.createdAt,
    totalReports,
    reporter: {
      id: report.reporter._id.toString(),
      name: report.reporter.name,
      profilePictureUrl: report.reporter.profilePictureUrl,
      phone: report.reporter.phone,
    },
  }));
  return result;
};

export const getUserReportsService = async (userId: string): Promise<UserReports[]> => {
  const reports = await Report.find({ reporter: userId }).populate<{ reportedUser: IUser }>("reportedUser", "_id name profilePictureUrl phone");
  const reportsMade = reports.length;
  logger.info(reports);
  const result: UserReports[] = reports.map((report) => ({
    id: report._id.toString(),
    reason: report.reason,
    details: report.details,
    createdAt: report.createdAt,
    totalReports: reportsMade,
    reportedTechnician: {
      id: report.reportedUser._id.toString(),
      name: report.reportedUser.name,
      profilePictureUrl: report.reportedUser.profilePictureUrl,
      phone: report.reportedUser.phone,
    },
  }));
  return result;
};

export const deleteReportService = async (reportId: string, userId: string): Promise<void> => {
  const report = await Report.findById(reportId);
  if (!report) {
    throw new AppError(404, "Report not found.");
  }
  if (report.reporter.toString() !== userId) {
    throw new AppError(403, "You are not authorized to delete this report.");
  }
  await Report.findByIdAndDelete(reportId);
};
