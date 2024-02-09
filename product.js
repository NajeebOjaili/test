


// read
// count
//delete
// search 
// clean data


let title = document.getElementById("title");
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total')
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'crete';
let temp ;

//console.log(title, price, taxes, ads, discount, total, count, category, submit);

//get total 
function getTotal(){
   if(price.value != ''){
   let  result=( +price.value + +ads.value + +taxes.value) - +discount.value;
   total.innerHTML = result;
   total.style.background = '#040';
   }else{
    total.innerHTML = '';
    total.style.background = '#a00d';
   }
}

//create product 
let datapro
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product); // قراءة للبيانات parse
}else{
    datapro = [];
}




submit.onclick = function(){
     let  newpro = {
        title: title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
        

        

     }
     if (mood == 'create'){
        if (newpro.count > 1){
            for(let i = 0 ; i < newpro.count ; i++){
                datapro.push(newpro);
            }
          }else{
            datapro.push(newpro);
          }
     }else{
        datapro[temp] = newpro;
        mood = 'create';
        submit.innerHTML = 'create';
        count.style.displ= 'block'
     }
  


  
   // save localstorage

 
   localStorage.setItem('product' , JSON.stringify(datapro)); // اضافة للبيانات satItem

   clearInputs();
   ShowData();

     console.log(product);
}
ShowData();
// clear inputs

function clearInputs(){
title.value = '';
price.value = '';
taxes.value = '';
ads.value = '';
discount.value = '';
total.innerHTML = '';
count.value = '';
category.value = '';


}

// read

function ShowData(){
    let table = '';
    for (let i= 0; i < datapro.length; i++){
        table += `
        <tr>
                            
        <td >${i}</td>
        <td >${datapro[i].title}</td>
        <td >${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>

        <td>${datapro[i].category}</td>
        <td><a href="#" class="btn btn-outline-info rounded" onclick="updateData(${i})" >update</a></td>
        <td><a href="#" class="btn btn-outline-danger rounded" onclick="deleteData(${i})">delete</a></td>
    
     </tr>
        
        `
        
    }
    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('DeleteAll');
    if(datapro.length > 0){
        btnDelete.innerHTML = `
        <button class='btn btn-danger w-100' onclick="deleteAll()" >
        Dellete All
        </button>
        `
    }

}



function deleteData(i){
     datapro.splice(i,1);
     localStorage.product = JSON.stringify(datapro);
     ShowData();

}
function deleteAll(){
     localStorage.clear();
     datapro.splice(0)
     ShowData()
}

// count 

//updateData
function updateData(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = datapro[i].category;
  
    submit.innerHTML = 'Update';
    mood = 'update';
    temp = i
    scroll({top:0,behavior:'smooth'})
}



//search 
let searchMood = 'title';
function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'title';
        search.Placeholder = 'search by title';
    }else{
        searchMood = 'category';
        search.Placeholder = 'search by category'
    }
    search.focus()
   search.value = '';
   ShowData();
}


function searchData (value){
    let table = ''
    for(let i= 0 ; i< datapro.length; i++){
  if(searchMood == 'title'){
    
    
        if(datapro[i].title.includes(value.toLowerCase())){
            
            table+=`
            
            <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td> ${datapro[i].ads}</td>
                <td> ${datapro[i].count}</td>
                <td> ${datapro[i].discount}</td>
                <td> ${datapro[i].category}</td>
                <td><a href="#" class="btn btn-outline-info rounded" onclick="updateData(${i})" >update</a></td>
                <td><a href="#" class="btn btn-outline-danger rounded" onclick="deleteData(${i})">delete</a></td>
            </tr>`;
            
                
       
        }
       
 
  }else{
    
   
        if(datapro[i].category.includes(value.toLowerCase())){
            
            table+=`
            
            <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td> ${datapro[i].ads}</td>
                <td> ${datapro[i].count}</td>
                <td> ${datapro[i].discount}</td>
                <td> ${datapro[i].category}</td>
                <td><a href="#" class="btn btn-outline-info rounded" onclick="updateData(${i})" >update</a></td>
                <td><a href="#" class="btn btn-outline-danger rounded" onclick="deleteData(${i})">delete</a></td>
            </tr>`;
            
                
       
        }
       
    }
  }
  document.getElementById('tbody').innerHTML=table;

}