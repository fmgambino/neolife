import userModel from "../models/userModel.js";
import createError from "./../util/errors/createError.js";
import generateJwt from "./../util/generators/generateJwt.js";

const authUser = async (req, res, next) => {
  const { email, password } = req.body;

  await userModel
    .findOne({ email })
    .select("+password")
    .then(async (user) => {
      if (user === null) return next(createError(404, "Invalid credentials!"));

      if (!(await user?.isPasswordMatch(password)))
        return next(createError(404, "Invalid credentials!"));

      const { password: deletePassword, ...otherData } = user?._doc;
      // console.log(otherData);
      const token = generateJwt.generateAccessToken(
        otherData?._id,
        otherData?.rol,
        otherData?.church
      );

      res.status(200).send({
        status: true,
        data: otherData,
        token,
      });
    })
    .catch((err) => {
      return next(createError(406, err));
    });
};

const authCreateUser = async (req, res, next) => {
  const { rol: authRol, church: authChurch } = req.user;
  const { name, email, password, profile, rol, address, phone, church } =
    req.body;

  // console.log(authRol, authChurch, req.user);
  // return;

  if (authRol === "SuperAdministrator" && rol === "SuperAdministrator") {
    var newUser = new userModel({
      name,
      email,
      password,
      //church,
      profile,
      rol,
      address,
      phone,
    });
  } else if (authRol === "SuperAdministrator" && rol === "Administrator") {
    var newUser = new userModel({
      name,
      email,
      password,
      church,
      profile,
      rol,
      address,
      phone,
    });
  } else if (
    (authRol === "SuperAdministrator" && rol === "Responsible") ||
    (authRol === "Administrator" && rol === "SuperAdministrator") ||
    (authRol === "Administrator" && rol === "Administrator")
  ) {
    return next(
      createError(
        401,
        "You do not have permissions to create this type of users!"
      )
    );
  } else {
    var newUser = new userModel({
      name,
      email,
      password,
      church: authChurch,
      profile,
      rol,
      address,
      phone,
    });
  }

  await newUser
    .save()
    .then((user) => {
      res.status(201).send({
        status: true,
        data: "User created successfully!",
      });
    })
    .catch((err) => {
      if (err.code === 11000)
        return next(createError(406, "Already a user with these data!"));

      return next(createError(406, err));
    });
};

const getAll = async (req, res, next) => {
  const { rol, church } = req.user;
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  let selectRol =
    rol === "SuperAdministrator" ? "Administrator" : "Responsible";

  if (rol === "SuperAdministrator") {
    const userCount = await userModel
      .find({
        rol: selectRol,
      })
      .count({});

    if (skip >= userCount) {
      res.status(200).send({
        status: false,
        data: {
          pagination: {
            prev: 0,
            page: 0,
            next: 0,
            total: 0,
          },
          info: [],
        },
      });
    }

    await userModel
      .find({
        rol: selectRol,
      })
      .skip(skip)
      .limit(limit)
      .then((users) => {
        //console.log(users);
        if (users.length > 0) {
          res.status(200).send({
            status: true,
            data: {
              pagination: {
                prev: Number(page) - 1 > 0 ? Number(page) - 1 : false,
                page: Number(page),
                next: userCount > limit * page ? Number(page) + 1 : false,
                total: userCount,
              },
              info: users,
            },
          });
        } else {
          res.status(200).send({
            status: true,
            data: {
              pagination: {
                prev: false,
                page: 0,
                next: false,
                total: 0,
              },
              info: [],
            },
          });
        }
      })
      .catch((err) => {
        return next(createError(404, err));
      });
  } else {
    const userCount = await userModel
      .find({
        rol: selectRol,
        church,
      })
      .count({});

    if (skip >= userCount) {
      res.status(200).send({
        status: false,
        data: {},
        message: "This page does not exist!",
      });
    }

    await userModel
      .find({
        rol: selectRol,
        church,
      })
      .skip(skip)
      .limit(limit)
      .then((users) => {
        if (users.length > 0) {
          res.status(200).send({
            status: true,
            data: {
              pagination: {
                prev: Number(page) - 1 > 0 ? Number(page) - 1 : false,
                page: Number(page),
                next: userCount > limit * page ? Number(page) + 1 : false,
                total: userCount,
              },
              info: users,
            },
          });
        } else {
          res.status(200).send({
            status: true,
            data: {
              pagination: {
                prev: false,
                page: 0,
                next: false,
                total: 0,
              },
              info: [],
            },
          });
        }
      })
      .catch((err) => {
        return next(createError(404, err));
      });
  }
};

