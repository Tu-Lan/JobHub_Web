import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if(!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false
      });
    }
    let company = await Company.findOne({ name: companyName });
    if(company) {
      return res.status(400).json({
        message: "A company with this name already exists",
        success: false
      });
    }
    company = await Company.create({ name: companyName, userId: req.id });
    return res.status(200).json({
      message: "Company registered successfully",
      company,
      success: true
    })
  } catch (error) {
    console.error(error);
  }
};


export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if(!companies) {
      return res.status(400).json({
        message: "No companies found",
        success: false
      });
    }
    return res.status(200).json({
      companies,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if(!company) {
      return res.status(400).json({
        message: "No company found",
        success: false
      });
    }
    return res.status(200).json({
      company,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}

export const updateCompany = async (req, res) => {
  try {
    const {name, description, website, location} = req.body;
    const file = req.file;
    //cloudiary

    const updateData = {
      name,
      description,
      website,
      location
    };
    const compnay = await Company.findByIdAndUpdate(req.params.id, updateData, {new: true});
    if(!compnay) {
      return res.status(400).json({
        message: "No company found",
        success: false
      });
    }
    return res.status(200).json({
      message: "Company updated successfully",
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}