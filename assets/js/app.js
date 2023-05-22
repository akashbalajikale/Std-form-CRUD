let cl =console.log;

const sdtForm =document.getElementById('sdtForm');
const fnameControl = document.getElementById('fname');
const lnameControl = document.getElementById('lname');
const emailControl = document.getElementById('email');
const contactControl = document.getElementById('contact');
const sdtbody =document.getElementById('sdtbody');
const submitBtn = document.getElementById('submitBtn');
const updateBtn = document.getElementById('updateBtn');
 
let sdtArray = [
        {
            fname: "ak",
            lname:'kk',
            email: "ak@gmail.com",
            contact:12344
        }
];
const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};

const onEdit =(ele) =>{
    // cl(ele.closest("tr").getAttribute("id")) 
    let editId =ele.closest("tr").getAttribute("id");

    let editObj = sdtArray.find(sdt => sdt.id === editId)

    localStorage.setItem("editId", editId);
    fnameControl.value = editObj.fname;
    lnameControl.value = editObj.lname;
    emailControl.value = editObj.email;
    contactControl.value = editObj.contact;

    updateBtn.classList.remove("d-none");
    submitBtn.classList.add("d-none");
    
}
 
function onupdateBtn(eve) {
    let updateId = localStorage.getItem("editId");
    // cl(updateId)
    sdtArray.forEach(sdt => {
        if (sdt.id === updateId) {
            sdt.fname = fnameControl.value;
            sdt.lname = lnameControl.value;
            sdt.email = emailControl.value;
            sdt.contact = contactControl.value;

        }
    });
    cl(sdtArray);
    localStorage.setItem("sdtarray", JSON.stringify(sdtArray));
    templating(sdtArray);
    sdtForm.reset();
    
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: ' Update Successfully',
        timer: 1500
      })
      updateBtn.classList.add("d-none");
      submitBtn.classList.remove("d-none");
}


// if(localStorage.getItem(sdtArray)){
//     sdtArray = JSON.parse(localStorage.getItem(sdtArray));
// }
sdtArray = JSON.parse(localStorage.getItem("sdtarray")) || [];
// sdtArray = JSON.parse(localStorage.getItem("sdtarray")) ?? [];

const onDelete =(ele) => {
    // cl(ele.closest("tr").getAttribute("id"));
    let deletId = ele.closest("tr").getAttribute("id");
    cl(deletId)
    let deleteIndex =sdtArray.findIndex(sdt => sdt.id === deletId);
    sdtArray.splice(deleteIndex, 1);
   localStorage.setItem("sdtarray", JSON.stringify(sdtArray));
    templating(sdtArray);
    // alert(" Are you sure you want to delete")
     
Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    confirmButtonText: 'Yes, delete it!'
  }) 
 
};

function templating(arr){
    let result ="";
    arr.forEach((ele, i) => {
        result +=`
                        <tr id=${ele.id}>
                            <td>${i + 1}</td>
                            <td>${ele.fname}</td>
                            <td>${ele.lname}</td>
                            <td>${ele.email}</td>
                            <td>${ele.contact}</td>
                            <td>
                            <button class="btn btn-primary" onclick="onEdit(this)">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                             </td>
                             <td>
                            <button class="btn btn-danger" onclick="onDelete(this)">
                                <i class="fa-sharp fa-solid fa-trash"></i>
                            </button>
                         </td>
                        </tr>
        `
    });
    sdtbody.innerHTML = result;

}
templating(sdtArray)
 

const onsdtForm =(eve)=>{
    eve.preventDefault();
    let obj = {
        fname : fnameControl.value,
        lname : lnameControl.value,
        email : emailControl.value,
        contact : contactControl.value,
        id :generateUuid()
    }
     sdtArray.push(obj);
     eve.target.reset();
     templating(sdtArray)
     localStorage.setItem("sdtarray", JSON.stringify(sdtArray));
     Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your form has been saved',
        showConfirmButton: false,
        timer: 1500
      })
}
 
sdtForm.addEventListener("submit", onsdtForm)
updateBtn.addEventListener("click", onupdateBtn)
 
 