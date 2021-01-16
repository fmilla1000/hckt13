class CreateUser {
    users = [];
    modalDom = new bootstrap.Modal(document.getElementById('exampleModal'), {
        keyboard: false,
    });

    confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'), {
        keyboard: false,
    });

    formConfirm = document.querySelector('.js_form_confirm');
    btnsRegister = document.querySelectorAll('.js_register_event_register')


    constructor() {
        this.init()
    }

    init() {
        this.registerEventFormRegister()
        this.registerButtonsRegister();
        this.getDom().modalRegisterEdit.addEventListener('hidden.bs.modal', () => {
            this.getDom().formRegisterEdit.reset()
        })

    }

    registerEventFormRegister() {
        const form = this.getDom().formRegisterEdit;
        form.onsubmit = (event) => {
            event.preventDefault();
            this.addCardinDom(this.makeCardUser(this.getValuesUser()));
            this.modalDom.hide();
            form.reset()

        };
    }

    registerButtonsRegister() {
        this.btnsRegister.forEach((btn) => {
            btn.onclick = () => {
                this.registerEventFormRegister()
            }
        });
    }

    editDomCard(values, idNode) {
        const card = document.getElementById(idNode)
        const {
            name,
            lastname,
            raza,
            telefono,
            pais,
            url,

        } = values;

        card.querySelector('.replace').innerHTML = `
        <div class="replace">
            <figure><img src=${url} class="card-img-top"/></figure>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item"><label>Nombre completo: </label> ${name } ${lastname}</li>
                    <li class="list-group-item"><label>Raza: </label> ${raza}</li>
                    <li class="list-group-item"><label>Telefono: </label> ${telefono}</li>
                    <li class="list-group-item"><label>Pais: </label> ${pais}</li>

                </ul>
            </div>
        </div>
        `
    }

    registerEventFormEdit(idDom) {
        const form = this.getDom().formRegisterEdit;
        const positionUser = this.users.findIndex(user => user.id == idDom);

        form.onsubmit = (event) => {
            event.preventDefault();
            this.editDomCard(this.getValuesUser(), idDom);

            this.users[positionUser] = Object.assign({}, this.users[positionUser], {
                ...this.getValuesUser(),
            });

            this.modalDom.hide();
        };
    }

    getDom() {
        const form = {
            name: document.querySelector('.js_name'),
            lastname: document.querySelector('.js_lastname'),
            raza: document.querySelector('.js_raza'),
            telefono: document.querySelector('.js_telefono'),
            pais: document.querySelector('.js_pais'),
            url: document.querySelector('.js_url'),
        };

        const formRegisterEdit = document.querySelector(".js_form");
        const modalRegisterEdit = document.getElementById("exampleModal")

        return {
            form,
            formRegisterEdit,
            modalRegisterEdit
        }
    }

    getValuesUser() {
        const valuesUser = {
            name: this.getDom().form.name.value,
            lastname: this.getDom().form.lastname.value,
            raza: this.getDom().form.raza.value,
            telefono: this.getDom().form.telefono.value,
            pais: this.getDom().form.pais.value,
            url: this.getDom().form.url.value,
        };
        return valuesUser;
    }
    makeCardUser(values) {
        const {
            name,
            lastname,
            raza,
            telefono,
            pais,
            url,

        } = values;
        const card = document.createElement('article');
        const idUnique = this.unitId()
        card.classList.add('card')
        card.id = idUnique;
        card.innerHTML = `
            <button type="button" class="js_edit btn btn-secondary icon icon-left"><i class="fas fa-edit"></i></button>
            <button type="button" class="js_delete btn btn-danger icon icon-right"><i class="fas fa-trash"></i></button>
            <div class="replace">
                <figure><img src=${url} class="card-img-top"/></figure>
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item"><label>Nombre completo: </label> ${name } ${lastname}</li>
                        <li class="list-group-item"><label>Raza: </label> ${raza}</li>
                        <li class="list-group-item"><label>Telefono: </label> ${telefono}</li>
                        <li class="list-group-item"><label>Pais: </label> ${pais}</li>

                    </ul>
                </div>
            </div>
        `;

        card.querySelector('.js_edit').onclick = () => {
            this.editUser(idUnique)
        }
        card.querySelector('.js_delete').onclick = () => {
            this.confirmModal.show()
            this.formConfirm.onsubmit = (event) => {
                event.preventDefault();
                this.deleteUser(card, idUnique)
                this.confirmModal.hide()
                this.toggleAdd()
            }
        }

        this.users.push(Object.assign({}, values, {
            id: idUnique,
        }));

        this.toggleAdd();

        return card;
    }

    editUser(idUser) {
        this.registerEventFormEdit(idUser);
        const valueUser = this.users.filter(user => user.id == idUser)[0];
        for (const elementForm in this.getDom().form) {
            this.getDom().form[elementForm].value = valueUser[elementForm]
        }
        this.modalDom.show()
    }

    deleteUser(user, id) {
        user.remove();
        this.users = this.users.filter(user => user.id !== id)

    }

    unitId() {
        return Math.floor(Math.random() * 100);
    }

    addCardinDom(node) {
        const app = document.getElementById('app');
        app.appendChild(node);

    }

    toggleAdd() {
        const btnAdd = document.querySelector('.js_add');
        const btnAddHeader = document.querySelector('.js_add_header');

        if (this.users.length > 0) {
            btnAdd.classList.add('d-none')
            btnAddHeader.classList.remove('d-none')
        } else {
            btnAdd.classList.remove('d-none')
            btnAddHeader.classList.add('d-none')
        }
    }
}

new CreateUser()