# todo-list

https://vladmikhalev.github.io/todo-list/

<img width="556" alt="Screenshot 2023-05-20 at 10 51 59" src="https://github.com/vladmikhalev/todo-list/assets/107835280/4e773a6e-da55-442f-a283-734f00a4740b">

ToDo List – программа для создания списков и отметки выполненных пунктов.


В программе осуществлена возможность добавления нового дела с помощью формы нажав на кнопку "Добавить дело".

Дело можно пометить как выполненное, для этого нужно нажать на кнопку "готово". При повторном нажатии дело обратно станет не готовым.

Дело можно удалить, для этого нужно нажать на кнопку "удалить". После нажатия всплывет уточняющее окно, в котором нужно подтвердить удаление. Для удаления нажать "да".

В этом приложении осуществлено хранение данных на двух серверах: local storage и backend сервер, который запускается на локальном компьютере. Для переключениями между серверами имеется кнопка "Перейти на серверное хранилище", после нажатия меняется на "Перейти на локальное хранилище". При нажатии на эту кнопку все дела отрисовываются заново, беря данные с указанного сервера с помощью fetch запросов.

Также осущетсвлена возможно вести заметки дел для разных пользователей. По нажатию на кнопку "Мои дела", "Дела папы", "Дела мамы" осуществляяется переход на соответсвующие HTML файлы со соими делами. Данные беруться с выбранного сервера.

# Запуск приложения:

- склонировать проект
- запусть сервер командой "node index.js" из папки todo-server
- запусть файл index.html из корневой папки с помощью liveServer





