import React, { useState, useEffect } from 'react';
import { useProjects } from '../../hooks/useProjects';

const ProjectsDateInfoList = ({projects}) => {
  const [totalProjects, setTotalProjects] = useState(0);
  const [dueTodayCount, setDueTodayCount] = useState(0);
  const [dueThisWeekCount, setDueThisWeekCount] = useState(0);

  useEffect(() => {
    // setProjects(studentData.projects);
    setTotalProjects(projects.length);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get start of the week (Sunday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());  // Adjust to the start of the week (Sunday)

    // Get end of the week (Saturday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);  // Adjust to the end of the week (Saturday)
    endOfWeek.setHours(23, 59, 59, 999); // End of the day on Saturday

    let dueToday = 0;
    let dueThisWeek = 0;

      projects.forEach((project) => {
        const dueDate = new Date(project.due_at);
        dueDate.setHours(0, 0, 0, 0);

        // Count projects due today
        if (dueDate.getTime() === today.getTime()) {
          dueToday++;
        } 

        // Count projects due this week
        if (dueDate >= startOfWeek && dueDate <= endOfWeek) {
          dueThisWeek++;
        }
      });

      setDueTodayCount(dueToday);
      setDueThisWeekCount(dueThisWeek);
      
    }, [projects]);

  return (
    <div>
      <p>You have <strong>{totalProjects}</strong> active projects</p>

      <div className="subsection-container purple">
        <p><strong>{dueTodayCount}</strong> projects are due today</p>
      </div> <div className="subsection-container yellow">
        <p><strong>{dueThisWeekCount}</strong> projects are due this week</p>
      </div>
    </div>
  );
};

export default ProjectsDateInfoList;