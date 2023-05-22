-- tasks table
create table tasks (
    task_number int not null,
    task text not null,
    progress enum('not done', 'just started', 'working', 'almost done', 'done') not null,
    primary key(task_number)
);

-- add data to table
insert into tasks (task_number, task, progress) values ("1", "add first entry", "done");
