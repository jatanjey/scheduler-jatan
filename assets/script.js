$(function () {
    // Get the current hour using Day.js
    var currentHour = dayjs().hour();

    // Reference the time block container
    var timeBlockContainer = $('#time-block-container');

    // Display time blocks from 9am to 5pm
    for (var hour = 9; hour <= 17; hour++) {
        var timeBlock = $('<div>').addClass('row time-block');
        var hourDisplay = $('<div>').addClass('col-2 col-md-1 hour text-center py-3');
        var description = $('<textarea>').addClass('col-8 col-md-10 description');
        var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
        var icon = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true');

        // Set text and attributes for elements
        hourDisplay.text(dayjs().hour(hour).format('hA'));
        description.attr('id', `description-${hour}`);
        saveBtn.append(icon);

        // Append elements to time block
        timeBlock.append(hourDisplay, description, saveBtn);

        // Update the class based on current time
        if (hour < currentHour) {
            timeBlock.addClass('past').removeClass('present future');
        } else if (hour === currentHour) {
            timeBlock.addClass('present').removeClass('past future');
        } else {
            timeBlock.addClass('future').removeClass('past present');
        }

        // Retrieve saved event from local storage and display it in the textarea
        description.val(localStorage.getItem(`event-${hour}`) || '');

        // Append time block to container
        timeBlockContainer.append(timeBlock);
    }

    // Update colors every minute
    setInterval(updateColors, 60000);

    function updateColors() {
        currentHour = dayjs().hour();

        $('.time-block').each(function () {
            var blockHour = parseInt($(this).find('.hour').text());
            
            if (blockHour < currentHour) {
                $(this).addClass('past').removeClass('present future');
            } else if (blockHour === currentHour) {
                $(this).addClass('present').removeClass('past future');
            } else {
                $(this).addClass('future').removeClass('past present');
            }
        });
    }

    // Save button click event listener
    $('.saveBtn').on('click', function () {
        var hour = parseInt($(this).closest('.time-block').find('.hour').text().trim());
        var eventDescription = $(this).siblings('.description').val();

        // Store the event description in local storage
        localStorage.setItem(`event-${hour}`, eventDescription);
    });
});