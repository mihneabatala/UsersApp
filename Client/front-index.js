
    const insertForm = document.getElementById('user-form');
    const deleteForm = document.getElementById('delete-form');
    const updateForm = document.getElementById('update-form');
    const refresh = document.getElementById('refresh');
    const tabelBody = document.querySelector('.users-info');
    

    const baseURL = 'http://localhost:3000/';

    insertForm.addEventListener('submit', (event) =>{
        event.preventDefault();

        const name = document.querySelector('#user-name');
        const email = document.querySelector('#user-email');
        const age = document.querySelector('#user-age');
        const gender = document.querySelector('input[name="user-gender"]:checked');


        fetch(baseURL + 'insert',{

            method: 'POST',
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                age: age.value,
                gender: gender.value
            })
        }).then(response =>{
    
            return response.json();

        }).then(data => {
            alert(data.message);
        })

        insertForm.reset();

    })

    refresh.addEventListener('click', (event)=>{
        event.preventDefault();
        
        while(tabelBody.firstChild){
            tabelBody.removeChild(tabelBody.firstChild);
        }

        fetch(baseURL + 'get')
        .then(response=>{

                return response.json(); 
            
        })
        .then(data =>{
            
            for (const obj of data){

                const tabel_row = document.createElement("tr");
                const user_name = document.createElement("td");
                const user_email = document.createElement("td");
                const user_age = document.createElement("td");
                const user_gender = document.createElement("td");

                user_name.innerHTML = obj.Name;
                user_email.innerHTML = obj.Email;
                user_age.innerHTML = obj.Age;
                user_gender.innerHTML = obj.Gender;

                tabel_row.append(user_name, user_email, user_age, user_gender);
                tabelBody.appendChild(tabel_row);
            }
        })
    })

    deleteForm.addEventListener('submit', (event)=>{
        event.preventDefault();

        const name = document.getElementById('username-delete');

        fetch(baseURL + 'delete', {
            method: 'DELETE',
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name.value
            })
        }).then(response=>{
            return response.json();
        }).then(data=>{
            alert(data.message);
        })

        deleteForm.reset();
    })

    updateForm.addEventListener('submit', (event)=>{
        event.preventDefault();

        const name = document.getElementById('username');
        const updatedEmail = document.getElementById('update-email');
        const updatedAge = document.getElementById('update-age');
        const updatedGender =document.querySelector('input[name="user-gender"]:checked');

        fetch(baseURL + 'update', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name.value,
                updatedEmail: updatedEmail.value,
                updatedAge: updatedAge.value,
                updatedGender: updatedGender.value
            })
        })
        .then(response=>{
            return response.json();
        })
        .then(data =>{
            alert(data.message);
        })

        updateForm.reset();
    })
    




