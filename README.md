# Fluppy.io

trello: https://trello.com/b/YSRbLVu2/fluppy

Создание новых API методов:
Пример - регистрация рекорда игрока.

* 1.) Создаем новую конечную точку на бэкэнде
  * 1.1) В actions создаем новый action в сущности player - SetTotalScoresAction.js
  * 1.2) Добавляем новый action в экспорт (файл index.js в папке с сущностью)
  * 1.3) В роутере сущности указываем новый end point (c необходимыми мидлварами):
  ```javascript
  router.put('/player/totalScores', JWTMiddleware.handler(), executeAction(actions.GetAction));
  ```
* 2.) Описываем запрос в API. (файл queries)
  * 2.1) Добавляем описание запроса
    ```javascript
    'player.setTotalScores': {
      method: 'PUT',
      action: () => '/player/getTotalScores'
    }
    ```
  * 2.2) В менеджере (или любом другом месте которое имеет доступ к controller вызываем запрос)
    ```javascript
    this.controller.api.execute(
      {
        name: 'player.setTotalScores'
      },
      {
        json: { totalScores: 666 }
      }
    ).then(() => {
      console.log('Total scores was changed');
    });
    ```
