import fs from "fs"
import * as pdfjsLib  from "pdfjs-dist/legacy/build/pdf.min.mjs";
import { askai } from "../Service/openRouter.service.js";
export const analayzeResume=async (req,res)=>{
   try {
      if(!req.file)
      {
         return res.status(400).json({message:"Resume Required"});
      }
      const filepath=req.file.path

      const filebuffer=await fs.promises.readfile(filepath)
      const uint8Array=new Uint8Array(filebuffer)
      const pdf= await pdfjsLib.getDocument({data:uint8Array}).promise
      let resumeText="";
      // extract text from all pages
      for(let pagenum=1;pagenum<=pdf.numPages;pagenum++)
      {
         const page=await pdf.getPage(pagenum);
         const content=await page.getTextContent();
         const pageText=content.items.map(item=>item.str).join("");
         resumeText+=pageText+"\n";
      }
      resumeText=resumeText.replace(/\s+/g," ").trim();

      const messages=[
         {
            role:"system",
            content:` Extract structured data from resume 
            Return Stricly JSON:
            {
               "role":"string",
               "experince":"string",
               "projects":["project1","project2"],
               "Skills":["skills1","skills2"]
            }`
         },
         {
            role:"user",
            content:resumeText
         }
      ];

      const aiResponse=await askai(messages);
      const parsed=JSON.parse(aiResponse);

      fs.unlinkSync(filepath)

      res.json({
         role:parsed.role,
         experience:parsed.experience,
         project:parsed.project,
         skills:parsed.skills,
         resumeText
      });
   } catch (error) {
      console.log(error);
      if (req.file && fs.existsSync(req.file.path)) {
         fs.unlinkSync(req.file.path);
      }

      res.status(500).json({message:error.message})

   }
};