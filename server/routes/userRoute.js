import express from "express";
import { create, deleteUser, getAll, getOne, update , login} from "../controller/userController.js";

const route = express.Router();

route.post("/create", create);
route.post("/login",login)
route.get("/getall", getAll);
route.get("/getone/:id", getOne);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteUser);

export default route;