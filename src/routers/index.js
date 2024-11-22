import { Router } from "express";

export const indexRouter = Router();

indexRouter.get("/", (req, res) => {
    res.json({
       name: "Awesome Music API",
       description: "An awesome API to explore awesome tracks made by awesome artists. AWESOME!!!!!",
       version: "1.0.0",
       companyName: "Awesome Music Entertainment",
       companyAddress: "123 Rue Di Pizza - Grenoble",
       companyOwner: "Jean Di Pizza" 
    });
})

export default indexRouter;