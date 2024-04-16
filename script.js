$(document).ready(function() {
    function displayTasks() {
        $.ajax({
            url: 'get_tasks.php',
            type: 'GET',
            dataType: 'json',
            success: function(tasks) {
                $('#todo-list').empty();

                tasks.forEach(function(task) {
                    var listItem = $('<li>', {
                        class: 'list-group-item todo-item',
                    });

                    var taskText = $('<span>', {
                        class: 'task-content',
                        text: task.task,
                        css: {
                        'white-space': 'pre-wrap' // Preserve line breaks
                        }
                    });

                    var buttonsContainer = $('<div>', {
                        class: 'buttons'
                    });

                    var editButton = $('<button>', {
                        class: 'btn btn-success btn-sm mr-2 edit-button edit-color',
                        text: 'Edit',
                        'data-id': task.id // Assuming the task object has an `id` property
                    });

                    var deleteButton = $('<button>', {
                        class: 'btn btn-danger btn-sm delete-button shadow',
                        text: 'Delete'
                    });

                    buttonsContainer.append(editButton);
                    buttonsContainer.append(deleteButton);

                    listItem.append(taskText);
                    listItem.append(buttonsContainer);
                    $('#todo-list').append(listItem);
                });
            },
            error: function() {
                alert('Error fetching tasks.');
            }
        });
    }

    displayTasks();

    $('#todo-form').submit(function(event) {
        event.preventDefault();

        var todoInput = $('#todo-input');
        var task = todoInput.val().trim();

        if (task !== '') {
            $.ajax({
                url: 'save_task.php',
                type: 'POST',
                data: {
                    task: task
                },
                success: function(response) {
                    if (response === 'success') {
                        displayTasks();
                        todoInput.val('');
                    } else {
                        alert('Error saving task.');
                    }
                },
                error: function() {
                    alert('Error saving task.');
                }
            });
        }
    });

    $(document).on('click', '.delete-button', function() {
        var listItem = $(this).closest('.todo-item');
        var index = $('#todo-list .todo-item').index(listItem);

        $.ajax({
            url: 'delete_task.php',
            type: 'POST',
            data: {
                index: index
            },
            success: function(response) {
                if (response === 'success') {
                    displayTasks();
                } else {
                    alert('Error deleting task.');
                }
            },
            error: function() {
                alert('Error deleting task.');
            }
        });
    });

    $(document).on('click', '.todo-item', function() {
        $(this).find('.buttons').toggle();
    });

    $(document).on('click', '.edit-button', function() {
        event.stopPropagation();
        var listItem = $(this).closest('.todo-item');
        var id = $(this).data('id');
        var task = listItem.find('span').text().trim();

        $('#editTaskInput').val(task);

        $('#saveEditButton').off('click').on('click', function() {
            var editedTask = $('#editTaskInput').val().trim();

            if (editedTask !== '') {
                $.ajax({
                    url: 'update_task.php?id=' + id,
                    type: 'POST',
                    data: {
                        task: editedTask
                    },
                    success: function(response) {
                        if (response === 'success') {
                            displayTasks();
                            $('#editModal').modal('hide');
                        } else {
                            alert('Error updating task.');
                        }
                    },
                    error: function() {
                        alert('Error updating task.');
                    }
                });
            }
        });

        $('#editModal').modal('show');
    });
});
