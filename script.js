$(document).ready(function () {
    $('#search-form').on('submit', function (e) {
        e.preventDefault();
        var number = $('#number').val(); 

        // Формируем URL для запроса
        var url = `https://baza-gai.com.ua/nomer/${number}`;

        console.log('Fetching data from URL:', url);  

        // Отправляем GET запрос
        $.ajax({
            url: url,
            type: 'GET',
            headers: {
                "X-Api-Key": "f52793ea4e629b1e7d664bdfdb5625a7",  
                "Accept": "application/json"
            },
            success: function (data) {
                console.log('Data fetched successfully:', data);  
                displayCar(data); 
            },
            error: function (jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                console.error('Request Failed: ' + err);  
            }
        });
    });

    // Функция отображения данных о машине
    function displayCar(data) {
        var carInfoContainer = $('#car-info-container');
        carInfoContainer.empty(); 
   
        if (data && data.vendor) {
            var carInfo = $('<div>').addClass('car-info');
            carInfo.append($('<p>').text('Марка: ' + data.vendor));
            carInfo.append($('<p>').text('Модель: ' + data.model));
            carInfo.append($('<p>').text('Год выпуска: ' + data.model_year));
 
            if (data.region && data.region.name) {
                carInfo.append($('<p>').text('Регион: ' + data.region.name));
            }
            if (data.color) {
                carInfo.append($('<p>').text('Цвет: ' + data.color.ru));
            }
            if (data.is_stolen !== undefined) {
                carInfo.append($('<p>').text('Угнан: ' + (data.is_stolen ? 'Да' : 'Нет')));
            }
 
            if (data.photo_url) {
                carInfo.append($('<img>').attr('src', data.photo_url).attr('alt', 'Фото автомобиля'));
            }
 
            if (data.operations && data.operations.length > 0) {
                var operations = $('<div>').addClass('operations');
                data.operations.forEach(function (operation) {
                    var op = $('<div>').addClass('operation');
                    op.append($('<p>').text('Операция: ' + (operation.operation ? operation.operation.ru : 'Неизвестно')));
                    op.append($('<p>').text('Дата регистрации: ' + operation.registered_at));
                    op.append($('<p>').text('Цвет: ' + operation.color.ru));
                    operations.append(op);
                });
                carInfo.append(operations);
            }

            carInfoContainer.append(carInfo);  
        } else {
            carInfoContainer.append($('<p>').text('Данные не найдены.'));
        }
    }
});