const { compare, hash } = require("bcrypt");
const path = require("path");

const Teacher = require("../model/teacher");
const downloadFile = require("../shared/download-file");
const ErrorResponse = require("../utils/ErrorResponse");

class TeacherService {
  async create(teacherDto) {
    const result = await Teacher.create(teacherDto);
    return result;
  }

  async getTeachers(query, queryOptions) {
    const teachers = await Teacher.find({ ...query }, null, queryOptions);
    return teachers;
  }

  async getTeacher(teacherId) {
    const teacher = await Teacher.findOne({ _id: teacherId });
    return teacher;
  }

  async getTeacherByEmail(email) {
    const teacher = await Teacher.findOne({ email });
    return teacher;
  }

  async approve(userId) {
    await Teacher.updateOne({ _id: userId }, { $set: { status: "approved" } });
  }

  async unApprove(userId) {
    await Teacher.updateOne(
      { _id: userId },
      { $set: { status: "unApproved" } },
    );
  }

  async updateProfile(teacherId, teacherDto) {
    const teacher = await Teacher.findOne({ _id: teacherId });
    if (!teacher)
      throw new ErrorResponse(
        402,
        "مشکلی پیش آمده، لطفا بعدا تلاش کنید!",
        "back",
      );
    if (teacherDto.buffer !== undefined) {
      await downloadFile({
        quality: 60,
        filename: teacher.profileImg,
        path: path.join(__dirname, "..", "public", "users", teacher.profileImg),
        buffer: teacherDto.buffer,
      });
    }
    teacher.fullname = teacherDto.fullname;
    teacher.bio = teacherDto.bio;
    await teacher.save();
    return teacher;
  }

  async updateOne(teacherId, query) {
    await Teacher.updateOne({ _id: teacherId }, { ...query });
  }

  async changePassword(teacherId, currentPassword, newPassword) {
    const teacher = await Teacher.findOne({ _id: teacherId });
    const isMatchPassword = await compare(currentPassword, teacher.password);
    if (isMatchPassword) {
      const hashPassword = await hash(newPassword, 12);
      teacher.password = hashPassword;
      await teacher.save();
      return teacher;
    }
    throw new ErrorResponse(401, "رمز عبور فعلی نادرست است!", "back");
  }

  async deleteAccount(userId) {
    await Teacher.deleteOne({ _id: userId });
  }

  async countDocuments(query) {
    const length = await Teacher.countDocuments({ ...query });
    return length;
  }
}

module.exports = new TeacherService();
