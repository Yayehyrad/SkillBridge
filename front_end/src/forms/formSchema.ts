import z from "zod";

const formSchema = z.object({
    userName : z.string().min(1 , 'user name is required').max(255) , 
    password : z.string().regex( 
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
            {
              message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
            }
    )
})

type IFormSchma = z.infer<typeof formSchema>

const formDefaultValue : IFormSchma = {
    userName : "" , 
    password : ""
} 

export { formSchema, formDefaultValue };
export type { IFormSchma };
