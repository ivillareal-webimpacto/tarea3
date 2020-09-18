/**
* 2007-2020 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2020 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*
* Don't forget to prefix your containers with your own identifier
* to avoid any conflicts with others containers.
*/

$(document).ready(function(){
    //creamos el objeto app
    var app = {};
    //nuestra api key
    app.apikey = "bae2823793ae6f20dc2d3c4a8b0f7040";
    getLocation();

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(cargarDatos);
        } else {
            $('#tiempo').append('Geolocation is not supported by this browser.');
        }
    }

    function cargarDatos(position){
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        //app.url = "http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key};
        app.url = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid="+app.apikey;

        $.ajax({
            url: app.url,
            success: function( data ) {
                //guardamos en la variable datos dentro del objeto app toda la información “en bruto”
                app.datos = data;
                //a continuación lanzamos la función procesaDatos que se encarga del manipulado de los datos
                procesaDatos();
            },
            //algo no ha ido bien, por simplificar el ejemplo no vamos a analizar los tipos de error, solo mostramos un mensaje
            //en el mundo real analizaríamos el error que nos devuelve la API para actuar de una manera u otra
            error: function(){
                alert("¡Ups! No puedo obtener información de la API");
            }
        });
    } // fin funcion cargarDatos

    function procesaDatos(){
        //guardamos los datos por separado en variables
        app.condicionNombre = app.datos.weather[0].main;
        app.temperatura = app.datos.main.temp;
        app.humedad = app.datos.main.humidity;
        app.temp_min = app.datos.main.temp_min;
        app.temp_max = app.datos.main.temp_max;

        $('#tiempo').append('   Tº: '+app.temperatura+' Humedad: '+app.humedad +' Tº max: '+app.temp_max+' Tº min: '+app.temp_min);
    }
});

