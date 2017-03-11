<?php

use yii\db\Migration;

/**
 * Handles the creation of table `user`.
 */
class m170310_185038_create_user_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('user', [
            'id' => $this->primaryKey(),
            'company_id' => $this->integer()->notNull(),
            'username' => $this->string()->notNull(),
            'email' => $this->string(150)
        ]);

        // creates index for column `company_id`
        $this->createIndex(
        'idx-user-company_id',
        'user',
        'company_id'
        );

        // add foreign key for table `user`
        $this->addForeignKey(
            'fk-user-company_id',
            'user',
            'company_id',
            'company',
            'id',
            'CASCADE'
        );

    }


    /**
     * @inheritdoc
     */
    public function down()
    {
        // drops foreign key for table `user`
        $this->dropForeignKey(
            'fk-user-company_id',
            'user'
        );

        // drops index for column `author_id`
        $this->dropIndex(
            'idx-user-company_id',
            'user'
        );

        $this->dropTable('user');
    }
}
