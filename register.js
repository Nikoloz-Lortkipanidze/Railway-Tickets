function createToken() {
    event.preventDefault();

    let email = document.querySelector('.email').value
    let pass = document.querySelector('.pass').value

    fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: pass
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('response is not okay');
        }
        return response.json();
    })
    .then(data => saveToken(data))
    .catch(error => cantSaveToken());
}

function saveToken(data) {
    console.log(data);
    localStorage.setItem('token', data.token);
    Swal.fire({
        title: "რეგისტრაცია დასრულდა წარმატებით!",
        icon: "success",
        draggable: true
    }).then(() => {
        window.location.href = 'index.html';
    });
}

function cantSaveToken() {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "რეგისტრაცია ვერ მოხერხდა!"
    }).then(() => {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });
}