const getAllResponsibles = async (req, res, next) => {
  const { church } = req.user;

  await userModel
    .find({
      rol: "Responsible",
      church,
    })
    .then((users) => {
      //console.log(users);
      if (users.length > 0) {
        res.status(200).send({
          status: true,
          data: users,
        });
      } else {
        res.status(200).send({
          status: true,
          data: [],
        });
      }
    })
    .catch((err) => {
      return next(createError(404, err));
    });
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, password, profile, rol, address, phone } = req.body;
  let { rol: role } = req.user;

  await userModel
    .findById(id)
    .then(async (updateUser) => {
      if (role === "SuperAdministrator" && updateUser.rol === "Administrator") {
        if (password !== undefined) {
          await userModel
            .findByIdAndUpdate(id, {
              name,
              password,
              profile,
              rol,
              address,
              phone,
            })
            .then(() => {
              res.status(200).send({
                status: true,
                data: "User updated successfully!",
              });
            })
            .catch((err) => {
              console.log(err);
              if (err.code === 11000)
                return next(
                  createError(406, "Already a user with these data!")
                );
              if (err.kind === "ObjectId")
                return next(
                  createError(404, "There is no record with that id!")
                );
              return next(createError(406, err));
            });
        } else {
          await userModel
            .findByIdAndUpdate(id, {
              name,
              profile,
              rol,
              address,
              phone,
            })
            .then(() => {
              res.status(200).send({
                status: true,
                data: "User updated successfully!",
              });
            })
            .catch((err) => {
              console.log(err);
              if (err.code === 11000)
                return next(
                  createError(406, "Already a user with these data!")
                );
              if (err.kind === "ObjectId")
                return next(
                  createError(404, "There is no record with that id!")
                );
              return next(createError(406, err));
            });
        }
      } else if (role === "Administrator" && updateUser.rol === "Responsible") {
        if (password !== undefined) {
          await userModel
            .findByIdAndUpdate(id, {
              name,
              password,
              profile,
              rol,
              address,
              phone,
            })
            .then(() => {
              res.status(200).send({
                status: true,
                data: "User updated successfully!",
              });
            })
            .catch((err) => {
              console.log(err);
              if (err.code === 11000)
                return next(
                  createError(406, "Already a user with these data!")
                );
              if (err.kind === "ObjectId")
                return next(
                  createError(404, "There is no record with that id!")
                );
              return next(createError(406, err));
            });
        } else {
          await userModel
            .findByIdAndUpdate(id, {
              name,
              profile,
              rol,
              address,
              phone,
            })
            .then(() => {
              res.status(200).send({
                status: true,
                data: "User updated successfully!",
              });
            })
            .catch((err) => {
              console.log(err);
              if (err.code === 11000)
                return next(
                  createError(406, "Already a user with these data!")
                );
              if (err.kind === "ObjectId")
                return next(
                  createError(404, "There is no record with that id!")
                );
              return next(createError(406, err));
            });
        }
      } else {
        return next(
          createError(
            401,
            "You do not have permissions to delete this type of users!"
          )
        );
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.kind === "ObjectId")
        return next(createError(404, "There is no record with that id!"));
      return next(createError(406, err));
    });
};

const remove = async (req, res, next) => {
  let { id } = req.params;
  let { rol } = req.user;

  await userModel
    .findById(id)
    .then(async (removeUser) => {
      if (rol === "SuperAdministrator" && removeUser.rol === "Administrator") {
        await userModel
          .findByIdAndDelete(id)
          .then(() => {
            res.status(200).send({
              status: true,
              data: "User removed successfully!",
            });
          })
          .catch((err) => {
            if (err.kind === "ObjectId")
              return next(createError(404, "There is no record with that id!"));
            return next(createError(406, err));
          });
      } else if (rol === "Administrator" && removeUser.rol === "Responsible") {
        await userModel
          .findByIdAndDelete(id)
          .then(() => {
            res.status(200).send({
              status: true,
              data: "User removed successfully!",
            });
          })
          .catch((err) => {
            if (err.kind === "ObjectId")
              return next(createError(404, "There is no record with that id!"));
            return next(createError(406, err));
          });
      } else {
        return next(
          createError(
            401,
            "You do not have permissions to delete this type of users!"
          )
        );
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.kind === "ObjectId")
        return next(createError(404, "There is no record with that id!"));
      return next(createError(406, err));
    });
};

export default {
  authUser,
  authCreateUser,
  getAll,
  getAllResponsibles,
  update,
  remove,
};
