import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
        success: false
      })
    };

    //check if the user has already applied for the job
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false
      })
    };

    //check if the jobs exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false
      })
    }

    //create new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId
    });

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job applied successfully",
      application: newApplication,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
      path: 'job',
      options: {
        sort: { createdAt: -1 },
        populate: {
          path: 'company',
          options: {
            sort: { createdAt: -1 },
          }
        }
      }
    });
    if (!application) {
      return res.status(400).json({
        message: "Applications not found",
        success: false
      })
    };

    return res.status(200).json({
      application,
      success: true
    });

  } catch (error) {
    console.log(error);
  }
}

//Quản trị viên sẽ xem có bao nhiêu người dùng đã đăng ký
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).sort({ createdAt: -1 }).populate({
      path: 'applications',
      options: {
        sort: { createdAt: -1 },
      },
      populate: {
        path: 'applicant',
      }
    });
    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false
      })
    };

    return res.status(200).json({
      job,
      success: true
    });

  } catch (error) {
    console.log(error);
  }
}

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false
      })
    };

    //find the application by applicant Id
    const application = await Application.findById({ _id: applicationId });
    if (!application) {
      return res.status(400).json({
        message: "Application not found",
        success: false
      })
    };

    //update the status
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "Application status updated successfully",
      success: true
    });
  } catch (error) {
    console.log(error);
  }
}