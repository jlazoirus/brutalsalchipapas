var modalSelectItem = {
    id: "selectCityModal",
    availableCities: [
        {
            id: 1,
            name: 'Arequipa',
            whatsappLink: 'https://api.whatsapp.com/send/?phone=51955756006&text=¡Hola quiero hacer un pedido de Brutal por favor!',
            channels: [
                {
                    id: 'whatsapp-link',
                    name: 'Whatsapp',
                    href: 'https://api.whatsapp.com/send/?phone=51955756006&text=¡Hola quiero hacer un pedido de Brutal por favor!',
                },
                {
                    id: 'rappi-link',
                    name: 'Rappi',
                    href: 'https://www.rappi.com.pe/restaurantes/46822-brutal-salchipapa',
                },
                {
                    id: 'pedidos-ya-link',
                    name: 'Pedidos Ya',
                    href: 'https://www.pedidosya.com.pe/restaurantes/arequipa/brutal-salchipapas-c1e9b636-db79-49db-bf8a-c0ce8332ac86-menu'
                },
            ],
            cartaHref: "https://drive.google.com/file/d/1mlWKV0WwjETv75YB6DT8EGOa3rOJsrGz/view?usp=sharing"
        },
        {
            id: 2,
            name: 'Lima',
            whatsappLink: 'https://api.whatsapp.com/send/?phone=51984705661&text=¡Hola quiero hacer un pedido de Brutal por favor!',
            channels: [
                {
                    id: 'whatsapp-link',
                    name: 'Whatsapp',
                    href: 'https://api.whatsapp.com/send/?phone=51984705661&text=¡Hola quiero hacer un pedido de Brutal por favor!',
                },
                {
                    id: 'rappi-link',
                    name: 'Rappi',
                    href: 'https://www.rappi.com.pe/restaurantes/48684-brutal-salchipapa',
                },
                {
                    id: 'pedidos-ya-link',
                    name: 'Pedidos Ya',
                    href: 'https://www.pedidosya.com.pe/restaurantes/lima/brutal-salchipapas--lima-5e56ce21-2176-4225-89ed-38e0b1748f36-menu'
                },
            ],
            cartaHref: "https://drive.google.com/file/d/125P3k26s3uNPVetcEbObmUhyitO8Fh07/view?usp=sharing"
        }
    ] ,
    currentSelectedCityId: 2,
    setCurrentSelectedCityId: (val) => {
        modalSelectItem.currentSelectedCityId= parseInt(val);
        modalSelectItem.fillFieldsBySelectedCity();
    },
    setCartaLink: (citySelected) => {
        const cartaLink = $('.carta-link');
        $(cartaLink).attr('href', citySelected.cartaHref);

        const btnCarta = $('.btn-descargar');
        $(btnCarta).attr('href', citySelected.cartaHref);
    },
    setWhatsappLink: (citySelected) => {
        const wsLinkBtn = $('.ws-link');
        $(wsLinkBtn).attr('href', citySelected.whatsappLink);
    },
    fillChannels: (citySelected) => {
        let htmlChannels = '';
        citySelected.channels.forEach(c => {
            htmlChannels += `<li><a target="_blank" id="${c.id}" onclick="gtag('event', '${c.id}-${citySelected.name.toLowerCase()}');"  href="${c.href}">${c.name}</a></li>`
        })
        const channelsList = $('.channels-list').html(htmlChannels);
    },
    fillCitiesSelect: () => {
        const selectCities = $(`#${modalSelectItem.id} .cities`);
        if (selectCities) {
            let html = '';
            modalSelectItem.availableCities.forEach(city => {
                html += `<option onclick="gtag('event', 'city-${city.name.toLowerCase()}');" value="${city.id}" >${city.name}</option>`
            });
            selectCities.append(html);
        }
    },
    fillCitiesDropdown: () => {
        const dropdownCities = $(`.dropdown-cities`);
        if (dropdownCities) {
            let html = '';
            modalSelectItem.availableCities.forEach(city => {
                html += `<li><a onclick="gtag('event', 'city-${city.name.toLowerCase()}');" href="javascript:modalSelectItem.setCurrentSelectedCityId(${city.id})">${city.name}</a></li>`
            });
            dropdownCities.append(html);
        }
    },
    fillFieldsBySelectedCity: () => {
        /******** SELECT CITY ******/
        const cityIndex = modalSelectItem.availableCities.findIndex((i) => i.id === modalSelectItem.currentSelectedCityId );
        const citySelected = cityIndex > -1 ? modalSelectItem.availableCities[cityIndex] : modalSelectItem.availableCities[0];

        /******* SETEAMOS LINK DE LA CARTA  *********/
        modalSelectItem.setCartaLink(citySelected);
        /******* FILL CHANNELS ***********/
        modalSelectItem.fillChannels(citySelected);
        /******* SET WS */
        modalSelectItem.setWhatsappLink(citySelected)
        /*** SET CITY NAME ****/
        $('#cityName').text(citySelected.name);

        /** CUSTOMIZING SELECT */
        const cityDropdown = $('#main-pipzza-btn');
        if(cityDropdown) {
            $(cityDropdown).html(`${citySelected.name} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
          </svg>`);
        }
    },
    init: async () => {
        /*** DISABLE BACKDROP ***/
        // $(`#${modalSelectItem.id}`).modal({ backdrop: 'static', keyboard: false });
        /**** SET INITIAL DATA */
        /* const response = await fetch("./assets/js/data.json",{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });*/
        // console.log(response);
        // modalSelectItem.availableCities = response.json();
        /****** SUBMIT HANDLER ****/
        /** $(`#${modalSelectItem.id} form`).submit((e) => {
            e.preventDefault();
            modalSelectItem.close();
        });**/
        /***** HANDLE SELECT CHANGE ****/
        $(`select.cities`).change(({ target: { value } }) => {
            modalSelectItem.setCurrentSelectedCityId(value);
            // modalSelectItem.currentSelectedCityId = parseInt(value);
            
        });
        /**** FILL SELECT CITIES***/
        modalSelectItem.fillCitiesSelect();

        /*** FILL DROPDOWN CITIES ***/
        modalSelectItem.fillCitiesDropdown();

        /**** SET CURRENT SELECTED CITY ****/
        modalSelectItem.fillFieldsBySelectedCity();
    },
    open: () => {
        $(`#${modalSelectItem.id}`).modal('show');
    },
    close: () => {
        $(`#${modalSelectItem.id}`).modal('hide');
    }
};

