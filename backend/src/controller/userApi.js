import { generateText } from "../geminiService.js";

export class userApi{
    static async searchPrompt(req,res){
    let {prompt}= req.body;
    try {
       let response=await generateText(prompt)
       return res.status(200).send({message:'success',data:response})
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
    }
}