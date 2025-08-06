const cardList = [
    {
        title: "Cathy",
        image: "images/kitten2.jpg",
        link: "About this Kitten",
        desciption: "Demo desciption about kitten 2"
    },
    {
        title: "Bobby",
        image: "images/kitten3.jpg",
        link: "About this Kitten",
        desciption: "Demo desciption about kitten 3"
    }
];

const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
};

const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();

    if (!formData.first_name || !formData.last_name || !formData.email) {
        alert("Please fill in all required fields");
        return;
    }

    console.log("Form Data Submitted: ", formData);

    $.post('/api/users', formData, (response) => {
        console.log("Server response: ", response);
        if (response.statusCode === 200) {
            $('#modal1').modal('close');
            alert("Form submitted successfully!\nWelcome " + formData.first_name + " " + formData.last_name);
        } else {
            alert("Error: " + response.message);
        }
    }).fail((error) => {
        console.error("Error:", error);
        alert("Failed to submit form. Please try again.");
    });
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = `
        <div class="col s4 center-align">
            <div class="card medium">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="${item.image}">
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">
                        ${item.title}<i class="material-icons right">more_vert</i>
                    </span>
                    <p><a href="#">${item.link}</a></p>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">
                        ${item.title}<i class="material-icons right">close</i>
                    </span>
                    <p class="card-text">${item.desciption}</p>
                </div>
            </div>
        </div>`;
        $("#card-section").append(itemToAppend);
    });
};

const getProjects = () => {
$.get('/api/projects',(response) => {
if(response.statusCode==200){
addCards(response.data);
}
})
}

$(document).ready(function() {

    $('.materialboxed').materialbox();
    $('.modal').modal();

    $('#clickMeButton').click(() => {
    });
    
    $('#formSubmit').click(() => {
        submitForm();
    });

    getProjects();
    addCards(cardList);
});
