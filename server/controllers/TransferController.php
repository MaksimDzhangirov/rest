<?php

namespace app\controllers;

use yii\rest\ActiveController;
use app\models\User;
use app\models\Transfer;
use app\models\Company;
use yii\db\Query;
use Carbon\Carbon;
use yii\web\NotFoundHttpException;

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


    public function actions()
    {
        $actions = parent::actions();

        
        unset($actions['create'], $actions['delete'], $actions['index']);
        unset($actions['update'], $actions['view']);
        
        // customize the data provider preparation with the "prepareDataProvider()" method
        
        return $actions;
    }

    public function actionAbusers($date)
    {

        $givenMonth = Carbon::createFromFormat('Y-m-d', $date);
        if (!empty($givenMonth)) {
            $start = $givenMonth->startOfMonth()->getTimestamp();
            $stop = $givenMonth->endOfMonth()->getTimestamp();
            $abusers = (new Query)->select('username, date_time, resource, transferred')
            ->from('user')
            ->innerJoin('transfer', 'user.id = transfer.user_id')            
            ->where(['between', 'transfer.date_time', $start, $stop])
            ->orderBy('username ASC, date_time ASC')            
            ->all();
            return $abusers;
        } else {
            throw new NotFoundHttpException('Wrong date.');
        }  
    }

    public function actionGenerate()
    {
        $faker = \Faker\Factory::create();
        Transfer::deleteAll();
        $users = User::find()->all();   
        
        foreach ($users as $user) {
            $numberOfRecords = $faker->numberBetween($min = 50, $max = 500);
            $numberOfRecordsPerMonth = intval($numberOfRecords/6);            
            $j = -6; $k = $j+1; $m = 1;
            for ($i=0; $i<=$numberOfRecords; $i++) {
                if ($i <= $numberOfRecordsPerMonth * $m) {                    
                    if ($j >=0) {
                        $now = Carbon::now();
                        $days = $now->day;
                        $startMonth = "-$days days";
                    } else {
                        $startMonth = "$j month";
                    }
                    if ($k >= 0) {
                        $stopMonth = 'now';                        
                    } else {
                        $stopMonth = "$k month";
                    }
                    $this->saveRow($user->id, $startMonth, $stopMonth);
                } else {
                    $m++; $j++; $k++;
                    if ($j >=0) {
                        $now = Carbon::now();
                        $days = $now->day;
                        $startMonth = "-$days days";
                    } else {
                        $startMonth = "$j month";
                    }                   
                    if ($k >= 0) {
                        $stopMonth = 'now';                        
                    } else {
                        $stopMonth = "$k month";
                    }
                    $this->saveRow($user->id, $startMonth, $stopMonth);
                }
            }
        }

        return ['ok' => 'ok'];
    }

    public function actionReport($date)
    {
        $givenMonth = Carbon::createFromFormat('Y-m-d', $date);
        if (!empty($givenMonth)) {
            $start = $givenMonth->startOfMonth()->getTimestamp();
            $stop = $givenMonth->endOfMonth()->getTimestamp();
            $companies = (new Query)->select('company_name, monthly_transfer_quota, SUM(transferred) as sum')
            ->from('company')->innerJoin('user', 'company.id = user.company_id')
            ->innerJoin('transfer', 'user.id = transfer.user_id')
            ->where(['between', 'date_time', $start, $stop])
            ->groupBy('company.id')
            ->having('sum > monthly_transfer_quota')->orderBy('sum DESC')->all();
            return $companies;
        } else {
            throw new NotFoundHttpException('Wrong date.');
        }        
    }

    protected function saveRow($userID, $startMonth, $stopMonth)
    {
        $faker = \Faker\Factory::create();
        $transfer = new Transfer();
        $transfer->setIsNewRecord(true);
        $transfer->id = null;
        $transfer->user_id = $userID;
        $datetime = $faker->dateTimeBetween($startDate = $startMonth, $endDate = $stopMonth, $timezone = date_default_timezone_get());
        $transfer->date_time = $datetime->getTimestamp();
        $transfer->resource = $faker->url;        
        $transfer->transferred = ceil($faker->randomFloat($nbMaxDecimals = NULL, $min = 100, $max = 10*1024*1024*1024));
        $transfer->save();
    }

}
