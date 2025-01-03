window.onload = function() {
    const rowCount = document.getElementById("rowCount")
    rowCount.addEventListener("input", (e) => {
        const value = e.target.value
                if(value.includes('.'))
                    rowCount.value = Math.floor(value)
                else if (value !== "" && value < 1)
                    rowCount.value = 1
    });
    updateRows();
}

function createRow(id) {
    const tbody = document.querySelector("#table tbody");
    const row = document.createElement("tr");
    row.id = id;

    // date cell
    const dateCell = document.createElement("td");
    const dateInput = document.createElement("input");
    dateInput.type = "text";
    dateCell.appendChild(dateInput);
    row.appendChild(dateCell);

    // start cell
    const startCell = document.createElement("td");

        //hours Input
        const startHoursInput = document.createElement("input");
        startHoursInput.type = "number";
        startHoursInput.min = 0;
        startHoursInput.max = 12;
        startHoursInput.addEventListener("input", (e) => {
            const value = e.target.value
            if(value.includes('.'))
                startHoursInput.value = Math.floor(value)
            else if(value.length > 2)
                startHoursInput.value = Math.floor(value/10)
            else if (value < 0)
                startHoursInput.value = 0
            else if (value > 12)
                startHoursInput.value = 12
        });
        startCell.appendChild(startHoursInput);

        // colon separator
        const startSpan = document.createElement("span")
        startSpan.appendChild(document.createTextNode(":"))
        startCell.appendChild(startSpan)

        //minuts
        const startMinutesInput = document.createElement("input");
        startMinutesInput.type = "number";
        startMinutesInput.min = 0;
        startMinutesInput.max = 59;
        startMinutesInput.addEventListener("input", (e) => {
            const value = e.target.value
            if(value.includes('.'))
                startMinutesInput.value = Math.floor(value)
            else if(value.length > 2)
                startMinutesInput.value = Math.floor(value/10)
            else if (value < 0)
                startMinutesInput.value = 0
            else if (value > 59)
                startMinutesInput.value = 59
        });
        startCell.appendChild(startMinutesInput);

    row.appendChild(startCell);

    // start AM/PM cell
    const startAMPMCell = document.createElement("td");
    const startAMPMSelect = document.createElement("select");

        //AM option
        const startAMOption = document.createElement("option");
        startAMOption.value = 'AM'
        startAMOption.textContent = 'AM'
        startAMPMSelect.appendChild(startAMOption);

        //PM option
        const startPMOption = document.createElement("option");
        startPMOption.value = 'PM'
        startPMOption.textContent = 'PM'
        startAMPMSelect.appendChild(startPMOption);

    startAMPMCell.appendChild(startAMPMSelect);
    row.appendChild(startAMPMCell);

    // end cell
    const endCell = document.createElement("td");

        //hours Input
        const endHoursInput = document.createElement("input");
        endHoursInput.type = "number";
        endHoursInput.min = 0;
        endHoursInput.max = 12;
        endHoursInput.addEventListener("input", (e) => {
            const value = e.target.value
            if(value.includes('.'))
                endHoursInput.value = Math.floor(value)
            else if(value.length > 2)
                endHoursInput.value = Math.floor(value/10)
            else if (value < 0)
                endHoursInput.value = 0
            else if (value > 12)
                endHoursInput.value = 12
        });
        endCell.appendChild(endHoursInput);

        // colon separator
        const endSpan = document.createElement("span")
        endSpan.appendChild(document.createTextNode(":"))
        endCell.appendChild(endSpan)

        //minuts
        const endMinutesInput = document.createElement("input");
        endMinutesInput.type = "number";
        endMinutesInput.min = 0;
        endMinutesInput.max = 59;
        endMinutesInput.addEventListener("input", (e) => {
            const value = e.target.value
            if(value.includes('.'))
                endMinutesInput.value = Math.floor(value)
            else if(value.length > 2)
                endMinutesInput.value = Math.floor(value/10)
            else if (value < 0)
                endMinutesInput.value = 0
            else if (value > 59)
                endMinutesInput.value = 59
        });
        endCell.appendChild(endMinutesInput);

    row.appendChild(endCell);

    // end AM/PM cell
    const endAMPMCell = document.createElement("td");
    const endAMPMSelect = document.createElement("select");

        //AM option
        const endAMOption = document.createElement("option");
        endAMOption.value = 'AM'
        endAMOption.textContent = 'AM'
        endAMPMSelect.appendChild(endAMOption);

        //PM option
        const endPMOption = document.createElement("option");
        endPMOption.value = 'PM'
        endPMOption.textContent = 'PM'
        endAMPMSelect.appendChild(endPMOption);

    endAMPMCell.appendChild(endAMPMSelect);
    row.appendChild(endAMPMCell);

    tbody.appendChild(row);
}

function updateRows() {
    const rowCount = Math.floor(document.getElementById('rowCount').value);
    const tbody = document.getElementById('table').getElementsByTagName('tbody')[0];;
    const currentRows = tbody.rows.length;

    if (currentRows < rowCount) {
        for (let i = currentRows; i < rowCount; i++) {
            createRow(i);
        }
    }
    else if (currentRows > rowCount) {
        for (let i = currentRows; i > rowCount; i--) {
            tbody.deleteRow(i - 1);
        }
    }
}

function clearTable() {
    const rowCount = Math.floor(document.getElementById('rowCount').value);
    const tbody = document.getElementById('table').getElementsByTagName('tbody')[0];

    tbody.innerHTML = '';

    // Add the specified number of rows
    for (let i = 0; i < rowCount; i++) {
        createRow(i);
    }
}

function sum() {
    const tableBody = document.getElementById('table').getElementsByTagName('tbody')[0];
    let totalSum = 0;

    // Loop through all rows to calculate the total sum
    for (let i = 0; i < tableBody.rows.length; i++) {
        const row = tableBody.rows[i];
        const startHoursValue = parseInt(row.cells[1].getElementsByTagName('input')[0].value) || 0;
        const startHours = startHoursValue == 12 ? 0 : startHoursValue;
        const startMinutes = parseInt(row.cells[1].getElementsByTagName('input')[1].value) || 0;
        const endHoursValue = parseInt(row.cells[3].getElementsByTagName('input')[0].value) || 0;
        const endHours = endHoursValue == 12 ? 0 : endHoursValue;
        const endMinutes = parseInt(row.cells[3].getElementsByTagName('input')[1].value) || 0;

        const meridiem = row.cells[2].getElementsByTagName('select')[0].value === row.cells[4].getElementsByTagName('select')[0].value ? 0 : 12;

        // Convert times to total minutes
        const startTimeInMinutes = startHours * 60 + startMinutes;
        const endTimeInMinutes = endHours * 60 + endMinutes + meridiem * 60;

        // Calculate difference in minutes and convert to hours
        let timeDifferenceInMinutes = endTimeInMinutes - startTimeInMinutes;

        if(timeDifferenceInMinutes < 0)
            timeDifferenceInMinutes = 24 * 60 + timeDifferenceInMinutes;

        totalSum += timeDifferenceInMinutes;  // Convert to hours
    }

    const totalHours = Math.floor(totalSum / 60);
    const totalMinutes = totalSum - Math.floor(totalSum / 60) * 60

    // Display the total sum in the output section
    document.getElementById('totalSum').textContent = "Total: " + totalHours + " hours " + totalMinutes + " minutes";
}