function savetocrud(event){
    event.preventDefault();
    const money=event.target.amount.value;
    const des=event.target.descriptions.value;
    const category=event.target.categorys.value; 
    const obj={
       money,
       des,
       category
    }
    axios.post("https://crudcrud.com/api/6383d050cba24f98ae4a20cd1a4f32f1/exp", obj)
    .then((response) =>{
        console.log(response);
        showonscreen(response.data);

    })
    .catch((err)=>{
        console.log(err);
    })
   
   
   
}

window.addEventListener("DOMContentLoaded", () =>{
    axios.get("https://crudcrud.com/api/6383d050cba24f98ae4a20cd1a4f32f1/exp")
    .then((response) =>{
        for(var i=0;i<response.data.length;i++){
            showonscreen(response.data[i]);
        }
    })
    .catch((err) =>{
        console.log(err);
    })
})


function showonscreen(user){
  
    document.getElementById('amount').value = 0;
    document.getElementById('descriptions').value =``;
    const ul=document.getElementById('listofexpenses');
    const li=`<li id=${user._id}> ${user.money}--${user.des}--${user.category}<button onclick=deleteused('${user._id}')>delete</button> <button onclick=editused('${user._id}','${user.amount}','${user.des}','${user.category}')>edit</button></li>`
    ul.innerHTML=ul.innerHTML+li;
}

function editused(id,mon,desc,category){
    document.getElementById('amount').value = mon;
    document.getElementById('descriptions').value= desc;
    document.getElementById('categorys').value = category;

    deleteused(id);
     
}

function deleteused(userid){
    console.log(userid);
    axios.delete(`https://crudcrud.com/api/6383d050cba24f98ae4a20cd1a4f32f1/exp/${userid}`)
    .then((response) =>{
        removefromscreen(userid);
    })
    .catch((err) =>{
        console.log(err);
    })
    
}
function removefromscreen(userid){
    const ul=document.getElementById('listofexpenses');
    const li=document.getElementById(userid);
        ul.removeChild(li)
    
    
}