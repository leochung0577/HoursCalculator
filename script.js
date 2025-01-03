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
        startCell.appendChild(startHoursInput);

        // colon separator
        startCell.appendChild(document.createTextNode(":"));

        //minuts
        const startMinutesInput = document.createElement("input");
        startMinutesInput.type = "number";
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
        endCell.appendChild(endHoursInput);

        // colon separator
        endCell.appendChild(document.createTextNode(":"));

        //minuts
        const endMinutesInput = document.createElement("input");
        endMinutesInput.type = "number";
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
        const startHoursValue = parseInt(row.cells[1].getElementsByTagName('input')[0].value);
        const startMinutesValue = parseInt(row.cells[1].getElementsByTagName('input')[1].value);
        const endHoursValue = parseInt(row.cells[3].getElementsByTagName('input')[0].value);
        const endMinutesValue = parseInt(row.cells[3].getElementsByTagName('input')[1].value);

        const startHours = !startHoursValue ? 0 : startHoursValue;
        const startMinutes = !startMinutesValue ? 0 : startMinutesValue;
        const endHours = !endHoursValue ? 0 : endHoursValue;
        const endMinutes = !endMinutesValue ? 0 : endMinutesValue;

        // Convert times to total minutes
        const startTimeInMinutes = startHours * 60 + startMinutes;
        const endTimeInMinutes = endHours * 60 + endMinutes;

        // Calculate difference in minutes and convert to hours
        const timeDifferenceInMinutes = endTimeInMinutes - startTimeInMinutes;
        totalSum += timeDifferenceInMinutes;  // Convert to hours
    }

    totalHours = totalSum % 60;
    totalMinutes = totalSum - (totalSum % 60) * 60

    // Display the total sum in the output section
    document.getElementById('totalSum').textContent = "Total: " + totalHours + " hours " + totalMinutes + " minutes";
}

window.onload = function() {
    updateRows();
}