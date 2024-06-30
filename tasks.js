document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    document.getElementById('addTaskBtn').addEventListener('click', function(event) {
        event.preventDefault();
        addTask();
    });
    document.getElementById('currentDate').textContent = getCurrentDate();
});

function logout() {
    alert('Logout functionality goes here.');
}

function loadTasks() {
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    const tableBody = document.getElementById('taskList');
    tableBody.innerHTML = '';
    taskList.forEach((task, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = task.task;
        row.insertCell(2).textContent = task.priority;
        row.insertCell(3).textContent = task.status;
        row.insertCell(4).textContent = task.startDate;
        row.insertCell(5).textContent = task.endDate;

        const actionCell = row.insertCell(6);
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            row.remove();
            saveTasks();
        });

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        editBtn.addEventListener('click', () => {
            alert('Edit functionality goes here');
        });

        actionCell.appendChild(deleteBtn);
        actionCell.appendChild(editBtn);
    });
}

function addTask() {
    const task = {
        task: document.getElementById('task').value,
        priority: document.getElementById('priority').value,
        status: document.getElementById('status').value,
        startDate: document.getElementById('start-date').value,
        endDate: document.getElementById('end-date').value
    };
    
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.push(task);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    loadTasks();
    document.getElementById('task').value = '';
    document.getElementById('priority').value = 'Low';
    document.getElementById('status').value = 'Not Started';
    document.getElementById('start-date').value = '';
    document.getElementById('end-date').value = '';
}

function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function saveTasks() {
    const tableRows = document.querySelectorAll('#taskList tr');
    const tasks = Array.from(tableRows).map(row => {
        return {
            task: row.cells[1].textContent,
            priority: row.cells[2].textContent,
            status: row.cells[3].textContent,
            startDate: row.cells[4].textContent,
            endDate: row.cells[5].textContent
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
