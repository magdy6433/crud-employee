
class EmployeeManager {
    constructor() {
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.mobInput = document.getElementById('mobile');
        this.formEmp = document.getElementById('employeeForm');
        this.showInTable = document.getElementById('empTable');
        this.btn = document.getElementById('btn');
        this.data = [];
        this.mood = 'create';
        this.tmp;
        this.loadDataFromLocalStorage();
        this.formEmp.addEventListener('submit', this.handleSubmit.bind(this));
        this.showData();
    }

    loadDataFromLocalStorage() {
        const storedData = localStorage.getItem('employee');
        if (storedData) {
            this.data = JSON.parse(storedData);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let newData = {
            name: this.nameInput.value,
            email: this.emailInput.value,
            mobile: this.mobInput.value
        };
        if(this.mood === "create"){
            this.data.push(newData);
        }else{
            this.data[this.tmp] = newData;
            this.mood = 'create';
            this.btn = 'create'
        }
        
        localStorage.setItem('employee', JSON.stringify(this.data));
        this.clearData();
        this.showData();
    }

    clearData() {
        this.nameInput.value = '';
        this.emailInput.value = '';
        this.mobInput.value = '';
    }

    showData() {
        let table = '';
        for (let i = 0; i < this.data.length; i++) {
            table += `<tr>
            <td>${this.data[i].name}</td>
            <td>${this.data[i].email}</td> 
            <td>${this.data[i].mobile}</td>  

            <td>
                <a href="#" onclick="employeeManager.updateData(${i})" class="btn">update</a>
                <a href="#" onclick="employeeManager.deleteData(${i})" class="btn">delete</a>
            </td>
        </tr>`;
        }
        this.showInTable.innerHTML = table;
    }

    deleteData(i) {
        this.data.splice(i, 1);
        localStorage.setItem('employee', JSON.stringify(this.data));
        this.showData();
    }


    updateData(i) {
        this.nameInput.value = this.data[i].name;
        this.emailInput.value = this.data[i].email;
        this.mobInput.value = this.data[i].mobile;
        this.btn.innerHTML = "Update";
        this.mood = 'update';
        this.tmp = i;
    }


}

const employeeManager = new EmployeeManager();
