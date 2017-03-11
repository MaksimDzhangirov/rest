<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "transfer".
 *
 * @property integer $id
 * @property integer $user_id
 * @property integer $date_time
 * @property string $resource
 * @property string $transferred
 *
 * @property User $user
 */
class Transfer extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'transfer';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_id'], 'required'],
            [['user_id', 'date_time', 'transferred'], 'integer'],
            [['resource'], 'string', 'max' => 255],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'date_time' => 'Date Time',
            'resource' => 'Resource',
            'transferred' => 'Transferred',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'user_id']);
    }
}
