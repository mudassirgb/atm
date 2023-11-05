import inquirer from "inquirer";
import { faker } from '@faker-js/faker';
import Choice from "inquirer/lib/objects/choice.js";
import chalk from "chalk"
import { listenerCount } from "process";

// (Requirement)
// 1:User Data (Done)
// 2:ATM Machine (Done)
// 3:ATM Machine Functions


console.log("When you enter a PIN code please type 1001 to 1009");
// 1: First of all we will create Users Data;
interface User {
    id: number
    pin: number
    accountNo: number
    balance: number
    name: string
    
};

const createUser=()=>{
    const users:User[]=[]
        for  (let i=0; i<10; i++){
            const user:User = {
                id: i,
                pin: 1000 +i,
                accountNo: Math.floor(1000000 * Math.random()*200000),
                balance: 1000000 * i,
                name: faker.person.fullName()
            };
            users.push(user);
            };
        return users;
          };

        //   2: Now we will create ATM Machine;
        
        const atmMachine = async(users:User[])=>{
        const response = await inquirer.prompt({
            type: "number",
            message: "Please Enter Your PIN Code....",
            name: "pin"
        })
      const user = users.find(val => val.pin == response.pin)
        if(user){
            console.log (chalk.bgBlue(`Welcome to ${user.name}`))
            atmFunc(user)
            
            return;
        }else{
            console.log(chalk.bgGreen("Invalid User"));
        }
        };
        // 3:ATM Functions

        const atmFunc = async(user:User)=>{
            const ans = await inquirer.prompt({
                type: "list",
                name: "select",
                message: "Select Option....",
                choices: ["Withdraw","Balance Inquiry","Deposit","Exit"]
                
            })
            if (ans.select == "Withdraw"){
                const amount = await inquirer.prompt({
                    type: "number",
                    message: "Please Enter Your Amount",
                    name: "Rupees"
                });
                if (amount.Rupees > user.balance){
                    return console.log(chalk.bgGreenBright("Sorry Your Amount Balance is Insufficient"))}
                    if (amount.Rupees > 25000){
                        return console.log("Sorry Your Transection limit is 25000")
                } 
                    console.log(`Withdraw amount ${amount.Rupees}`)
                    console.log(`Balance ${user.balance-amount.Rupees}`)
                };
            if (ans.select == "Balance Inquiry"){
                console.log(`Balance ${user.balance}`)
                return
            };
            if (ans.select == "Deposit"){
                const Deposit = await inquirer.prompt({
                    type: "number",
                    name:"rupee",
                    message: "Please Deposit your Amount"
                });
                console.log(`Deposit amount ${Deposit.rupee}`)
                console.log(`New Balance is ${Deposit.rupee + user.balance}`)
            }
            if (ans.select == "Exit"){
                console.log("Thanks for using ATM");
            }
            // console.log(ans);
             };
             let date = new Date();
            let convert = date.toDateString();
            // let copy = covnert.slice(0,15);
            console.log(convert);
            // console.log(response);
             const User = createUser();
            atmMachine(User);
            // console.log(User);

