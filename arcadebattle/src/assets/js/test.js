var gesturesChart = null;
var topGamesChart = null;
window.onload = function(){

    var slider = document.getElementById("myRange").firstChild.nextSibling;
    var output = document.getElementById("progress_value");
    output.innerHTML = slider.value + " %";

    slider.oninput = function() {
        output.innerHTML = this.value + " %";
    }

    var ctx = document.getElementById("topGamesChart").getContext("2d");

    if(ctx) {
        ctx.height = 150;
        topGamesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    {
                        label: "Games",
                        data: [],
                        borderColor: "rgba(93, 213, 93, 0.9)",
                        borderWidth: "0",
                        backgroundColor: "rgba(93, 213, 93, 0.5)"
                    }
                ]
            },
            options: {
                legend: {
                    position: 'top',
                    labels: {
                        fontFamily: 'Poppins'
                    }

                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontFamily: "Poppins"

                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontFamily: "Poppins"
                        }
                    }]
                }
            }
        });
    }

    //bar chart
    var ctx2 = document.getElementById("gesturesChart");
    if (ctx2) {
        ctx2.height = 150;
        gesturesChart = new Chart(ctx2, {
            type: 'bar',
            defaultFontFamily: 'Poppins',
            data: {
                labels: [],
                datasets: [
                    {
                        label: "Default Difficulty",
                        data: [],
                        borderColor: "rgba(0, 123, 255, 0.9)",
                        borderWidth: "0",
                        backgroundColor: "rgba(0, 123, 255, 0.5)",
                        fontFamily: "Poppins"
                    },
                    {
                        label: "User Difficulty",
                        data: [],
                        borderColor: "rgba(0,0,0,0.09)",
                        borderWidth: "0",
                        backgroundColor: "rgba(0,0,0,0.07)",
                        fontFamily: "Poppins"
                    }
                ]
            },
            options: {
                legend: {
                    position: 'top',
                    labels: {
                        fontFamily: 'Poppins'
                    }

                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontFamily: "Poppins"

                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontFamily: "Poppins"
                        }
                    }]
                }
            }
        });
    }

    getData();

}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function getData() {
    gestureJSON = JSON.parse(document.getElementById("gestureChart_dict").innerHTML.replaceAll('\'', '\"'))

    topGamesChart.data.labels = [];
    topGamesChart.data.datasets[0].data=[];


    topGamesChart.data.labels = {{ games_quant.0|safe}};  //["Flappy Bird", "Gun Fight", "Quiz", "Space Invaders"];
    topGamesChart.data.datasets[0].data = {{ games_quant.1|safe }} ; //[22,16,30,9];
    topGamesChart.update();

    Object.keys(gestureJSON).forEach(function(id) {
        gesturesChart.data.labels.push(gestureJSON[id][0])
        gesturesChart.data.datasets[0].data.push(gestureJSON[id][2])
        gesturesChart.data.datasets[1].data.push(gestureJSON[id][1])
    });

    gesturesChart.update();
}

Function.prototype.toJSON = function() {
    var parts = this
        .toString()
        .match(/^\s*function[^(]*\(([^)]*)\)\s*{(.*)}\s*$/)
    ;
    if (parts == null)
        throw 'Function form not supported';

    return [
        'window.Function',
        parts[1].trim().split(/\s*,\s*/),
        parts[2]
    ];
};

function editNote(){
    document.getElementById("notes_textarea").disabled = false;
    document.getElementById("saveButton").disabled = false;
    document.getElementById("editButton").disabled = true;
}

function saveNote(){
    document.getElementById("notes_textarea").disabled = true;
    document.getElementById("saveButton").disabled = true;
    document.getElementById("editButton").disabled = false;
}


function resetModal(){
    $('#addGestureModal').modal('hide');

    document.getElementById("addGestureModal").innerHTML = '<div class="modal-dialog modal-lg" role="document"><div class="modal-content">\n' +
        '            <div class="modal-header">\n' +
        '                <h5 class="modal-title" id="addGestureModalLabel"></h5>\n' +
        '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
        '                    <span aria-hidden="true">&times;</span>\n' +
        '                </button>\n' +
        '            </div>' +
        '<div class="modal-body">\n' +
        '                <div id="recognition_content" style="text-align: center">\n' +
        '                    <div id="canvas_div" style="min-height: 450px">\n' +
        '                    </div>\n' +
        '                    <p id="gesture_name" style="diplay:none"></p>\n' +
        '\n' +
        '                    <button type="button" class="btn btn-success col-lg-5" id="right_gesture_btn" onclick="collectRightGestures()">Start Collecting Right Gestures</button>\n' +
        '                    <button type="button" class="btn btn-danger col-lg-5" id="random_gesture_btn" disabled onclick="collectRandomGestures()">Start Collecting Random Gestures</button>\n' +
        '                    <div id="right_status_bars"></div>\n' +
        '                    <div id="random_status_bars"></div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '\n' +
        '            <div class="modal-footer">\n' +
        '                <button type="button" class="btn btn-secondary" onclick="resetModal()">Cancel</button>\n' +
        '                <button type="button" class="btn btn-primary" data-dismiss="modal" disabled id="confirmGesture" onclick="updateGestureImg()">Confirm</button>\n' +
        '            </div>' +
        '</div>';

    setup();
}

