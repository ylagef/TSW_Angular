<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Gaps Model
 *
 * @method \App\Model\Entity\Gap get($primaryKey, $options = [])
 * @method \App\Model\Entity\Gap newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Gap[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Gap|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Gap|bool saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Gap patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Gap[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Gap findOrCreate($search, callable $callback = null, $options = [])
 */
class GapsTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('gaps');
        $this->setDisplayField('gap_id');
        $this->setPrimaryKey('gap_id');
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->integer('gap_id')
            ->allowEmpty('gap_id', 'create');

        $validator
            ->integer('poll_id')
            ->requirePresence('poll_id', 'create')
            ->notEmpty('poll_id');

        $validator
            ->dateTime('start_date')
            ->requirePresence('start_date', 'create')
            ->notEmpty('start_date');

        $validator
            ->dateTime('end_date')
            ->requirePresence('end_date', 'create')
            ->notEmpty('end_date');

        return $validator;
    }
}
