document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById('loginForm')
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault()
        const formData = new FormData(formLogin)
        const userData = Object.fromEntries(formData)

        try {

            const response = await fetch('http://localhost:9090/api/sessions/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
                credentials:"include"

            })


            const data = await response.json()
            
            

            if (data.message=="Logueado"){
                alert("Usuario Logueado")
                window.location.href = "http://localhost:9090/api/products"
            }
            else {
                alert("El mail y/o contraseña son incorrectos.")
                document.getElementById('inputMail').value=''
                document.getElementById('inputPass').value=''

            }

        } catch (e) {
            console.log(e)
        }

    })
})
