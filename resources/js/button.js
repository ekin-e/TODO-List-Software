function call_add(){
    fetch("api/add", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json()
    ).then(data=>{
        location.reload()
    }
    ).catch(err=>console.log(err));
}

function call_delete(task_number){
    console.log(" taskno: " + task_number)
    var data = {
        task_num: task_number
    }

    console.log(data)
    fetch("api/delete", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json()
    ).then(data=>{
        location.reload()
    }
    ).catch(err=>console.log(err));
}

function update_api(task_number, name){
    var value = ""
    if (name == "task") {
        value = document.getElementById("T_" + task_number).value
    }
    else if (name == "progress") {
        value = document.getElementById("P_" + task_number).value
    }
    else {
        return -1;
    }
    fetch("api/update", {
        method: 'POST',
        body: JSON.stringify({task_num: task_number, name: name, value: value}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json()
    ).then(data=>{
        // location.reload()
    }
    ).catch(err=>console.log(err));
}

function init(){

}
