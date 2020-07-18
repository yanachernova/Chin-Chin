
export default function getState({ getStore, getActions, setStore }) {
    return {
        store: {
            //store variables goes here
            path: 'http://localhost:5000',
            isAuthenticatedUser: false,
            isAuthenticatedRestaurantUser: false,
            isAuthenticatedAdmin: false,
            name: '',
            email: '',
            phone: '',
            password_hash: '',
            errorsRegisterUser: '',
            errorsRegisterAdmin: '',
            errorsRegisterRestaurant: '',
            errorsLoginUser: '',
            errorsLoginRestaurant: '',
            errorsLoginAdmin: '',
            currentUser: {},
            currentAdmin: {},
            currentRestaurant: {},
            allRestaurants: [],
            allProducts: [],
            shoppingCart: [],
            orders: [],
            enviado: false,
            restaurant: "",
            email_confirm_success: null,
            email_confirm_msg: null,
            email_confirm_success_res: null,
            email_confirm_msg_res: null,
            email_confirm_success_admin: null,
            email_confirm_msg_admin: null,
            allusers: {},
            allproducts: {},
            idcurrentRestaurant: '',
            allrest: [],
            search: null,
            view: 0,
            contentofRest: [],
            file: ""
        },
        actions: {
            //actions go here.
            registerUserPost: () => {
                const store = getStore();
                const data = {
                    name: store.name,
                    email: store.email,
                    phone: store.phone,
                    password_hash: store.password_hash,
                }
                fetch(store.path + '/registration', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        if (data.msg) {
                            alert(data.msg)
                            setStore({ errorsRegisterUser: data })
                        }
                        else {
                            setStore({
                                errorsRegisterUser: '',
                                password_hash: '',
                                name: '',
                                email: '',
                                phone: '',
                                currentUser: data,
                                isAuthenticatedUser: true,
                            })
                            sessionStorage.setItem('currentUser', JSON.stringify(data))
                            sessionStorage.setItem('isAuthenticatedUser', true)
                        }
                    })
            },
            loginUserPost: () => {
                const store = getStore();
                const data = {
                    email: store.email,
                    password_hash: store.password_hash
                }
                fetch(store.path + '/login', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        if (data.msg) {
                            alert(data.msg)
                            setStore({ errorsLoginUser: data })
                            console.log(getStore().errorsLoginUser)
                        }
                        else {
                            setStore({
                                errorsLoginUser: '',
                                password_hash: '',
                                email: '',
                                currentUser: data,
                                isAuthenticatedUser: true,
                                isAuthenticatedRestaurantUser: false,
                                isAuthenticatedAdmin: false,
                                currentRestaurant: {},
                                currentAdmin: {}
                            })
                            console.log(data)
                            sessionStorage.setItem('currentUser', JSON.stringify(data))
                            sessionStorage.setItem('isAuthenticatedUser', true)
                            sessionStorage.removeItem('currentRestaurant')
                            sessionStorage.removeItem('currentAdmin')
                        }
                    })
            },
            handleChange: e => {
                let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
                setStore({ [e.target.name]: value })
            },
            searchSpace: e => {
                let keyword = e.target.value
                setStore({
                    search: keyword
                })
            },
            isAuthenticatedUser: () => {
                if (sessionStorage.getItem('currentUser') && sessionStorage.getItem('isAuthenticatedUser')) {
                    setStore({
                        isAuthenticatedUser: sessionStorage.getItem('isAuthenticatedUser'),
                        currentUser: JSON.parse(sessionStorage.getItem('currentUser')),
                        isAuthenticatedRestaurantUser: false,
                        isAuthenticatedAdmin: false,
                        currentRestaurant: {},
                        currentAdmin: {}
                    })
                    sessionStorage.removeItem('currentRestaurant')
                    sessionStorage.removeItem('currentAdmin')
                }
            },
            isAuthenticatedRestaurantUser: () => {
                if (sessionStorage.getItem('currentRestaurant') && sessionStorage.getItem('isAuthenticatedRestaurantUser')) {
                    setStore({
                        isAuthenticatedRestaurantUser: sessionStorage.getItem('isAuthenticatedRestaurantUser'),
                        currentRestaurant: JSON.parse(sessionStorage.getItem('currentRestaurant')),
                        isAuthenticatedUser: false,
                        isAuthenticatedAdmin: false,
                        currentUser: {},
                        currentAdmin: {}
                    })
                    sessionStorage.removeItem('currentUser')
                    sessionStorage.removeItem('currentAdmin')
                    sessionStorage.removeItem('isAuthenticatedUser')
                    sessionStorage.removeItem('isAuthenticatedAdmin')
                }
            },
            isAuthenticatedAdmin: () => {
                if (sessionStorage.getItem('currentAdmin') && sessionStorage.getItem('isAuthenticatedAdmin')) {
                    setStore({
                        isAuthenticatedAdmin: sessionStorage.getItem('isAuthenticatedAdmin'),
                        currentAdmin: JSON.parse(sessionStorage.getItem('currentAdmin')),
                        isAuthenticatedUser: false,
                        isAuthenticatedRestaurantUser: false,
                        currentRestaurant: {},
                        currentUser: {}
                    })
                    sessionStorage.removeItem('currentUser')
                    sessionStorage.removeItem('isAuthenticatedUser')
                    sessionStorage.removeItem('isAuthenticatedRestaurantUser')
                    sessionStorage.removeItem('currentRestaurant')
                }
            },
            Logout: () => {
                sessionStorage.removeItem('currentUser')
                sessionStorage.removeItem('currentRestaurant')
                sessionStorage.removeItem('currentAdmin')
                setStore({
                    isAuthenticatedRestaurantUser: false,
                    isAuthenticatedUser: false,
                    isAuthenticatedAdmin: false,
                    currentUser: {},
                    currentRestaurant: {},
                    currentAdmin: {}
                })
            },
            registerRestaurantPost: () => {
                const store = getStore();
                let localname = store.name.replace(/ /g, '_')
                const data = {
                    name: localname,
                    email: store.email,
                    phone: store.phone,
                    password_hash: store.password_hash
                }
                fetch(store.path + '/restaurantregistration', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        if (data.msg) {
                            alert(data.msg)
                            setStore({ errorsRegisterRestaurant: data })
                            console.log(getStore().errorsRegisterRestaurant)
                        }
                        else {
                            let aux = data.restaurantuser.name.replace(/_/g, ' ')
                            data.restaurantuser.name = aux
                            setStore({
                                errorsRegisterRestaurant: '',
                                password_hash: '',
                                name: '',
                                phone: '',
                                email: '',
                                currentRestaurant: data,
                                isAuthenticatedRestaurantUser: true,
                            })
                            //console.log(data)
                            sessionStorage.setItem('currentRestaurant', JSON.stringify(data))
                            sessionStorage.setItem('isAuthenticatedRestaurantUser', true)

                        }
                    })
            },
            loginRestaurantPost: () => {
                const store = getStore();
                const data = {
                    email: store.email,
                    password_hash: store.password_hash
                }
                fetch(store.path + '/restaurantlogin', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        if (data.msg) {
                            alert(data.msg)
                            setStore({ errorsLoginRestaurant: data })
                            console.log(getStore().errorsLoginRestaurant)
                        }
                        else {
                            console.log(data)
                            let aux = data.restaurantuser.name.replace(/_/g, ' ')
                            data.restaurantuser.name = aux
                            setStore({
                                errorsLoginRestaurant: '',
                                password_hash: '',
                                email: '',
                                currentRestaurant: data,
                                isAuthenticatedRestaurantUser: true,
                                isAuthenticatedUser: false,
                                isAuthenticatedAdmin: false,
                                currentUser: {},
                                currentAdmin: {}
                            })
                            sessionStorage.setItem('currentRestaurant', JSON.stringify(data))
                            sessionStorage.setItem('isAuthenticatedRestaurantUser', true)
                            sessionStorage.removeItem('currentUser')
                            sessionStorage.removeItem('currentAdmin')
                            sessionStorage.removeItem('isAuthenticatedUser')
                            sessionStorage.removeItem('isAuthenticatedAdmin')

                        }
                    })
            },
            registerAdminPost: () => {
                const store = getStore();
                const data = {
                    name: store.name,
                    email: store.email,
                    password_hash: store.password_hash
                }
                fetch(store.path + '/adminregistration', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        if (data.msg) {
                            alert(data.msg)
                            setStore({ errorsRegisterAdmin: data })
                            console.log(getStore().errorsRegisterAdmin)
                        }
                        else {
                            setStore({
                                errorsRegisterAdmin: '',
                                password_hash: '',
                                name: '',
                                email: '',
                                currentAdmin: data,
                                isAuthenticatedAdmin: true,
                            })
                            console.log(data)
                            sessionStorage.setItem('currentAdmin', JSON.stringify(data))
                            sessionStorage.setItem('isAuthenticatedAdmin', true)
                        }
                    })
            },
            loginAdminPost: () => {
                const store = getStore();
                const data = {
                    email: store.email,
                    password_hash: store.password_hash
                }
                fetch(store.path + '/adminlogin', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        if (data.msg) {
                            alert(data.msg)
                            setStore({ errorsLoginAdmin: data })
                            console.log(getStore().errorsLoginAdmin)
                        }
                        else {
                            setStore({
                                errorsLoginAdmin: '',
                                password_hash: '',
                                email: '',
                                currentAdmin: data,
                                isAuthenticatedAdmin: true,
                                isAuthenticatedUser: false,
                                isAuthenticatedRestaurantUser: false,
                                currentRestaurant: {},
                                currentUser: {}
                            })
                            console.log(data)
                            sessionStorage.setItem('currentAdmin', JSON.stringify(data))
                            sessionStorage.setItem('isAuthenticatedAdmin', true)
                            sessionStorage.removeItem('currentUser')
                            sessionStorage.removeItem('isAuthenticatedUser')
                            sessionStorage.removeItem('isAuthenticatedRestaurantUser')
                            sessionStorage.removeItem('currentRestaurant')
                        }
                    })
            },
            getAllRestaurants: async url => {
                try {
                    const all = await fetch(url, {
                        method: "GET",
                        headers: { "Content-Type": "aplication/json" }
                    })
                    const data = await all.json()
                    if (data.msg) {
                        console.log(data.msg)
                    }
                    let result = data.map((elem) => {
                        let aux = elem.name.replace(/_/g, ' ')
                        elem.name = aux
                        return elem
                    })
                    setStore({
                        allRestaurants: result
                    })
                }
                catch (error) {
                    console.log(error)
                }
            },
            updateUser: async (url, body) => {
                let newbody = { ...body }
                newbody.name = body.name.replace(/ /g, '_')
                try {
                    const all = await fetch(url, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newbody)
                    })
                    const response = await all.json()
                    console.log(response)
                }
                catch (error) {
                    console.log(error)
                }
            },
            newProduct: async (url, body,allProducts,url2) => {
                try {
                    const all = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    })
                    const result = await all.json()
                    if(result.msg==="producto registrado"){
                        allProducts(url2)
                    }
                    return result.msg
                }
                catch (error) {
                    console.log(error)
                }
            },
            getAllProductsOf: async (url) => {
                try {
                    setStore({
                        allProducts: []
                    })
                    const all = await fetch(url, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    })
                    const data = await all.json()

                    setStore({
                        allProducts: data
                    })
                    return ("ok")
                }
                catch (error) {
                    console.log(error)
                }
            },
            updateCurrUser: (newUser, oldUser) => {
                let aux = { ...oldUser }
                aux.user = newUser
                console.log(aux)
                setStore({ currentUser: aux })
                sessionStorage.setItem('currentUser', JSON.stringify(aux))
            },
            updateCurrRest: (newUser, oldUser) => {
                let aux = { ...oldUser }
                aux.restaurantuser = newUser
                setStore({ currentRestaurant: aux })
                sessionStorage.setItem('currentRestaurant', JSON.stringify(aux))
            },
            addShoppingCart: (newCart, oldCart) => {
                if (newCart === "") {
                    setStore({ shoppingCart: [] })
                }

                else {
                    let aux = [...oldCart]
                    aux.push(newCart)
                    setStore({ shoppingCart: aux })
                }
            },
            updateShoppingCart: (action, cart, index, amount) => {
                let newcart = [...cart]
                if (action === "+") {
                    newcart[index].amount = amount + 1
                }
                if (action === "-" && newcart[index].amount >= 0) {
                    newcart[index].amount = amount - 1
                }
                setStore({ shoppingCart: newcart })
            },
            updateProduct: async (url, body) => {
                try {
                    const all = await fetch(url, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    })
                    return "ok"
                }
                catch (error) {
                    console.log(error)
                }
            },
            deleteProduct: async (url, reload, url2) => {
                try {
                    const all = await fetch(url, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                    })
                    const result = await all.json()
                    console.log(result)
                    const re = await reload(url2)
                    const result2 = await re
                    console.log(result2)
                }
                catch (error) {
                    console.log(error)
                }
            },
            getRestaurant: async (url) => {
                try {
                    const all = await fetch(url, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    })
                    const data = await all.json()
                    let aux = data.restaurant.name.replace(/_/g, ' ')
                    data.restaurant.name = aux
                    setStore({ restaurant: data })
                }
                catch (error) {
                    console.log(error)
                }
            },
            getConfirmation: () => {
                const store = getStore()
                const data = {
                    email: store.email
                }
                fetch(store.path + '/change-password/', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            setStore({
                                email_confirm_success: data.success
                            })
                        } else {
                            alert(data.msg)
                            setStore({
                                email_confirm_msg: data.msg,

                            })
                        }
                    })
            },
            getPasswordChange: (token, history) => {
                const store = getStore()
                const data = {
                    password_hash: store.password_hash
                }
                fetch(store.path + '/change-password-confirm/' + token, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        alert("Your password was change successfully")
                        history.push("/")
                        setStore({
                            email: ''
                        })
                    })

            },
            getConfirmationRestaurant: () => {
                const store = getStore()
                const data = {
                    email: store.email
                }
                fetch(store.path + '/restchange-password/', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            setStore({
                                email_confirm_success_res: data.success
                            })
                        } else {
                            setStore({
                                email_confirm_msg_res: data.msg
                            })
                        }
                    })
            },
            getPasswordChangeRestaurant: (token, history) => {
                const store = getStore()
                const data = {
                    password_hash: store.password_hash
                }
                fetch(store.path + '/restchange-password-confirm/' + token, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        alert("Your password was change successfully")
                        history.push("/")
                        setStore({
                            email: ''
                        })
                    })

            },
            getConfirmationAdmin: () => {
                const store = getStore()
                const data = {
                    email: store.email
                }
                fetch(store.path + '/adminchange-password/', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            setStore({
                                email_confirm_success_admin: data.success
                            })
                        } else {
                            setStore({
                                email_confirm_msg_admin: data.msg
                            })
                        }
                    })
            },
            getPasswordChangeAdmin: (token, history) => {
                const store = getStore()
                const data = {
                    password_hash: store.password_hash
                }
                fetch(store.path + '/adminchange-password-confirm/' + token, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        alert("Your password was change successfully")
                        history.push("/")
                        setStore({
                            email: ''
                        })
                    })

            },
            sendOrder: async (url, products, user, restaurant, comment, total) => {
                try {
                    let body = {
                        product: products,
                        user: user,
                        restaurant: restaurant,
                        comment: comment,
                        total: total
                    }
                    const all = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    })
                    const data = await all.json()
                    if (data.msg) {
                        alert(data.msg)
                    }
                    else {
                        setStore({ enviado: true })
                    }
                }
                catch (error) {
                    console.log(error)
                }
            },
            getOrders: async (url) => {
                try {
                    const all = await fetch(url, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    })
                    const data = await all.json()
                    setStore({ orders: data })
                }
                catch (error) {
                    console.log(error)
                }
            },
            completeOrder: async (url) => {
                try {
                    const all = await fetch(url, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                    })
                    const data = await all.json()
                    if (data.msg === "completada" ||
                        data.msg === "rechazada" ||
                        data.msg === "cancelada") {
                        let actions=getActions()
                        let store=getStore()
                        try {
                            actions.getOrders(store.path + "/orderof/" + store.currentRestaurant.restaurantuser.id)
                        } catch (error) {
                            actions.getOrders(store.path + "/orderby/" + store.currentUser.user.id)
                        }
                        
                    }
                    else {
                        console.log(data.msg)
                    }

                } catch (error) {
                    console.log(error)
                }
            },
            enviadoCleanup: () => {

                setStore({ enviado: false,
                            restaurant:"" })
            },
            getAllUsers: () => {
                const store = getStore();
                fetch(store.path + '/users', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        setStore({
                            allusers: data
                        })
                        console.log(store.allusers)
                    })
            },
            getAllProducts: () => {
                const store = getStore();
                fetch(store.path + '/product', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        setStore({
                            allproducts: data
                        })
                        console.log(store.allproducts)
                    })
            },
            deleteRestaurant: (id) => {
                const store = getStore();
                fetch(store.path + '/restaurantusers/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.currentAdmin.access_token
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        getActions().DeleteRestForAdmin()
                    })
            },
            DeleteRestForAdmin: () => {
                const store = getStore();
                fetch(store.path + '/restaurantusers', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        setStore({
                            allrest: data
                        })
                        console.log(store.allrest)
                    })
            },
            getAllInfoRest: (id) => {
                const store = getStore();
                fetch(store.path + '/product/from/' + id, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        setStore({
                            view: 1,
                            contentofRest: data
                        })
                        console.log(data)
                    })
            },
            uploadFile: async (url, file,ready) => {
                try {
                    let formData = new FormData()
                    formData.append("photo", file)
                    const all = await fetch(url, {
                        method: "PUT",
                        body: formData
                    })
                    const data = await all.json()
                    if (data.msg=="ok"){
                        ready(true)
                    }


                } catch (error) {
                    console.log(error)
                }
            },
            getCurrentRestaurant: async () => {
                let currentRestaurant= JSON.parse(sessionStorage.getItem('currentRestaurant'))
                let url="http://localhost:5000/restaurantusers/"+currentRestaurant.restaurantuser.id
                try {
                    const all = await fetch(url, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    })
                    const data = await all.json()
                    currentRestaurant.restaurantuser.logo=data.logo
                    sessionStorage.setItem('currentRestaurant', JSON.stringify(currentRestaurant))
                    setStore({currentRestaurant:currentRestaurant})
                }
                catch (error) {
                    console.log(error)
                }
            },
        }
    }
}