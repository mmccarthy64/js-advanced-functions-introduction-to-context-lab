// Your code here

let createEmployeeRecord = function(newEmployee){
    return {
        firstName: newEmployee[0],
        familyName: newEmployee[1],
        title: newEmployee[2],
        payPerHour: newEmployee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(ray){
    return ray.map(function(employee) {
        return createEmployeeRecord(employee)
    })
}

let createTimeInEvent = function(record, dateStamp){
    let [date, time] = dateStamp.split(' ')

    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date
    })

    return record
}

let createTimeOutEvent = function(record, dateStamp){
    let [date, time] = dateStamp.split(' ')

    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date
    })

    return record
}

let hoursWorkedOnDate = function(record, dateWorked){
    let inTime = record.timeInEvents.find(function(e){
        return e.date === dateWorked
    })

    let outTime = record.timeOutEvents.find(function(e){
        return e.date === dateWorked
    })

    return (outTime.hour - inTime.hour) / 100
}

let wagesEarnedOnDate = function(record, dateWorked){
    let wage = hoursWorkedOnDate(record, dateWorked) * record.payPerHour
    return parseInt(wage, 10)
}

let allWagesFor = function(record){
    let datesWorked = record.timeInEvents.map(function(e){
        return e.date
    })
    
    let payable = datesWorked.reduce(function(total, d){
        return total + wagesEarnedOnDate(record, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(function(e){
        return e.firstName === firstName;
    })
}

let calculatePayroll = function(records){
     return records.reduce(function(total, rec){
         return total + allWagesFor(rec)
     }, 0)
}