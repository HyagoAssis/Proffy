import express  from "express";
import db from "./database/connection";
import convertionHourToMinutes from "./utils/convertHourToMinutes";

const routes = express.Router();

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

routes.post('/classes', async (request, response) => {
  const {
    name,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    schedule
  } = request.body;

 const insertUsersIds = await db('users').insert({
    name,
    avatar,
    whatsapp,
    bio,
  });

  const user_id = insertUsersIds[0];

  const insertedClassesIds = await db('classes').insert({
    subject,
    cost,
    user_id,
  });
  
  const class_id = insertedClassesIds[0];

  const classSschedule = schedule.map((scheduleItem: ScheduleItem) => {
    return {
        class_id,
        week_day: scheduleItem.week_day,
        from: convertionHourToMinutes(scheduleItem.from),
        to: convertionHourToMinutes(scheduleItem.to),
    };
  });

  await db('class_schedule').insert(classSschedule);

  return response.send();
  
});

export default routes;

