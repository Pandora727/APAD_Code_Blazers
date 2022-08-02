import React from 'react'
const Tasks = ({tasks}) => {
  return (
    <>
      {tasks.map(
        (task) => (<h3 key={task.id}> {task.message} </h3>)
      )}
    </>
  )
}

export default Tasks