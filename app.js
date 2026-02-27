console.log("hello world")
// supabase init
// insatll supabase
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm"

let Project_Url = 'https://fizyiauptqctsmhgtbdj.supabase.co';
let Project_Anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpenlpYXVwdHFjdHNtaGd0YmRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MzcwMzUsImV4cCI6MjA4NzQxMzAzNX0.UfG3ftKYem5vJeQ_y0tyRgy4ewJl5Ob4J3ZI20ceSRc';


// project conect
let supabase = createClient(Project_Url, Project_Anon_key)

// add todo
async function addtodo(elem) {

    let resData = new FormData(elem)

    let obj = {
        todo: resData.get("todovalue")
    }


    let { data, error } = await supabase
        .from('todos')
        .insert([obj])

    if (error) {
        console.log(error)
        alert("an error")
    }


    console.clear()
    // alert("data added done")
    elem.reset()
    getTodoValue()
}

window.addtodo = addtodo


// get todo values 
async function getTodoValue() {
    let todoWrapper = document.getElementById("todoWrapper")



    let { data, error } = await supabase
        .from('todos')
        .select('*')

    if (error) {
        console.log(error)
        alert("an error")
    }

    todoWrapper.innerHTML = ''
    // alert("data will be resived");
    data.map((value, index, array) => {
        todoWrapper.innerHTML += `
            <li>
            ${value.todo}

            <button onclick="edit(${value.id})">edit</button>
            <button onclick="delet(${value.id})">delet</button>
            </li>
        `
    })

}

window.getTodoValue = getTodoValue

getTodoValue()


// updated popup
async function updatee(elem) {
    let resData = new FormData(elem)
    let updatedvalue = resData.get('updatedv')


    let { data, error } = await supabase
        .from('todos')
        .update({ todo: updatedvalue })
        .eq("id", Number(localStorage.getItem("todoId", elem)))


    if (error) {
        console.log(error)
        alert("an error")
    }

    alert("data updated");

    let popup = document.getElementById("popup").style.display = "none"

    getTodoValue()
}
window.updatee = updatee



// edit
async function edit(elem) {
    let popup = document.getElementById("popup").style.display = "flex"
    let upInput = document.getElementById("upInput")

    localStorage.setItem("todoId", elem)

    let { data, error } = await supabase
        .from('todos')
        .select('')
        .eq("id", elem)

    if (error) {
        console.log(error)
        alert("an error")
    }
    data.map(value => {
        upInput.value = value.todo
    })
}
window.edit = edit






// delet
async function delet(elem) {



    let { data, error } = await supabase
        .from('todos')
        .delete()
        .eq("id", elem)


    if (error) {
        console.log(error)
        alert("an error")
    }

    alert("data deleted");
    getTodoValue()

}
window.delet = delet
