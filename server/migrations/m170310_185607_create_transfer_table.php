<?php

use yii\db\Migration;

/**
 * Handles the creation of table `transfer`.
 */
class m170310_185607_create_transfer_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('transfer', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer()->notNull(),
            'date_time' => $this->integer(),
            'resource' => $this->string(),
            'transferred' => $this->bigInteger()
        ]);

        // creates index for column `user_id`
        $this->createIndex(
            'idx-transfer-user_id',
            'transfer',
            'user_id'
        );

        // add foreign key for table `transfer`
        $this->addForeignKey(
            'fk-transfer-user_id',
            'transfer',
            'user_id',
            'user',
            'id',
            'CASCADE'
        );

    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        // drops foreign key for table `transfer`
        $this->dropForeignKey(
            'fk-transfer-user_id',
            'transfer'
        );

        // drops index for column `user_id`
        $this->dropIndex(
            'idx-transfer-user_id',
            'transfer'
        );

        $this->dropTable('transfer');
    }
}
