$(document).ready(
    function () {
        $('#date0').bootstrapMaterialDatePicker({
            time: false,
            clearButton: true,
            minDate: new Date()
        });

        $('#startTime0').bootstrapMaterialDatePicker({
            date: false,
            shortTime: false,
            format: 'HH:mm'
        });

        $('#endTime0').bootstrapMaterialDatePicker({
            date: false,
            shortTime: false,
            format: 'HH:mm'
        });
    }
);

function datePicker(id) {
    $('#date' + id).bootstrapMaterialDatePicker({
        time: false,
        clearButton: true,
        minDate: new Date()
    });

    $('#startTime' + id).bootstrapMaterialDatePicker({
        date: false,
        shortTime: false,
        format: 'HH:mm'
    });

    $('#endTime' + id).bootstrapMaterialDatePicker({
        date: false,
        shortTime: false,
        format: 'HH:mm'
    });
}

var rowNum = rows[rows.length - 1] + 1;
function addRow() {
    var x = document.getElementById('gapsTable').insertRow(rows.length + 1);

    var c1 = x.insertCell(0);
    var c2 = x.insertCell(1);
    var c3 = x.insertCell(2);
    var c4 = x.insertCell(3);

    c1.innerHTML = "<input class='form-control floating-label text-center date' id='date" + rowNum + "' placeholder='Fecha' type='text' required>";
    c2.innerHTML = "<input class='form-control floating-label text-center startTime' id='startTime" + rowNum + "' placeholder='Hora inicio' type='text' required>";
    c3.innerHTML = "<input class='form-control floating-label text-center endTime' id='endTime" + rowNum + "' placeholder='Hora fin' type='text' required>";
    c4.innerHTML = "<td><button class='btn btn-outline-danger btn-sm' onClick='deleteRow(" + rowNum + ")' type='button'><i class='material-icons'>delete</i></button></td>"

    datePicker(rowNum);
    rows.push(rowNum++);
}

function deleteRow(id) {
    var index = rows.indexOf(id);

    if (index > -1) {
        rows.splice(index, 1);
    }

    document.getElementById('gapsTable').deleteRow(index + 1);
}

function setArray(poll_id) {
    var div = document.getElementById("inputs");
    div.innerHTML = "";
    var index = 0;

    rows.forEach(rowNum => {

        if (document.getElementById(rowNum) != null) {
            var gapId = document.createElement("input");
            gapId.name = index + "[gap_id]";
            gapId.value = rowNum;
            gapId.style.visibility = "hidden";
            div.appendChild(gapId);
        } else {
            var pollId = document.createElement("input");
            pollId.name = index + "[poll_id]";
            pollId.value = poll_id;
            pollId.style.visibility = "hidden";
            div.appendChild(pollId);

            var date = document.getElementById("date" + rowNum).value;

            var startYear = document.createElement("input");
            var endYear = document.createElement("input");

            startYear.name = index + "[start_date][year]";
            startYear.value = date.split("-")[0];

            endYear.name = index + "[end_date][year]";
            endYear.value = date.split("-")[0];

            endYear.style.visibility = "hidden";
            startYear.style.visibility = "hidden";

            div.appendChild(startYear);
            div.appendChild(endYear);

            var startMonth = document.createElement("input");
            var endMonth = document.createElement("input");

            startMonth.name = index + "[start_date][month]";
            startMonth.value = date.split("-")[1];

            endMonth.name = index + "[end_date][month]";
            endMonth.value = date.split("-")[1];

            endMonth.style.visibility = "hidden";
            startMonth.style.visibility = "hidden";

            div.appendChild(startMonth);
            div.appendChild(endMonth);

            var startDay = document.createElement("input");
            var endDay = document.createElement("input");

            startDay.name = index + "[start_date][day]";
            startDay.value = date.split("-")[2];

            endDay.name = index + "[end_date][day]";
            endDay.value = date.split("-")[2];

            endDay.style.visibility = "hidden";
            startDay.style.visibility = "hidden";

            div.appendChild(startDay);
            div.appendChild(endDay);



            var startTime = document.getElementById("startTime" + rowNum).value;

            var startHour = document.createElement("input");
            var startMinute = document.createElement("input");

            startHour.name = index + "[start_date][hour]";
            startHour.value = startTime.split(":")[0];

            startMinute.name = index + "[start_date][minute]";
            startMinute.value = startTime.split(":")[1];

            startMinute.style.visibility = "hidden";
            startHour.style.visibility = "hidden";

            div.appendChild(startHour);
            div.appendChild(startMinute);



            var endTime = document.getElementById("endTime" + rowNum).value;

            var endHour = document.createElement("input");
            var endMinute = document.createElement("input");

            endHour.name = index + "[end_date][hour]";
            endHour.value = endTime.split(":")[0];

            endMinute.name = index + "[end_date][minute]";
            endMinute.value = endTime.split(":")[1];

            endMinute.style.visibility = "hidden";
            endHour.style.visibility = "hidden";

            div.appendChild(endHour);
            div.appendChild(endMinute);
        }
        index++;
    });

    return true;
}