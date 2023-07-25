const rawData = {
    clientName: "",
    projectName: "",
    jobName: "",
    workItem: "",
    description: "",
    timesheetName: "",
    week: "",
    totalTime: "",
    timesheetId: "",
    date: "",
    submittedHours: "",
    userId: "",
  };
  
  export const timesheetTemplate = (
    date,
    timesheetId,
    formattedStartDate,
    formattedEndDate,
    userId
  ) => {
    const timesheetTemplatedata = date.map((item) => {
      return {
        ...rawData,
        date: item,
        timesheetName: `Timesheet (${formattedStartDate} - ${formattedEndDate})`,
        week: `${formattedStartDate} - ${formattedEndDate}`,
        timesheetId: timesheetId,
        userId: userId,
      };
    });
  
    return timesheetTemplatedata;
  };
  
  export const reduceFetchedTimeSheetData = (timesheetData) => {
    const newData = timesheetData.reduce((acc, item) => {
      const existingItem = acc.find((x) => {
        if (
          x.workItem === item.workItem &&
          x.clientName === item.clientName &&
          x.projectName === item.projectName &&
          x.jobName === item.jobName &&
          x.billableStatus === item.billableStatus &&
          x.timesheetId === item.timesheetId
        ) {
          return true;
        }
  
        return false;
      });
  
      const [hour, minute] = item.totalTime.split(":");
      if (existingItem) {
        existingItem.dates = {
          ...existingItem.dates,
          [item.date]: item.totalTime,
        };
        existingItem.totalHour = existingItem.totalHour + Number(hour);
        existingItem.totalMinute =
          existingItem.totalMinute + Number(minute);
      } else {
        acc.push({
          ...item,
          dates: { ...item.dates, [item.date]: item.totalTime },
          totalHour: Number(hour),
          totalMinute: Number(minute),
        });
      }
      return acc;
    }, []);
  
    return newData;
  };
  
  
  
  export const finalWorkingHours = (timesheetData) => {
    const totalHour = {
      finalTotalHours: 0,
      finalTotalMinutes: 0,
    };
  
    timesheetData.forEach((item) => {
    const [Hour, Min] = item.totalTime.split(":");
  
    totalHour.finalTotalHours = Number(Hour) + totalHour.finalTotalHours;
    totalHour.finalTotalMinutes =
      Number(Min) + totalHour.finalTotalMinutes;
  
    if (!totalHour[item.date]) {
      totalHour[item.date] = {
        hour: Number(Hour),
        min: Number(Min),
      };
    } else {
      totalHour[item.date] = {
        hour: Number(Hour) + totalHour[item.date].hour,
        min: Number(Min) + totalHour[item.date].min,
      };
    }
  });
  
  return totalHour;
  
  };

  
export const formatTotalTime = (time)=>{
  let totalTime = '0:00';

 if(time.includes(':')){
    totalTime = `${time.split(":")[0].padStart(2, 0)}:${time
                .split(":")[1]
                .padStart(2, 0)}`
 }
 else{
  totalTime = `${time.padStart(2, 0)}:${'0'.padStart(2, 0)}`
 }
return totalTime; 
}
