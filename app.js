// npm install --save mongoose
// npm install --save readline-sync

const mongoose = require("mongoose")
const readline = require("readline-sync")


async function main(){

    /* Connecting with mongodb */
    await require("./mongodb")()

    // getting console colors
    colors = require("./aux/colors")
    
    /* Getting mongodb models */
    const Sector   = require("./models/sector")
    const Position = require("./models/position")
    const Employee = require("./models/employee")
   
    while(true){
        console.log(colors.FgCyan + "0 - Include a sector");
        console.log("1 - Include a position");
        console.log("2 - Include an employee");
        console.log("3 - Delete a sector");
        console.log("4 - Delete a position");
        console.log("5 - Delete an employee");
        console.log("6 - Consult sectors");
        console.log("7 - Consult positions");
        console.log("8 - Consult employees");
        console.log(colors.FgBlue + "9 - Exit");

        /* Reading line (automatic async)*/
        let option = readline.question(colors.FgYellow + "What would you like to do? ")

        /* A big 'switch case' with the options */
        if (option == '0'){      // Include a sector
            answer = readline.question(colors.FgGreen + "Please insert the name of the sector that you would like to include:")
            newSector = {
                name:answer
            } 
            await new Sector(newSector).save().then(data => {
                console.log(colors.FgGreen + "Success");
            }).catch(err => console.log(colors.FgRed + "Error: " + err))

        }else if(option == '1'){ // Include a position
            answer = readline.question(colors.FgGreen + "Please insert the name of the position that you would like to include: ")
            salary = readline.question(colors.FgGreen + "Please insert the salary of the position that you would like to include: ")
            newPosition = {
                name:answer,
                salary:salary
            }
            await new Position(newPosition).save().then(() => {
                console.log(colors.FgGreen + "Success");
            }).catch(err => console.log(colors.FgRed + "Error: " + err))

        }else if(option == '2'){ // Include an employee
            e_name = readline.question(colors.FgGreen + "Please insert the name of the employee that you would like to include: ")
            e_dob = readline.question(colors.FgGreen + "Please insert the data of birth of the employee that you would like to include (yyyy-mm-dd): ")
            
            newEmployee = {
                name:e_name,
                dob:e_dob,
                position:null,
                sector:null
                
            }

            // listing positions
            console.log(colors.FgYellow + "listing positions\n" + colors.FgBlue)
            let positions = await Position.find()
            for(let pos=0; pos<positions.length; pos++){
                console.log(pos + " - " + positions[pos].name)
            }
            
            // getting the position's number
            position = readline.question(colors.FgGreen + "Please insert the number of the position of the employee: ")
            newEmployee.position = positions[parseInt(position)]._id


            // listing sectors
            console.log(colors.FgYellow + "listing sectors\n" + colors.FgBlue)
            let sectors = await Sector.find()
            for(let sec=0; sec<sectors.length; sec++){
                console.log(sec + " - " + sectors[sec].name)
            }
            console.log("\n")

            // getting the sector's number
            sector = readline.question(colors.FgGreen + "Please insert the number of the sector of the employee: ")
            newEmployee.sector = sectors[parseInt(sector)]._id

            // now everything is set, so we save in the database
            await new Employee(newEmployee).save().then(()=>{
                console.log(colors.FgGreen + "Success")
            }).catch(err => console.log(colors.FgRed + "Error " + err))
        }else if(option == '3'){ // Delete a sector
            let sectors = await Sector.find()
            console.log(colors.FgBlue)
            for(let sec=0; sec<sectors.length; sec++){
                console.log(sec + " - " + sectors[sec].name)
            }
            console.log("\n")
            sector_number = readline.question(colors.FgGreen + "Please insert the number of the sector that you would like to delete: ")
            
            await Sector.deleteOne({_id:sectors[parseInt(sector_number)]._id}).then(()=>{
                console.log(colors.FgGreen + "Success")
            }).catch(err => console.log("Error " + err))
        }else if(option == '4'){ // Delete a position
            console.log(colors.FgBlue)
            let positions = await Position.find()
            for(let pos=0; pos<positions.length; pos++){
                console.log(pos + " - " + positions[pos].name)
            }
            console.log("\n")
            position_number = readline.question(colors.FgGreen + "Please insert the number of the position that you would like to delete: ")
            console.log(positions[parseInt(position_number)]._id)
            await Position.deleteOne({_id:positions[parseInt(position_number)]._id}).then(()=>{
                console.log(colors.FgGreen + "Success")
            }).catch(err => console.log(colors.FgRed + "Error " + err))

        }else if(option == '5'){ // Delete an employee
            let employees = await Employee.find()
            console.log(colors.FgBlue)
            for(let emp=0; emp<employees.length; emp++){
                console.log(emp + " - " + employees[emp].name)
            }
            console.log("\n")
            employee_number = readline.question(colors.FgGreen + "Please insert the number of the employee that you would like to delete: ")
            
            await Employee.deleteOne({_id:employees[parseInt(employee_number)]._id}).then(()=>{
                console.log(colors.FgGreen + "Success")
            }).catch(err => console.log(colors.FgRed + "Error " + err))
        }else if(option == '6'){ // Consult a sector
            let sectors = await Sector.find()
            console.log(colors.FgBlue)
            for(let sec=0; sec<sectors.length; sec++){
                console.log(sec + " - " + sectors[sec].name)
            }
            console.log("\n")
        }else if(option == '7'){ // Consult a position
            let positions = await Position.find()
            console.log(colors.FgBlue)
            for(let pos=0; pos<positions.length; pos++){
                console.log(pos + " - " + positions[pos].name + " - Salary: $" + positions[pos].salary)
            }
            console.log("\n")

        }else if(option == '8'){ // Consult an employee
            let employees = await Employee.find().populate("position").populate("sector")
            console.log(colors.FgBlue)
            for(let emp=0; emp<employees.length; emp++){
                
                console.log(emp + " - " + employees[emp].name + " - Position: " + employees[emp].position.name + " - Sector: " + employees[emp].sector.name)
            }
            console.log("\n")
        }else if(option == '9'){ // exit 
            break
        }
    }
}

main()