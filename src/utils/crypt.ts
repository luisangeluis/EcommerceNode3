import bcrypt from "bcrypt";

export const hashPassword=(plainPassword:string)=>{
    const hashedPass = bcrypt.hashSync(plainPassword,10); 
    return hashedPass; 
}

export const comparePassword=(plainPassword:string,hashedPassword:string)=>bcrypt.compareSync(plainPassword,hashedPassword);
  
