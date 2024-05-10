# COMP2110 Task Manager 2024

As part of your assignment submission, write notes about your implementation
in this file.

## Avi
- For a week or two
Until now I have been trying to make a working widget in my own separate copy so a bunch of the work from that separate copy I have now added to the joint project.

- Created weeksum-widget.js
- Changed one of the widget blocks to implement my widget in main.js

- Created a small line saying today's date using "toLocaleDateString"

- FINALLY figured out to isolate the ToDo tasks being displayed as opposed to all tasks being displayed

- Created weeksum-card.js file to shrink down the size of the task cards being displayed in my widget to show only valid information

- Successfully created a widget that displays tasks from the ToDo board

- Tweaked some of the CSS temporarily before we can create a universal style guide for the entire webpage

- Made the widget boxes curved on the corners to fit the task cards
- Further CSS changes (specifically colour palette)

## Matthew
word
- Changed styling to match the "style.css" file

## Nicholas
- Created a timer widget
- Runs for 15mins
- Ability to start,pause and resume the timer
- Able to reset timer back to base state
- Able to set timer to length

## Noah
create-task file:
- based on edit-task, calls a dialog where the user inputs the fields of the new task they want to create
- it then sends the form data to a newly created models.js function 'createTask' which accepts the data
- which then sends a fetch post request to the server with the new task json data in the body
- it then reloads the page to show the made changes.

delete-task file:
- simple implementation that provides the user a delete button for each of the task cards which is initialised with
- the task id of the task that it is created on. This task id is then passed to a new models.js function 'deleteTask'
- which sends a fetch delete request to the server with the task id.
- it then reloads the page to show the made changes.

Styling:
- Implemented style hover effects