function updateGestureImg()
{
    var gestureHolder = document.getElementById("gestureImg");

    if(gestureHolder)
    {
        //IMAGEM A GUARDAR
        var b64 = hand_position_image_b64.split(',')[1];
        document.getElementById("imageInputText").value = b64;
        //JSON A GUARDAR
        document.getElementById("jsonInputText").value = JSON.stringify(decision_trees[0]);
        gestureHolder.setAttribute( 'src', 'data:image/png;base64,'+ b64 );
    }

    resetModal()
}

function resetGestureAndTest(){
    document.getElementById("gestureImg").setAttribute('src', 'https://www.unesale.com/ProductImages/Large/notfound.png' );
    document.getElementById("stopTestGesture").disabled = true;
    document.getElementById("testGestureBtn").disabled = true;
}

function updateGestureStatisticModal(button, g)
{
    var g_name = g.name;
    var g_patient_difficulty = g.patient_difficulty;
    var g_default_difficulty = g.default_difficulty;
    var g_repetitions = g.repetitions;
    var g_photo = g.image;

    document.getElementById("gestureStatisticsName").value = g_name;
    document.getElementById("gestureStatisticsRepetitions").value = g_repetitions;

    document.getElementById("gestureStatisticsName_card").innerHTML = g_name;
    $("#gestureStatisticPic").attr('src', 'data:image/png;base64,' + g_photo);


    $("#gestureStatisticsDefaultDifficulty").attr("aria-valuenow", "" + g_default_difficulty);
    document.getElementById("gestureStatisticsDefaultDifficulty").style.width = g_default_difficulty + "%";
    document.getElementById("gestureStatisticsDefaultDifficulty").innerHTML = g_default_difficulty + "%";




    $("#gestureStatisticsDefaultDifficulty").removeClass();
    $("#gestureStatisticsDefaultDifficulty").attr('class', 'progress-bar progress-bar-striped progress-bar-animated');

    if(g_default_difficulty <= 25)
        $("#gestureStatisticsDefaultDifficulty").addClass(" bg-success");
    else if (g_default_difficulty <= 50)
        $("#gestureStatisticsDefaultDifficulty").addClass(" bg-info");
    else if (g_default_difficulty <= 75)
        $("#gestureStatisticsDefaultDifficulty").addClass(" bg-warning");
    else
        $("#gestureStatisticsDefaultDifficulty").addClass(" bg-danger");



    $("#gestureStatisticsUserDifficulty").attr("aria-valuenow", "" + g_patient_difficulty);
    document.getElementById("gestureStatisticsUserDifficulty").style.width = g_patient_difficulty + "%";
    document.getElementById("gestureStatisticsUserDifficulty").innerHTML = g_patient_difficulty + "%";

    $("#gestureStatisticsUserDifficulty").removeClass();
    $("#gestureStatisticsUserDifficulty").attr('class', 'progress-bar progress-bar-striped progress-bar-animated');

    if(g_patient_difficulty <= 25)
        $("#gestureStatisticsUserDifficulty").addClass(" bg-success");
    else if (g_patient_difficulty <= 50)
        $("#gestureStatisticsUserDifficulty").addClass(" bg-info");
    else if (g_patient_difficulty <= 75)
        $("#gestureStatisticsUserDifficulty").addClass(" bg-warning");
    else
        $("#gestureStatisticsUserDifficulty").addClass(" bg-danger");

}

function loadInfo(g){
    b64_image = g.image;
    g_name = g.name;
    u_mail = g.username;
    document.getElementById("gestureRemovePic").setAttribute('src', 'data:image/png;base64,' + b64_image );

    document.getElementById("id_gesture_name").value = g_name;
    $("#id_gesture_name").prop('readonly', true);

    document.getElementById("id_user_email").value = u_mail;
    $("#id_user_email").prop('readonly', true);
}