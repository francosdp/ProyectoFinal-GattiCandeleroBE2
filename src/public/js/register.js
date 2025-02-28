document.addEventListener("DOMContentLoaded", () => {
    const formRegister = document.getElementById('registerForm')

    formRegister.addEventListener('submit', async (e) => {
        e.preventDefault()
        const formData = new FormData(formRegister)
        const userData = Object.fromEntries(formData)


        try {

            const response = await fetch('http://localhost:9090/api/sessions/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
                credentials:"include"

            })


            const data = await response.json()

            if (data.message=="Te has registrado con éxito"){
                alert("Te has registrado con éxito")
                window.location.href = "http://localhost:9090/api/sessions/viewLogin"
            }
            else {
                console.log(data)
            }

        } catch (e) {
            console.log(e)
        }

    })
})
