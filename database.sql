CREATE TABLE "tasks"(
"id" serial, "task" varchar(255), "completed" BOOLEAN DEFAULT FALSE);

INSERT INTO "tasks" 
	(task, completed) 
	VALUES(
	'dishes','FALSE'),
   ('shovel','TRUE'),
 ( 'garbage','FALSE')

