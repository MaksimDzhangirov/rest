<?php

namespace app\controllers;

use yii\rest\ActiveController;

class TransferController extends ActiveController
{
    public $modelClass = 'app\models\Transfer';

    public function behaviors()
    {
        return 
        \yii\helpers\ArrayHelper::merge(parent::behaviors(), [
            'corsFilter' => [
                'class' => \yii\filters\Cors::className(),
            ],
        ]);
    }
}
