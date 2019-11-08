import Action from '../../core/Action';
import UserModel from '../../models/UserModel';
import VError from '../../core/VError';
import configs from '../../configs';

class SetTotalScoresAction extends Action {
  static async run (req, res, next) {
    const { totalScores } = req.body;

    console.log(totalScores, req.user.totalScores)
    if (totalScores < req.user.totalScores) {
      console.log('Не обновляем рекорд')

      res.json({
        body: {
          message: 'Рекорд игрока больше полученного рекорда'
        },
        meta: { ok: true }
      });

      return;
    }
    console.log('Обновляем рекорд')

    UserModel.updateOne({ _id: req.user._id },
      {
        $set: {
          totalScores: totalScores
        }
      })
      .then(() => {
        res.json({
          body: {},
          meta: { ok: true }
        })
      })
      .catch(e => {
        //@todo заменить на актуальную ошибку
        throw new VError(configs.errors.DB);
      });
  }
}

export default SetTotalScoresAction;
