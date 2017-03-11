<?php

namespace app\controllers;

use yii\rest\ActiveController;

class CompanyController extends ActiveController
{
	public $modelClass = 'app\models\Company';

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
