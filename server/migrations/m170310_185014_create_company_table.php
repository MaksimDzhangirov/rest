<?php

use yii\db\Migration;

/**
 * Handles the creation of table `company`.
 */
class m170310_185014_create_company_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('company', [
            'id' => $this->primaryKey(),
            'company_name' => $this->string()->notNull(),
            'monthly_transfer_quota' => $this->bigInteger()->notNull()
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('company');
    }
}