$(document).ready(() => {

    modalSelectItem.init().then(() => {
        // modalSelectItem.open();
    })
    setTimeout(()=> {
        $('.spinner-bg').addClass('fade-out');
        setTimeout(() => {
            $('.spinner-bg').remove();
        }, 1000);
    }, 2000);
});

/***
 * [
        {
            id: 1,
            name: 'Arequipa',
            channels: [
                {
                    name: 'Whatsapp',
                    href: 'https://api.whatsapp.com/message/PBMS57WFM7NOL1',
                },
                {
                    name: 'Rappi',
                    href: 'https://www.rappi.com.pe/restaurantes/39566-la-pipzza',
                },
                {
                    name: 'Pedidos Ya',
                    href: 'https://www.pedidosya.com.pe/restaurantes/arequipa/la-pipzza-menu?search=la%20pipzza'
                },
            ],
            cartaHref: "https://drive.google.com/file/d/1D5xWMlv2pJBKdDtJozQ-_0YkYkTxgIFx/view"
        },
        {
            id: 2,
            name: 'Lima',
            channels: [
                {
                    name: 'Whatsapp Lima',
                    href: 'https://api.whatsapp.com/message/PBMS57WFM7NOL1',
                },
                {
                    name: 'Rappi Lima',
                    href: 'https://www.rappi.com.pe/restaurantes/39566-la-pipzza',
                },
                {
                    name: 'Pedidos Ya Lima',
                    href: 'https://www.pedidosya.com.pe/restaurantes/arequipa/la-pipzza-menu?search=la%20pipzza'
                },
            ],
            cartaHref: "https://drive.google.com/file/d/1D5xWMlv2pJBKdDtJozQ-_0YkYkTxgIFx/view"
        }
    ]
 */